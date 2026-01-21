"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Timer,
  BookOpen,
  Trophy,
  ArrowRight,
  FlaskConical,
  Calculator,
  Atom,
  Dna,
} from "lucide-react";
import { toast } from "sonner";

export default function ExamHubPage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);

  // Fetch available subjects to get their IDs
  const { data: subjectsResponse } = api.exam.listSubjects.useQuery();

  const createTestMutation = api.exam.tests.create.useMutation({
    onSuccess: (res) => {
      // @ts-ignore - response type mismatch fix
      if (res.success && res.data?.testId) {
        toast.success("Exam Paper Generated Successfully!");
        // @ts-ignore
        router.push(`/dashboard/test/${res.data.testId}`);
      } else {
        toast.error("Failed to generate test");
        setIsGenerating(false);
      }
    },
    onError: (error) => {
      toast.error("Failed to create exam: " + error.message);
      setIsGenerating(false);
    },
  });

  const handleStartFullMock = async (type: "PCM" | "PCB") => {
    setIsGenerating(true);
    toast.info(`Generating ${type} Full Mock Paper...`);
    createTestMutation.mutate({ type });
  };

  const createSubjectTestMutation =
    api.exam.tests.createSubjectTest.useMutation({
      onSuccess: (res) => {
        // @ts-ignore
        if (res.success && res.data?.testId) {
          toast.success("Subject Exam Generated Successfully!");
          // @ts-ignore
          router.push(`/dashboard/test/${res.data.testId}`);
        } else {
          toast.error("Failed to generate test");
          setIsGenerating(false);
        }
      },
      onError: (error) => {
        toast.error("Failed to create subject exam: " + error.message);
        setIsGenerating(false);
      },
    });

  const handleStartSubjectMock = async (subjectName: string) => {
    // @ts-ignore
    const subjects = subjectsResponse?.data || [];

    const codeMap: Record<string, string> = {
      Physics: "PHYS",
      Chemistry: "CHEM",
      Biology: "BIO",
      Mathematics: "MATHS_1",
    };

    const targetCode = codeMap[subjectName];

    // @ts-ignore
    const foundSubject = subjects.find((s: any) => s.code === targetCode);

    if (!foundSubject) {
      toast.error(
        `Subject data for ${subjectName} is still loading or unavailable.`,
      );
      return;
    }

    setIsGenerating(true);
    toast.info(`Generating ${subjectName} Mock Paper...`);
    createSubjectTestMutation.mutate({
      subjectId: foundSubject.id,
      count: 50,
      time: 90 * 60, // 90 minutes in seconds
    });
  };

  return (
    <div className="flex h-[calc(100vh-52px)] flex-col overflow-auto">
      <div className="space-y-8 p-8">
        {/* Header with gradient */}
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 p-8 backdrop-blur-sm">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Exam Centre
                </h1>
                <p className="text-muted-foreground mt-1">
                  Select a test format to begin. All tests are generated
                  instantly using our AI Exam Engine.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full Mocks Section with enhanced styling */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-500/10">
              <Trophy className="h-5 w-5 text-yellow-600" />
            </div>
            <h2 className="text-xl font-semibold">Full Length Mocks</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="group relative overflow-hidden border-white/10 bg-gradient-to-br from-blue-500/5 to-blue-600/10 shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-blue-500/20 blur-3xl" />
              <CardHeader className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold">
                      MHT-CET (PCM)
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Engineering Stream
                    </CardDescription>
                  </div>
                  <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20">
                    High Yield
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="relative space-y-4">
                <div className="text-muted-foreground flex gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>150 Questions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Timer className="h-4 w-4" />
                    <span>180 Mins</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge
                    variant="outline"
                    className="border-blue-500/20 bg-blue-500/10 text-blue-600"
                  >
                    Physics
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-blue-500/20 bg-blue-500/10 text-blue-600"
                  >
                    Chemistry
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-blue-500/20 bg-blue-500/10 text-blue-600"
                  >
                    Maths
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="relative">
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl"
                  onClick={() => handleStartFullMock("PCM")}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowRight className="mr-2 h-4 w-4" />
                  )}
                  Start Mock Test
                </Button>
              </CardFooter>
            </Card>

            <Card className="group relative overflow-hidden border-white/10 bg-gradient-to-br from-green-500/5 to-green-600/10 shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-green-500/20 blur-3xl" />
              <CardHeader className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold">
                      MHT-CET (PCB)
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Medical Stream
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
                    Popular
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="relative space-y-4">
                <div className="text-muted-foreground flex gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>150 Questions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Timer className="h-4 w-4" />
                    <span>180 Mins</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge
                    variant="outline"
                    className="border-green-500/20 bg-green-500/10 text-green-600"
                  >
                    Physics
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-green-500/20 bg-green-500/10 text-green-600"
                  >
                    Chemistry
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-green-500/20 bg-green-500/10 text-green-600"
                  >
                    Biology
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="relative">
                <Button
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg hover:shadow-xl"
                  onClick={() => handleStartFullMock("PCB")}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowRight className="mr-2 h-4 w-4" />
                  )}
                  Start Mock Test
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Subject Mocks Section with enhanced styling */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10">
              <FlaskConical className="h-5 w-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold">Subject-Wise Mocks</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Physics",
                icon: Atom,
                colorClass: "purple",
              },
              {
                name: "Chemistry",
                icon: FlaskConical,
                colorClass: "teal",
              },
              {
                name: "Mathematics",
                icon: Calculator,
                colorClass: "orange",
              },
              {
                name: "Biology",
                icon: Dna,
                colorClass: "emerald",
              },
            ].map((subject) => (
              <Card
                key={subject.name}
                className="group bg-card/50 relative cursor-pointer overflow-hidden border-white/10 backdrop-blur-sm transition-all hover:scale-105 hover:shadow-lg"
                onClick={() => handleStartSubjectMock(subject.name)}
              >
                <CardHeader className="relative pb-2">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                    <subject.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg font-bold">
                    {subject.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <div className="text-muted-foreground mb-4 text-sm">
                    50 Questions • 90 Mins
                  </div>
                  <Button
                    variant="outline"
                    className="group w-full border-white/10 hover:bg-blue-500/10"
                    disabled={isGenerating}
                  >
                    Start Test
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
