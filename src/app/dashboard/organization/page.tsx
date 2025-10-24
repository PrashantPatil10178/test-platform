import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import PageContainer from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  IconTrendingUp,
  IconUsers,
  IconFileText,
  IconChartBar,
  IconPlus,
} from "@tabler/icons-react";
import Link from "next/link";

export default async function OrganizationDashboard() {
  const session = await auth();

  if (!session || session.user.role !== "ORGANIZATION") {
    return redirect("/signin");
  }

  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Organization Dashboard 🏢
            </h2>
            <p className="text-muted-foreground mt-1">
              Manage your students, tests, and track performance
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/dashboard/students">
                <IconUsers className="mr-2 h-4 w-4" />
                Manage Students
              </Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/questions">
                <IconPlus className="mr-2 h-4 w-4" />
                Create Test
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Total Students</CardDescription>
              <CardTitle className="text-3xl font-bold">248</CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp className="mr-1 h-3 w-3" />
                  +24 this month
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="text-muted-foreground text-sm">
              Enrolled students
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Active Tests</CardDescription>
              <CardTitle className="text-3xl font-bold">42</CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconFileText className="mr-1 h-3 w-3" />
                  15 published
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="text-muted-foreground text-sm">
              Created by your organization
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Test Attempts</CardDescription>
              <CardTitle className="text-3xl font-bold">3,847</CardTitle>
              <CardAction>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 dark:bg-green-950"
                >
                  <IconTrendingUp className="mr-1 h-3 w-3" />
                  +18.2%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="text-muted-foreground text-sm">
              Total attempts by students
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Avg Performance</CardDescription>
              <CardTitle className="text-3xl font-bold">74%</CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconChartBar className="mr-1 h-3 w-3" />
                  +3.5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="text-muted-foreground text-sm">
              Student average score
            </CardFooter>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconFileText className="h-5 w-5 text-blue-500" />
                Create Test
              </CardTitle>
              <CardDescription>
                Create new tests for your students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/dashboard/questions">Create New Test</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconUsers className="h-5 w-5 text-green-500" />
                Manage Students
              </CardTitle>
              <CardDescription>
                View and manage enrolled students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard/students">View Students</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconChartBar className="h-5 w-5 text-purple-500" />
                Analytics
              </CardTitle>
              <CardDescription>
                View detailed performance analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard/analytics">View Analytics</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Tests */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Tests</CardTitle>
                <CardDescription>
                  Tests created by your organization
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/questions">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Physics Chapter 1-5 Mock Test",
                  attempts: 156,
                  avgScore: 78,
                  date: "Published 2 days ago",
                  status: "Active",
                },
                {
                  name: "Chemistry Organic Full Test",
                  attempts: 142,
                  avgScore: 72,
                  date: "Published 5 days ago",
                  status: "Active",
                },
                {
                  name: "Mathematics Calculus Test",
                  attempts: 128,
                  avgScore: 81,
                  date: "Published 1 week ago",
                  status: "Active",
                },
              ].map((test, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-4 last:border-0"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{test.name}</p>
                      <Badge variant="outline" className="text-xs">
                        {test.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {test.attempts} attempts • Avg Score: {test.avgScore}% •{" "}
                      {test.date}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm">
                      View Results
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Students</CardTitle>
              <CardDescription>
                Students with highest scores this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Rahul Sharma", score: 94, tests: 12, rank: 1 },
                  { name: "Priya Patel", score: 91, tests: 15, rank: 2 },
                  { name: "Arjun Kumar", score: 88, tests: 10, rank: 3 },
                  { name: "Sneha Singh", score: 86, tests: 13, rank: 4 },
                  { name: "Vikram Desai", score: 84, tests: 11, rank: 5 },
                ].map((student) => (
                  <div
                    key={student.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold">
                        {student.rank}
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-muted-foreground text-sm">
                          {student.tests} tests completed
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">
                        {student.score}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subject Performance</CardTitle>
              <CardDescription>Average scores by subject</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    subject: "Physics",
                    score: 78,
                    attempts: 856,
                    color: "bg-blue-500",
                  },
                  {
                    subject: "Chemistry",
                    score: 72,
                    attempts: 742,
                    color: "bg-green-500",
                  },
                  {
                    subject: "Mathematics",
                    score: 81,
                    attempts: 923,
                    color: "bg-purple-500",
                  },
                  {
                    subject: "Biology",
                    score: 75,
                    attempts: 654,
                    color: "bg-orange-500",
                  },
                ].map((subject) => (
                  <div key={subject.subject} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{subject.subject}</span>
                      <span className="text-muted-foreground text-sm">
                        {subject.attempts} attempts • {subject.score}% avg
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className={`h-2 rounded-full ${subject.color}`}
                        style={{ width: `${subject.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
