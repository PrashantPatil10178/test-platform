"use client";

import { useState } from "react";
import PageContainer from "@/components/layout/page-container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  IconCheck,
  IconX,
  IconLoader2,
  IconShieldCheck,
} from "@tabler/icons-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function SubscriptionsPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<string | null>(null);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubscribe = async (plan: "AD_FREE" | "ORGANIZATION") => {
    if (!session?.user) {
      toast.error("Please sign in to subscribe");
      return;
    }

    setLoading(plan);

    try {
      // Load Razorpay script
      const res = await loadRazorpayScript();

      if (!res) {
        toast.error("Razorpay SDK failed to load");
        setLoading(null);
        return;
      }

      // Create order
      const orderResponse = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderData.error || "Failed to create order");
      }

      // Razorpay options
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "MHT CET Prep",
        description: plan === "AD_FREE" ? "Ad-Free Plan" : "Organization Plan",
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            // Verify payment
            const verifyResponse = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyResponse.ok) {
              toast.success(
                "Payment successful! Your subscription is now active.",
              );
              setTimeout(() => window.location.reload(), 2000);
            } else {
              throw new Error(
                verifyData.error || "Payment verification failed",
              );
            }
          } catch (error) {
            toast.error("Payment verification failed");
            console.error(error);
          } finally {
            setLoading(null);
          }
        },
        prefill: {
          name: session.user.name || "",
          email: session.user.email || "",
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: function () {
            setLoading(null);
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to initiate payment");
      setLoading(null);
    }
  };

  const userRole = session?.user?.role || "STUDENT";

  return (
    <PageContainer scrollable={true}>
      <div className="flex flex-1 flex-col space-y-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Subscriptions & Payments 💳
            </h2>
            <p className="text-muted-foreground">
              Choose the perfect plan for your learning journey
            </p>
          </div>
        </div>

        {/* Subscription Plans */}
        {userRole === "STUDENT" && (
          <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-3">
            <Card className="@container/card" data-slot="card">
              <CardHeader>
                <CardDescription>Free Plan</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  ₹0<span className="text-sm font-normal">/month</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <IconCheck className="text-muted-foreground h-4 w-4 shrink-0" />
                    <span>Access to free tests</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <IconCheck className="text-muted-foreground h-4 w-4 shrink-0" />
                    <span>Basic analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <IconCheck className="text-muted-foreground h-4 w-4 shrink-0" />
                    <span>Limited AI hints (3 per test)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <IconX className="h-4 w-4 shrink-0 text-red-500" />
                    <span className="text-muted-foreground">
                      Ad-supported experience
                    </span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" disabled>
                  Current Plan
                </Button>
              </CardContent>
            </Card>

            <Card
              className="border-primary @container/card relative overflow-hidden border-2"
              data-slot="card"
            >
              <div className="absolute top-0 right-0">
                <Badge className="rounded-tr-none rounded-bl-lg">Popular</Badge>
              </div>
              <CardHeader>
                <CardDescription>Ad-Free</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  ₹100<span className="text-sm font-normal">/month</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <IconCheck className="h-4 w-4 shrink-0 text-green-600 dark:text-green-500" />
                    <span>All free features</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <IconCheck className="h-4 w-4 shrink-0 text-green-600 dark:text-green-500" />
                    <span className="font-medium">No advertisements</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <IconCheck className="h-4 w-4 shrink-0 text-green-600 dark:text-green-500" />
                    <span>Unlimited AI hints</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <IconCheck className="h-4 w-4 shrink-0 text-green-600 dark:text-green-500" />
                    <span>Detailed performance reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <IconCheck className="h-4 w-4 shrink-0 text-green-600 dark:text-green-500" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button
                  className="w-full"
                  onClick={() => handleSubscribe("AD_FREE")}
                  disabled={loading === "AD_FREE"}
                >
                  {loading === "AD_FREE" ? (
                    <>
                      <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Upgrade Now"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {userRole === "ORGANIZATION" && (
          <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-3">
            <Card className="@container/card" data-slot="card">
              <CardHeader>
                <CardDescription>Free Plan</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  ₹0<span className="text-sm font-normal">/month</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <IconCheck className="text-muted-foreground h-4 w-4 shrink-0" />
                    <span>Up to 10 students</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <IconCheck className="text-muted-foreground h-4 w-4 shrink-0" />
                    <span>Basic analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <IconX className="h-4 w-4 shrink-0 text-red-500" />
                    <span className="text-muted-foreground">
                      No test creation
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <IconX className="h-4 w-4 shrink-0 text-red-500" />
                    <span className="text-muted-foreground">Ad-supported</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full" disabled>
                  Current Plan
                </Button>
              </CardContent>
            </Card>

            <Card
              className="border-primary @container/card relative overflow-hidden border-2"
              data-slot="card"
            >
              <div className="absolute top-0 right-0">
                <Badge className="rounded-tr-none rounded-bl-lg">
                  Best Value
                </Badge>
              </div>
              <CardHeader>
                <CardDescription>Organization Pro</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  ₹5,000<span className="text-sm font-normal">/month</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <IconCheck className="h-4 w-4 shrink-0 text-green-600 dark:text-green-500" />
                    <span className="font-medium">Unlimited students</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <IconCheck className="h-4 w-4 shrink-0 text-green-600 dark:text-green-500" />
                    <span>Create custom tests</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <IconCheck className="h-4 w-4 shrink-0 text-green-600 dark:text-green-500" />
                    <span>Question bank management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <IconCheck className="h-4 w-4 shrink-0 text-green-600 dark:text-green-500" />
                    <span>Batch & student management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <IconCheck className="h-4 w-4 shrink-0 text-green-600 dark:text-green-500" />
                    <span>Advanced analytics & reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <IconCheck className="h-4 w-4 shrink-0 text-green-600 dark:text-green-500" />
                    <span>Custom branding</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <IconCheck className="h-4 w-4 shrink-0 text-green-600 dark:text-green-500" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button
                  className="w-full"
                  onClick={() => handleSubscribe("ORGANIZATION")}
                  disabled={loading === "ORGANIZATION"}
                >
                  {loading === "ORGANIZATION" ? (
                    <>
                      <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Upgrade Now"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Payment Information */}
        <Card className="border-primary/20 bg-primary/5" data-slot="card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconShieldCheck className="h-5 w-5" />
              Secure Payments by Razorpay
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              All payments are processed securely through Razorpay. We support
              UPI, Credit/Debit Cards, Net Banking, and digital Wallets. Your
              payment information is encrypted and secure.
            </p>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card data-slot="card">
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>
              View all your subscription payments and invoices
            </CardDescription>
          </CardHeader>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">
              No payment history available
            </p>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
