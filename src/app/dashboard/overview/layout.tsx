import PageContainer from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import React from "react";

export default function OverViewLayout({
  sales,
  pie_stats,
  bar_stats,
  area_stats,
}: {
  sales: React.ReactNode;
  pie_stats: React.ReactNode;
  bar_stats: React.ReactNode;
  area_stats: React.ReactNode;
}) {
  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
        </div>

        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4">
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Total Tests</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                142
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  +8 this month
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Growing test library <IconTrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Active tests created by organizations
              </div>
            </CardFooter>
          </Card>
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Active Students</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                2,847
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  +12.3%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Strong user growth <IconTrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Students enrolled this month
              </div>
            </CardFooter>
          </Card>
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Test Attempts</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                15,832
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  +24.5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                High engagement rate <IconTrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Completed attempts this week
              </div>
            </CardFooter>
          </Card>
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Subscription Revenue</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                ₹45,600
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp />
                  +18.2%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Revenue increasing <IconTrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Monthly recurring revenue
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">{bar_stats}</div>
          <div className="col-span-4 md:col-span-3">
            {/* sales arallel routes */}
            {sales}
          </div>
          <div className="col-span-4">{area_stats}</div>
          <div className="col-span-4 md:col-span-3">{pie_stats}</div>
        </div>
      </div>
    </PageContainer>
  );
}
