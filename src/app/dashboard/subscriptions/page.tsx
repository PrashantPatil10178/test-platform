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

export const metadata = {
  title: "Dashboard: Subscriptions",
};

export default async function SubscriptionsPage() {
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
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Free Plan</CardTitle>
              <CardDescription>With advertisements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-3xl font-bold">₹0</div>
              <ul className="space-y-2 text-sm">
                <li>✓ Access to free tests</li>
                <li>✓ Basic analytics</li>
                <li>✓ Limited AI hints</li>
                <li>✗ Ad-supported</li>
              </ul>
              <Button variant="outline" className="mt-4 w-full">
                Current Plan
              </Button>
            </CardContent>
          </Card>

          <Card className="border-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Ad-Free</CardTitle>
                <Badge>Popular</Badge>
              </div>
              <CardDescription>Student plan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-3xl font-bold">
                ₹100<span className="text-sm font-normal">/month</span>
              </div>
              <ul className="space-y-2 text-sm">
                <li>✓ All free features</li>
                <li>✓ No advertisements</li>
                <li>✓ Unlimited AI hints</li>
                <li>✓ Detailed reports</li>
              </ul>
              <Button className="mt-4 w-full">Upgrade Now</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Organization</CardTitle>
              <CardDescription>For coaching centers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-3xl font-bold">
                ₹5,000<span className="text-sm font-normal">/month</span>
              </div>
              <ul className="space-y-2 text-sm">
                <li>✓ Create custom tests</li>
                <li>✓ Student management</li>
                <li>✓ Batch assignments</li>
                <li>✓ Advanced analytics</li>
              </ul>
              <Button variant="outline" className="mt-4 w-full">
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Payment History */}
        <Card>
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

        {/* Razorpay Integration Info */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
            <CardDescription>
              Secure payments powered by Razorpay
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              All payments are processed securely through Razorpay. We support
              UPI, Cards, Net Banking, and Wallets.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
