"use client";

import { useState } from "react";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
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
import { Loader2, Check, X } from "lucide-react";

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
        name: "Test Platform",
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
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Subscriptions & Payments"
            description="Manage subscription plans and view payment history."
          />
        </div>
        <Separator />

        {/* Subscription Plans */}
        {userRole === "STUDENT" && (
          <>
            <h3 className="text-lg font-semibold">Student Plans</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Free Plan</CardTitle>
                  <CardDescription>With advertisements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 text-3xl font-bold">₹0</div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Access to free tests
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Basic analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Limited AI hints (3 per test)
                    </li>
                    <li className="flex items-center gap-2">
                      <X className="h-4 w-4 text-red-500" />
                      Ad-supported experience
                    </li>
                  </ul>
                  <Button variant="outline" className="mt-6 w-full" disabled>
                    Current Plan
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-primary border-2 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Ad-Free</CardTitle>
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500">
                      Popular
                    </Badge>
                  </div>
                  <CardDescription>Student premium plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">₹100</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      All free features
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <strong>No advertisements</strong>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Unlimited AI hints
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Detailed performance reports
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Priority support
                    </li>
                  </ul>
                  <Button
                    className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-500"
                    onClick={() => handleSubscribe("AD_FREE")}
                    disabled={loading === "AD_FREE"}
                  >
                    {loading === "AD_FREE" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Upgrade Now"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {userRole === "ORGANIZATION" && (
          <>
            <h3 className="text-lg font-semibold">Organization Plans</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Free Plan</CardTitle>
                  <CardDescription>Limited features</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 text-3xl font-bold">₹0</div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Up to 10 students
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Basic analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <X className="h-4 w-4 text-red-500" />
                      No test creation
                    </li>
                    <li className="flex items-center gap-2">
                      <X className="h-4 w-4 text-red-500" />
                      Ad-supported
                    </li>
                  </ul>
                  <Button variant="outline" className="mt-6 w-full" disabled>
                    Current Plan
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-primary border-2 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Organization Pro</CardTitle>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500">
                      Best Value
                    </Badge>
                  </div>
                  <CardDescription>Complete coaching solution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">₹5,000</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <strong>Unlimited students</strong>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Create custom tests
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Question bank management
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Batch & student management
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Advanced analytics & reports
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Custom branding
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Priority support
                    </li>
                  </ul>
                  <Button
                    className="mt-6 w-full bg-gradient-to-r from-green-500 to-emerald-500"
                    onClick={() => handleSubscribe("ORGANIZATION")}
                    disabled={loading === "ORGANIZATION"}
                  >
                    {loading === "ORGANIZATION" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Upgrade Now"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {/* Payment Information */}
        <Card className="mt-6 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.436 0H1.564C.7.02.02.7 0 1.564v20.872c.02.864.7 1.544 1.564 1.564h20.872c.864-.02 1.544-.7 1.564-1.564V1.564C23.98.7 23.3.02 22.436 0zM7.303 14.365H4.697V9.635h2.606v4.73zm11.394 0h-2.606v-1.938c0-.694-.012-1.588-.968-1.588-.97 0-1.118.757-1.118 1.538v1.988H11.4V9.635h2.5v.647h.035c.348-.66 1.198-1.353 2.465-1.353 2.638 0 3.125 1.736 3.125 3.992v1.444z" />
              </svg>
              Secure Payments by Razorpay
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-900 dark:text-blue-100">
              All payments are processed securely through Razorpay. We support
              UPI, Credit/Debit Cards, Net Banking, and digital Wallets. Your
              payment information is encrypted and secure.
            </p>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card className="mt-4">
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
