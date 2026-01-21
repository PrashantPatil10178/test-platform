import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
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
  IconRocket,
} from "@tabler/icons-react";
import Link from "next/link";

export default async function StudentDashboard() {
  const session = await auth();

  if (!session || session.user.role !== "STUDENT") {
    return redirect("/signin");
  }

  return (
    <div className="flex h-[calc(100vh-52px)] flex-col overflow-auto">
      <div className="flex flex-col space-y-6 p-6">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 p-8 shadow-xl">
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]" />

          {/* Decorative blur circles */}
          <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-blue-400/20 blur-3xl" />

          <div className="relative flex items-center justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
                <IconRocket className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">
                  Student Dashboard
                </span>
              </div>
              <h2 className="mb-2 text-3xl font-bold tracking-tight text-white">
                Welcome back, {session.user.name?.split(" ")[0] || "Student"} 👋
              </h2>
              <p className="text-blue-100">
                Continue your learning journey and ace your exams!
              </p>
            </div>
            <Button
              asChild
              className="bg-white text-blue-600 shadow-lg hover:bg-blue-50 hover:shadow-xl"
            >
              <Link href="/dashboard/test">
                <IconBrain className="mr-2 h-4 w-4" />
                Start Practice Test
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="group relative overflow-hidden border-white/10 bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20">
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl" />
            <CardHeader className="relative">
              <CardDescription>Tests Completed</CardDescription>
              <CardTitle className="text-3xl font-bold">12</CardTitle>
              <CardAction>
                <Badge
                  variant="outline"
                  className="border-blue-500/20 bg-blue-500/10 text-blue-600"
                >
                  <IconTrendingUp className="mr-1 h-3 w-3" />
                  +3 this week
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="text-muted-foreground relative text-sm">
              Keep up the great work!
            </CardFooter>
          </Card>

          <Card className="group relative overflow-hidden border-white/10 bg-gradient-to-br from-green-500/10 to-green-600/5 backdrop-blur-sm transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/20">
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-green-500/10 blur-2xl" />
            <CardHeader className="relative">
              <CardDescription>Average Score</CardDescription>
              <CardTitle className="text-3xl font-bold">78%</CardTitle>
              <CardAction>
                <Badge
                  variant="outline"
                  className="border-green-500/20 bg-green-500/10 text-green-600"
                >
                  <IconTrendingUp className="mr-1 h-3 w-3" />
                  +5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="text-muted-foreground relative text-sm">
              Improving steadily
            </CardFooter>
          </Card>

          <Card className="group relative overflow-hidden border-white/10 bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-sm transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20">
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl" />
            <CardHeader className="relative">
              <CardDescription>Study Time</CardDescription>
              <CardTitle className="text-3xl font-bold">24h</CardTitle>
              <CardAction>
                <Badge
                  variant="outline"
                  className="border-purple-500/20 bg-purple-500/10 text-purple-600"
                >
                  <IconClock className="mr-1 h-3 w-3" />
                  This month
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="text-muted-foreground relative text-sm">
              Good momentum!
            </CardFooter>
          </Card>

          <Card className="group relative overflow-hidden border-white/10 bg-gradient-to-br from-amber-500/10 to-amber-600/5 backdrop-blur-sm transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/20">
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl" />
            <CardHeader className="relative">
              <CardDescription>Accuracy Rate</CardDescription>
              <CardTitle className="text-3xl font-bold">82%</CardTitle>
              <CardAction>
                <Badge
                  variant="outline"
                  className="border-amber-500/20 bg-amber-500/10 text-amber-600"
                >
                  <IconTarget className="mr-1 h-3 w-3" />
                  Target: 90%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="text-muted-foreground relative text-sm">
              Almost there!
            </CardFooter>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="group bg-card/50 relative overflow-hidden border-white/10 backdrop-blur-sm transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20">
            <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl transition-all group-hover:bg-blue-500/20" />
            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-2">
                <div className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 p-2 shadow-lg">
                  <IconBrain className="h-5 w-5 text-white" />
                </div>
                Practice Tests
              </CardTitle>
              <CardDescription>
                Take practice tests to improve your skills
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:shadow-lg hover:shadow-blue-500/30"
              >
                <Link href="/dashboard/test">Start Test</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group bg-card/50 relative overflow-hidden border-white/10 backdrop-blur-sm transition-all hover:scale-105 hover:shadow-lg hover:shadow-green-500/20">
            <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-green-500/10 blur-3xl transition-all group-hover:bg-green-500/20" />
            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-2">
                <div className="rounded-lg bg-gradient-to-br from-green-500 to-green-600 p-2 shadow-lg">
                  <IconTarget className="h-5 w-5 text-white" />
                </div>
                My Performance
              </CardTitle>
              <CardDescription>
                View detailed analytics and progress reports
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <Button
                asChild
                variant="outline"
                className="w-full border-white/10 hover:bg-green-500/10"
              >
                <Link href="/dashboard/analytics">View Analytics</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group bg-card/50 relative overflow-hidden border-white/10 backdrop-blur-sm transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20">
            <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl transition-all group-hover:bg-purple-500/20" />
            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-2">
                <div className="rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 p-2 shadow-lg">
                  <IconClock className="h-5 w-5 text-white" />
                </div>
                Test History
              </CardTitle>
              <CardDescription>
                Review your past test attempts and scores
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <Button
                asChild
                variant="outline"
                className="w-full border-white/10 hover:bg-purple-500/10"
              >
                <Link href="/dashboard/test-history">View History</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Tests */}
        <Card className="bg-card/50 border-white/10 backdrop-blur-sm">
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
                  color: "blue",
                },
                {
                  name: "Chemistry Chapter Test",
                  score: 72,
                  date: "5 days ago",
                  questions: 30,
                  color: "green",
                },
                {
                  name: "Mathematics Full Test",
                  score: 78,
                  date: "1 week ago",
                  questions: 60,
                  color: "purple",
                },
              ].map((test, index) => (
                <div
                  key={index}
                  className="group bg-card/50 hover:bg-card/70 flex items-center justify-between rounded-lg border border-white/10 p-4 transition-all hover:border-white/20"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`rounded-lg bg-gradient-to-br from-${test.color}-500 to-${test.color}-600 p-3 shadow-lg`}
                    >
                      <IconBrain className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{test.name}</p>
                      <p className="text-muted-foreground text-sm">
                        {test.questions} questions • {test.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">
                        {test.score}%
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <Link href={`/dashboard/test/result/${index + 1}`}>
                        View Details →
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subject-wise Performance */}
        <Card className="bg-card/50 border-white/10 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
            <CardDescription>
              Your performance across different subjects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                {
                  subject: "Physics",
                  score: 85,
                  tests: 8,
                  color: "blue",
                  gradient: "from-blue-500 to-blue-600",
                },
                {
                  subject: "Chemistry",
                  score: 72,
                  tests: 6,
                  color: "green",
                  gradient: "from-green-500 to-green-600",
                },
                {
                  subject: "Mathematics",
                  score: 78,
                  tests: 9,
                  color: "purple",
                  gradient: "from-purple-500 to-purple-600",
                },
              ].map((subject) => (
                <div key={subject.subject} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`rounded-lg bg-gradient-to-br ${subject.gradient} p-2 shadow-lg`}
                      >
                        <IconTarget className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium">{subject.subject}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground text-sm">
                        {subject.tests} tests
                      </span>
                      <span
                        className={`text-lg font-bold text-${subject.color}-600`}
                      >
                        {subject.score}%
                      </span>
                    </div>
                  </div>
                  <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className={`h-3 rounded-full bg-gradient-to-r ${subject.gradient} shadow-lg transition-all`}
                      style={{ width: `${subject.score}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
