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
  IconClock,
  IconTarget,
  IconBrain,
} from "@tabler/icons-react";
import Link from "next/link";

export default async function StudentDashboard() {
  const session = await auth();

  if (!session || session.user.role !== "STUDENT") {
    return redirect("/signin");
  }

  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Welcome back, {session.user.name?.split(" ")[0] || "Student"} 👋
            </h2>
            <p className="text-muted-foreground mt-1">
              Continue your learning journey and ace your exams!
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/test">
              <IconBrain className="mr-2 h-4 w-4" />
              Start Practice Test
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Tests Completed</CardDescription>
              <CardTitle className="text-3xl font-bold">12</CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTrendingUp className="mr-1 h-3 w-3" />
                  +3 this week
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="text-muted-foreground text-sm">
              Keep up the great work!
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Average Score</CardDescription>
              <CardTitle className="text-3xl font-bold">78%</CardTitle>
              <CardAction>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 dark:bg-green-950"
                >
                  <IconTrendingUp className="mr-1 h-3 w-3" />
                  +5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="text-muted-foreground text-sm">
              Improving steadily
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Study Time</CardDescription>
              <CardTitle className="text-3xl font-bold">24h</CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconClock className="mr-1 h-3 w-3" />
                  This month
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="text-muted-foreground text-sm">
              Good momentum!
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Accuracy Rate</CardDescription>
              <CardTitle className="text-3xl font-bold">82%</CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <IconTarget className="mr-1 h-3 w-3" />
                  Target: 90%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="text-muted-foreground text-sm">
              Almost there!
            </CardFooter>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconBrain className="h-5 w-5 text-blue-500" />
                Practice Tests
              </CardTitle>
              <CardDescription>
                Take practice tests to improve your skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/dashboard/test">Start Test</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconTarget className="h-5 w-5 text-green-500" />
                My Performance
              </CardTitle>
              <CardDescription>
                View detailed analytics and progress reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard/analytics">View Analytics</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconClock className="h-5 w-5 text-purple-500" />
                Test History
              </CardTitle>
              <CardDescription>
                Review your past test attempts and scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard/history">View History</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Tests */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Test Attempts</CardTitle>
            <CardDescription>Your latest practice test results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Physics Mock Test 1",
                  score: 85,
                  date: "2 days ago",
                  questions: 50,
                },
                {
                  name: "Chemistry Chapter Test",
                  score: 72,
                  date: "5 days ago",
                  questions: 30,
                },
                {
                  name: "Mathematics Full Test",
                  score: 78,
                  date: "1 week ago",
                  questions: 60,
                },
              ].map((test, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-4 last:border-0"
                >
                  <div>
                    <p className="font-medium">{test.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {test.questions} questions • {test.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                      {test.score}%
                    </p>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/test/result/${index + 1}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subject-wise Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
            <CardDescription>
              Your performance across different subjects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  subject: "Physics",
                  score: 85,
                  tests: 8,
                  color: "bg-blue-500",
                },
                {
                  subject: "Chemistry",
                  score: 72,
                  tests: 6,
                  color: "bg-green-500",
                },
                {
                  subject: "Mathematics",
                  score: 78,
                  tests: 9,
                  color: "bg-purple-500",
                },
              ].map((subject) => (
                <div key={subject.subject} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{subject.subject}</span>
                    <span className="text-muted-foreground text-sm">
                      {subject.tests} tests • Avg: {subject.score}%
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
    </PageContainer>
  );
}
