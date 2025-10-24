import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import crypto from "crypto";
import { env } from "@/env";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return NextResponse.json(
        { error: "Payment verification failed" },
        { status: 400 },
      );
    }

    // Get the order from database
    const order = await db.order.findUnique({
      where: { razorpayOrderId: razorpay_order_id },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Create payment record
    const payment = await db.payment.create({
      data: {
        userId: session.user.id,
        orderId: order.id,
        razorpayPaymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        razorpaySignature: razorpay_signature,
        amount: order.amount,
        currency: order.currency,
        status: "CAPTURED",
        method: "razorpay",
      },
    });

    // Update order status
    await db.order.update({
      where: { id: order.id },
      data: { status: "PAID" },
    });

    // Create or update subscription
    const existingSubscription = await db.subscription.findUnique({
      where: { userId: session.user.id },
    });

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // 1 month subscription

    if (existingSubscription) {
      await db.subscription.update({
        where: { userId: session.user.id },
        data: {
          plan: order.plan,
          status: "ACTIVE",
          startDate,
          endDate,
          amount: order.amount,
        },
      });
    } else {
      await db.subscription.create({
        data: {
          userId: session.user.id,
          plan: order.plan,
          status: "ACTIVE",
          startDate,
          endDate,
          amount: order.amount,
        },
      });
    }

    return NextResponse.json({
      success: true,
      paymentId: payment.id,
      message: "Payment successful",
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 },
    );
  }
}
