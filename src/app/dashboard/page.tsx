"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  ClipboardList,
  CheckCircle,
  TrendingUp,
  Calendar,
  Target,
  Brain,
  Award,
  Clock,
  BookOpen,
  BarChart3,
  Home,
  FileText,
  User,
  Settings,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Star,
  AlertCircle,
  Check,
  X,
} from "lucide-react";

// Demo data
const demoStats = {
  totalUsers: 15420,
  totalTests: 2847,
  testsCompleted: 12890,
  activeUsers: 3240,
  averageScore: 87.5,
  completionRate: 92.3,
};

const recentActivity = [
  {
    user: "Rahul Sharma",
    action: "Completed Physics Test",
    time: "2 hours ago",
    score: 95,
  },
  {
    user: "Priya Patel",
    action: "Started Chemistry Module",
    time: "4 hours ago",
    score: null,
  },
  {
    user: "Arjun Kumar",
    action: "Achieved 90% in Maths",
    time: "6 hours ago",
    score: 90,
  },
  {
    user: "Sneha Gupta",
    action: "Joined Study Group",
    time: "8 hours ago",
    score: null,
  },
];

const subjectProgress = [
  { subject: "Physics", progress: 85, color: "blue" },
  { subject: "Chemistry", progress: 72, color: "green" },
  { subject: "Mathematics", progress: 91, color: "orange" },
];

const testQuestions = [
  {
    id: 1,
    question: "What is the SI unit of force?",
    options: ["Newton", "Joule", "Watt", "Pascal"],
    correct: 0,
    explanation: "Force is measured in Newtons (N) in the SI system.",
  },
  {
    id: 2,
    question: "Which of the following is a noble gas?",
    options: ["Oxygen", "Nitrogen", "Argon", "Carbon"],
    correct: 2,
    explanation: "Argon is a noble gas in group 18 of the periodic table.",
  },
  {
    id: 3,
    question: "What is the derivative of sin(x)?",
    options: ["cos(x)", "-sin(x)", "tan(x)", "sec(x)"],
    correct: 0,
    explanation: "The derivative of sin(x) is cos(x).",
  },
];

const sidebarItems = [
  { id: "overview", label: "Dashboard", icon: Home },
  { id: "tests", label: "Tests", icon: FileText },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [currentTest, setCurrentTest] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const startTest = () => {
    setTestStarted(true);
    setSelectedAnswers(new Array(testQuestions.length).fill(-1));
  };

  const submitTest = () => {
    setTestCompleted(true);
  };

  const resetTest = () => {
    setTestStarted(false);
    setTestCompleted(false);
    setSelectedAnswers([]);
    setCurrentTest(0);
  };

  const renderOverview = () => (
    <>
      {/* Header */}
      <div className="mb-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-foreground mb-2 text-4xl font-bold">
              Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Welcome back! Here's your learning overview.
            </p>
          </div>
          <Button className="clean-gradient text-white hover:opacity-90">
            <Brain className="mr-2 h-4 w-4" />
            Create New Test
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border shadow-elegant hover:shadow-elegant-lg smooth-transition hover-lift group relative overflow-hidden">
            <div className="absolute -top-10 -right-10 h-20 w-20 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 transition-transform duration-500 group-hover:scale-150"></div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {demoStats.totalUsers.toLocaleString()}
              </div>
              <p className="text-muted-foreground flex items-center text-xs">
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-border shadow-elegant hover:shadow-elegant-lg smooth-transition hover-lift group relative overflow-hidden">
            <div className="absolute -top-10 -right-10 h-20 w-20 rounded-full bg-gradient-to-br from-green-500/10 to-blue-500/10 transition-transform duration-500 group-hover:scale-150"></div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <Target className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {demoStats.activeUsers.toLocaleString()}
              </div>
              <p className="text-muted-foreground flex items-center text-xs">
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                +8% from last week
              </p>
            </CardContent>
          </Card>

          <Card className="border-border shadow-elegant hover:shadow-elegant-lg smooth-transition hover-lift group relative overflow-hidden">
            <div className="absolute -top-10 -right-10 h-20 w-20 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 transition-transform duration-500 group-hover:scale-150"></div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Tests Created
              </CardTitle>
              <ClipboardList className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {demoStats.totalTests.toLocaleString()}
              </div>
              <p className="text-muted-foreground flex items-center text-xs">
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                +15% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-border shadow-elegant hover:shadow-elegant-lg smooth-transition hover-lift group relative overflow-hidden">
            <div className="absolute -top-10 -right-10 h-20 w-20 rounded-full bg-gradient-to-br from-orange-500/10 to-red-500/10 transition-transform duration-500 group-hover:scale-150"></div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Completion Rate
              </CardTitle>
              <CheckCircle className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {demoStats.completionRate}%
              </div>
              <p className="text-muted-foreground flex items-center text-xs">
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                +5% from last month
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Subject Progress */}
        <Card className="border-border shadow-elegant hover:shadow-elegant-lg smooth-transition hover-lift lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-blue-500" />
              Subject Progress
            </CardTitle>
            <CardDescription>Your performance across subjects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {subjectProgress.map((item, index) => (
              <div key={item.subject} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.subject}</span>
                  <span className="text-muted-foreground">
                    {item.progress}%
                  </span>
                </div>
                <Progress value={item.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-border shadow-elegant hover:shadow-elegant-lg smooth-transition hover-lift lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-green-500" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest user activities and achievements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="bg-muted/50 hover:bg-muted smooth-transition flex items-center justify-between rounded-lg p-3"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                      <span className="text-sm font-bold text-white">
                        {activity.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.user}</p>
                      <p className="text-muted-foreground text-xs">
                        {activity.action}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {activity.score && (
                      <Badge className="mb-1 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                        {activity.score}%
                      </Badge>
                    )}
                    <p className="text-muted-foreground text-xs">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card className="border-border shadow-elegant hover:shadow-elegant-lg smooth-transition hover-lift mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-purple-500" />
            Performance Overview
          </CardTitle>
          <CardDescription>Key metrics and insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-blue-500">
                {demoStats.averageScore}%
              </div>
              <p className="text-muted-foreground text-sm">Average Score</p>
              <Badge className="mt-2 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                <Award className="mr-1 h-3 w-3" />
                Excellent
              </Badge>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-green-500">
                {demoStats.testsCompleted.toLocaleString()}
              </div>
              <p className="text-muted-foreground text-sm">Tests Completed</p>
              <Badge className="mt-2 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                <CheckCircle className="mr-1 h-3 w-3" />
                On Track
              </Badge>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-orange-500">
                2.4h
              </div>
              <p className="text-muted-foreground text-sm">Avg. Study Time</p>
              <Badge className="mt-2 bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
                <Calendar className="mr-1 h-3 w-3" />
                Daily
              </Badge>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-purple-500">156</div>
              <p className="text-muted-foreground text-sm">Questions Solved</p>
              <Badge className="mt-2 bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                <Target className="mr-1 h-3 w-3" />
                This Week
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );

  const renderTests = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground mb-2 text-4xl font-bold">Tests</h1>
          <p className="text-muted-foreground text-lg">
            Practice and take tests to improve your skills
          </p>
        </div>
        <Button className="clean-gradient text-white hover:opacity-90">
          <FileText className="mr-2 h-4 w-4" />
          New Test
        </Button>
      </div>

      {!testStarted ? (
        <Card className="border-border shadow-elegant hover:shadow-elegant-lg smooth-transition hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="mr-2 h-6 w-6 text-blue-500" />
              MHT CET Practice Test
            </CardTitle>
            <CardDescription>
              Test your knowledge with {testQuestions.length} questions covering
              Physics, Chemistry, and Mathematics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">
                  {testQuestions.length}
                </div>
                <p className="text-muted-foreground text-sm">Questions</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">30</div>
                <p className="text-muted-foreground text-sm">Minutes</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">100</div>
                <p className="text-muted-foreground text-sm">Marks</p>
              </div>
            </div>
            <Button
              onClick={startTest}
              className="clean-gradient w-full text-white hover:opacity-90"
            >
              <Play className="mr-2 h-4 w-4" />
              Start Test
            </Button>
          </CardContent>
        </Card>
      ) : testCompleted ? (
        <Card className="border-border shadow-elegant hover:shadow-elegant-lg smooth-transition hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-6 w-6 text-green-500" />
              Test Completed!
            </CardTitle>
            <CardDescription>Your results and explanations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-blue-500">85%</div>
              <p className="text-muted-foreground">Your Score</p>
              <Badge className="mt-2 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                <Award className="mr-1 h-4 w-4" />
                Well Done!
              </Badge>
            </div>
            <div className="space-y-4">
              {testQuestions.map((q, index) => (
                <div key={q.id} className="bg-muted/50 rounded-lg p-4">
                  <p className="mb-2 font-medium">{q.question}</p>
                  <div className="space-y-1">
                    {q.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`flex items-center rounded p-2 ${
                          optIndex === q.correct
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : selectedAnswers[index] === optIndex &&
                                optIndex !== q.correct
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              : "bg-background"
                        }`}
                      >
                        {optIndex === q.correct ? (
                          <Check className="mr-2 h-4 w-4 text-green-600" />
                        ) : selectedAnswers[index] === optIndex &&
                          optIndex !== q.correct ? (
                          <X className="mr-2 h-4 w-4 text-red-600" />
                        ) : (
                          <div className="mr-2 h-4 w-4" />
                        )}
                        {option}
                      </div>
                    ))}
                  </div>
                  <p className="text-muted-foreground mt-2 text-sm">
                    {q.explanation}
                  </p>
                </div>
              ))}
            </div>
            <Button onClick={resetTest} variant="outline" className="w-full">
              <RotateCcw className="mr-2 h-4 w-4" />
              Take Test Again
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-border shadow-elegant hover:shadow-elegant-lg smooth-transition hover-lift">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                Question {currentTest + 1} of {testQuestions.length}
              </CardTitle>
              <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                {Math.floor(((currentTest + 1) / testQuestions.length) * 100)}%
                Complete
              </Badge>
            </div>
            <Progress
              value={((currentTest + 1) / testQuestions.length) * 100}
              className="mt-2"
            />
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-medium">
                {testQuestions[currentTest].question}
              </h3>
              <div className="space-y-3">
                {testQuestions[currentTest].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(currentTest, index)}
                    className={`w-full rounded-lg border p-4 text-left transition-all ${
                      selectedAnswers[currentTest] === index
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                        : "border-border hover:border-blue-300"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`mr-3 h-4 w-4 rounded-full border-2 ${
                          selectedAnswers[currentTest] === index
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-300"
                        }`}
                      />
                      {option}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentTest(Math.max(0, currentTest - 1))}
                disabled={currentTest === 0}
              >
                Previous
              </Button>
              {currentTest === testQuestions.length - 1 ? (
                <Button
                  onClick={submitTest}
                  className="clean-gradient text-white hover:opacity-90"
                >
                  Submit Test
                </Button>
              ) : (
                <Button
                  onClick={() => setCurrentTest(currentTest + 1)}
                  className="clean-gradient text-white hover:opacity-90"
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-foreground mb-2 text-4xl font-bold">Profile</h1>
        <p className="text-muted-foreground text-lg">
          Manage your account settings and preferences
        </p>
      </div>

      <Card className="border-border shadow-elegant hover:shadow-elegant-lg smooth-transition hover-lift">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="John" />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Doe" />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue="john.doe@example.com"
            />
          </div>
          <Button className="clean-gradient text-white hover:opacity-90">
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-foreground mb-2 text-4xl font-bold">Settings</h1>
        <p className="text-muted-foreground text-lg">
          Configure your preferences
        </p>
      </div>

      <Card className="border-border shadow-elegant hover:shadow-elegant-lg smooth-transition hover-lift">
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Customize your experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Dark Mode</Label>
              <p className="text-muted-foreground text-sm">
                Toggle dark/light theme
              </p>
            </div>
            <Button variant="outline" size="sm">
              Toggle
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label>Email Notifications</Label>
              <p className="text-muted-foreground text-sm">
                Receive updates via email
              </p>
            </div>
            <Button variant="outline" size="sm">
              Enable
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return renderOverview();
      case "tests":
        return renderTests();
      case "profile":
        return renderProfile();
      case "settings":
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="bg-background relative min-h-screen overflow-hidden">
      <div className="dot-pattern absolute inset-0"></div>
      <div className="floating-shapes absolute inset-0"></div>

      <div className="relative z-10 flex">
        {/* Sidebar */}
        <div className="bg-card border-border min-h-screen w-64 border-r p-6">
          <div className="mb-8 flex items-center">
            <div className="clean-gradient relative mr-3 flex h-8 w-8 items-center justify-center rounded-lg">
              <Brain className="relative z-10 h-5 w-5 text-white" />
            </div>
            <span className="text-foreground text-xl font-bold">
              AI-CET Prep
            </span>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex w-full items-center rounded-lg px-4 py-3 text-left transition-all ${
                  activeSection === item.id
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">{renderContent()}</div>
      </div>
    </div>
  );
}
