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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata = {
  title: "Dashboard: Analytics",
};

export default async function AnalyticsPage() {
  return (
    <PageContainer scrollable={true}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Analytics & Reports"
            description="Comprehensive insights into test performance and student progress."
          />
        </div>
        <Separator />

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subjects">Subject-wise</TabsTrigger>
            <TabsTrigger value="students">Student Performance</TabsTrigger>
            <TabsTrigger value="ai">AI Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardDescription>Average Score</CardDescription>
                  <CardTitle className="text-3xl">72.5%</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-xs">
                    Across all test attempts
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardDescription>Completion Rate</CardDescription>
                  <CardTitle className="text-3xl">89.2%</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-xs">
                    Tests completed vs started
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardDescription>AI Hints Used</CardDescription>
                  <CardTitle className="text-3xl">4,823</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-xs">
                    Total AI assistance requests
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>
                  Detailed analytics charts will be displayed here
                </CardDescription>
              </CardHeader>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  Charts showing test performance over time, subject-wise
                  analysis, and more...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subjects">
            <Card>
              <CardHeader>
                <CardTitle>Subject-wise Performance</CardTitle>
                <CardDescription>
                  Performance breakdown by Physics, Chemistry, and Mathematics
                </CardDescription>
              </CardHeader>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  Subject analysis coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Student Performance Rankings</CardTitle>
                <CardDescription>
                  Compare student performance and identify top performers
                </CardDescription>
              </CardHeader>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  Student rankings coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai">
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Reports</CardTitle>
                <CardDescription>
                  Personalized insights and recommendations powered by AI
                </CardDescription>
              </CardHeader>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  AI reports dashboard coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
