"use client";

import { useState, useMemo } from "react";
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
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Loader2,
  Atom,
  FlaskConical,
  Calculator,
  Dna,
  Search,
  ChevronRight,
  BookOpen,
  Settings2,
  PlayCircle,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import PageContainer from "@/components/layout/page-container";

const SUBJECT_ICONS: Record<string, any> = {
  Physics: Atom,
  Chemistry: FlaskConical,
  Mathematics: Calculator,
  Maths: Calculator,
  Biology: Dna,
};

const MotionCard = motion(Card);

export default function PracticeTestPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedSubjectName, setSelectedSubjectName] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [selectedChapterName, setSelectedChapterName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [questionCount, setQuestionCount] = useState(10);
  const [duration, setDuration] = useState(30);

  const { data: subjects, isLoading: isLoadingSubjects } =
    api.exam.listSubjects.useQuery();

  const { data: chapters, isLoading: isLoadingChapters } =
    api.exam.listChapters.useQuery(
      { subjectId: selectedSubject! },
      { enabled: !!selectedSubject },
    );

  const groupedSubjects = useMemo(() => {
    if (!subjects?.data) return {};
    const grouped: Record<string, any[]> = {};
    subjects.data.forEach((subject: any) => {
      // Normalize standard to ensure consistent grouping (e.g. "11" -> "Class 11")
      const stdRaw = subject.standard || "Other";
      const stdKey = stdRaw
        .toString()
        .replace(/class\s*/i, "")
        .trim();
      const displayStd = stdKey === "Other" ? "Other" : `Class ${stdKey}`;

      if (!grouped[displayStd]) grouped[displayStd] = [];
      grouped[displayStd].push(subject);
    });
    // Sort keys to ensure Class 11 comes before Class 12, etc.
    return Object.fromEntries(
      Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0])),
    );
  }, [subjects]);

  const filteredChapters = useMemo(() => {
    if (!chapters?.data || !searchQuery) return chapters?.data || [];
    return chapters.data.filter((chapter: any) =>
      chapter.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [chapters, searchQuery]);

  const createTestMutation = api.exam.tests.createChapterTest.useMutation({
    onSuccess: (res) => {
      // @ts-ignore
      if (res.success && res.data?.testId) {
        toast.success("Practice test created!");
        // @ts-ignore
        router.push(`/dashboard/test/${res.data.testId}`);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleStartTest = () => {
    if (!selectedChapter) {
      toast.error("Please select a chapter");
      return;
    }
    createTestMutation.mutate({
      chapterId: selectedChapter,
      count: questionCount,
      time: duration * 60,
    });
  };

  const getSubjectIcon = (name: string) => {
    const Icon = SUBJECT_ICONS[name] || BookOpen;
    return <Icon className="h-6 w-6" />;
  };

  return (
    <PageContainer>
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Custom Practice</h1>
          <p className="text-muted-foreground text-lg">
            Master your subjects one chapter at a time
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Steps Sidebar */}
          <div className="space-y-4 md:col-span-1">
            {[
              {
                num: 1,
                title: "Select Subject",
                active: step === 1,
                done: step > 1,
              },
              {
                num: 2,
                title: "Choose Chapter",
                active: step === 2,
                done: step > 2,
              },
              {
                num: 3,
                title: "Configuration",
                active: step === 3,
                done: step > 3,
              },
            ].map((s) => (
              <div
                key={s.num}
                className={cn(
                  "flex items-center gap-4 rounded-xl p-4 transition-all duration-300",
                  s.active
                    ? "bg-primary/10 border-primary/20 border shadow-sm"
                    : "opacity-60 hover:opacity-100",
                  s.done ? "text-primary opacity-100" : "",
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
                    s.active
                      ? "bg-primary text-primary-foreground"
                      : s.done
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  {s.done ? "✓" : s.num}
                </div>
                <span className="font-medium">{s.title}</span>
              </div>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Subjects */}
              {step === 1 && (
                <MotionCard
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="border-2 shadow-md"
                >
                  <CardHeader>
                    <CardTitle>Choose a Subject</CardTitle>
                    <CardDescription>
                      Select the subject you want to practice.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingSubjects ? (
                      <div className="flex h-40 items-center justify-center">
                        <Loader2 className="text-primary h-8 w-8 animate-spin" />
                      </div>
                    ) : (
                      <div className="space-y-8">
                        {Object.entries(groupedSubjects).map(
                          ([standard, standardSubjects]) => (
                            <div key={standard} className="space-y-4">
                              <div className="border-border/50 flex items-center gap-2 border-b pb-2">
                                <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                                  <BookOpen className="text-primary h-4 w-4" />
                                </div>
                                <h3 className="text-lg font-semibold tracking-tight">
                                  {standard}
                                </h3>
                                <Badge variant="secondary" className="ml-auto">
                                  {standardSubjects.length} Subjects
                                </Badge>
                              </div>
                              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {standardSubjects.map((subject: any) => (
                                  <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    key={subject.id}
                                    onClick={() => {
                                      setSelectedSubject(subject.id);
                                      // @ts-ignore
                                      setSelectedSubjectName(
                                        subject.name || subject.code,
                                      );
                                      setStep(2);
                                    }}
                                    className="border-muted bg-card hover:border-primary/50 hover:bg-primary/5 group flex flex-row items-center justify-start gap-4 rounded-xl border p-4 text-left transition-all"
                                  >
                                    <div className="bg-primary/10 group-hover:bg-primary/20 text-primary shrink-0 rounded-full p-3 transition-colors">
                                      {/* @ts-ignore */}
                                      {getSubjectIcon(subject.name)}
                                    </div>
                                    <div className="flex flex-col items-start gap-0.5">
                                      <span className="text-foreground line-clamp-1 text-base font-semibold">
                                        {subject.name || "Subject"}
                                      </span>
                                      {subject.code && (
                                        <span className="text-muted-foreground text-xs">
                                          {subject.code} •{" "}
                                          {standard === "Other"
                                            ? "Standard N/A"
                                            : standard}
                                        </span>
                                      )}
                                    </div>
                                  </motion.button>
                                ))}
                              </div>
                            </div>
                          ),
                        )}
                        {Object.keys(groupedSubjects).length === 0 && (
                          <div className="text-muted-foreground py-12 text-center">
                            No subjects available.
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </MotionCard>
              )}

              {/* Step 2: Chapters */}
              {step === 2 && (
                <MotionCard
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="border-2 shadow-md"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div className="space-y-1.5">
                      <CardTitle className="flex items-center gap-2">
                        <span className="text-muted-foreground font-normal">
                          Subject:
                        </span>
                        {selectedSubjectName}
                      </CardTitle>
                      <CardDescription>
                        Select a chapter to continue.
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setStep(1)}
                    >
                      Change Subject
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="relative">
                      <Search className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                      <Input
                        placeholder="Search chapters..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    {isLoadingChapters ? (
                      <div className="flex h-40 items-center justify-center">
                        <Loader2 className="text-primary h-8 w-8 animate-spin" />
                      </div>
                    ) : (
                      <ScrollArea className="h-[300px] pr-4">
                        <div className="grid gap-2">
                          {filteredChapters?.map((chapter: any) => (
                            <motion.div
                              key={chapter.id}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              onClick={() => {
                                setSelectedChapter(chapter.id);
                                setSelectedChapterName(chapter.name);
                                setStep(3);
                              }}
                              className={cn(
                                "hover:bg-accent hover:border-primary/50 flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-all",
                                selectedChapter === chapter.id
                                  ? "border-primary bg-primary/5"
                                  : "border-border",
                              )}
                            >
                              <span className="text-sm font-medium">
                                {chapter.name}
                              </span>
                              <ChevronRight className="text-muted-foreground h-4 w-4" />
                            </motion.div>
                          ))}
                          {filteredChapters?.length === 0 && (
                            <div className="text-muted-foreground py-8 text-center">
                              No chapters found matching "{searchQuery}"
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                    )}
                  </CardContent>
                </MotionCard>
              )}

              {/* Step 3: Configuration */}
              {step === 3 && (
                <MotionCard
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="border-2"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div>
                      <CardTitle>Configure Test</CardTitle>
                      <CardDescription>
                        Customize your practice session.
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setStep(2)}
                    >
                      Change Chapter
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-muted/30 space-y-3 rounded-lg border p-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subject</span>
                        <span className="font-medium">
                          {selectedSubjectName}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Chapter</span>
                        <span className="text-primary font-medium">
                          {selectedChapterName}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-base">Number of Questions</Label>
                        <Badge variant="outline" className="px-3 py-1 text-lg">
                          {questionCount}
                        </Badge>
                      </div>
                      <Slider
                        value={[questionCount]}
                        onValueChange={(v) => setQuestionCount(v[0])}
                        min={5}
                        max={50}
                        step={5}
                        className="py-4"
                      />
                      <div className="text-muted-foreground flex justify-between text-xs">
                        <span>5 Questions</span>
                        <span>25 Questions</span>
                        <span>50 Questions</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-base">Test Duration</Label>
                        <Badge variant="outline" className="px-3 py-1 text-lg">
                          {duration} Minutes
                        </Badge>
                      </div>
                      <Slider
                        value={[duration]}
                        onValueChange={(v) => setDuration(v[0])}
                        min={10}
                        max={120}
                        step={5}
                        className="py-4"
                      />
                      <div className="text-muted-foreground flex justify-between text-xs">
                        <span>10 min</span>
                        <span>60 min</span>
                        <span>120 min</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4">
                      <Settings2 className="mt-0.5 h-5 w-5 text-yellow-600" />
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold text-yellow-700 dark:text-yellow-500">
                          Practice Mode
                        </h4>
                        <p className="text-muted-foreground text-xs">
                          In practice mode, you will get instant feedback after
                          every question. There is no time limit, take your time
                          to learn.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      size="lg"
                      className="w-full gap-2 text-lg"
                      onClick={handleStartTest}
                      disabled={createTestMutation.isPending}
                    >
                      {createTestMutation.isPending ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <PlayCircle className="h-5 w-5" />
                      )}
                      Start Practice Session
                    </Button>
                  </CardFooter>
                </MotionCard>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
