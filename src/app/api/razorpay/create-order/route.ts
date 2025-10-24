import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import Razorpay from "razorpay";
import { env } from "@/env";

const razorpay = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { plan } = await req.json();

    // Validate plan
    const validPlans = {
      AD_FREE: { amount: 10000, name: "Ad-Free Plan" }, // ₹100 in paise
      ORGANIZATION: { amount: 500000, name: "Organization Plan" }, // ₹5000 in paise
    };

    if (!validPlans[plan as keyof typeof validPlans]) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const selectedPlan = validPlans[plan as keyof typeof validPlans];

    // Create Razorpay order
    const options = {
      amount: selectedPlan.amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId: session.user.id,
        plan: plan,
      },
    };

    const order = await razorpay.orders.create(options);

    // Save order to database
    await db.order.create({
      data: {
        userId: session.user.id,
        razorpayOrderId: order.id,
        amount: selectedPlan.amount,
        currency: "INR",
        receipt: options.receipt,
        plan: plan as "AD_FREE" | "ORGANIZATION",
        status: "CREATED",
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 },
    );
  }
}
