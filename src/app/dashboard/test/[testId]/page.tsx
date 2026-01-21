"use client";
import React, { memo } from "react";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { api } from "@/trpc/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, AlertCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Clock,
  CheckCircle,
  XCircle,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Bot,
  Lightbulb,
  Menu,
  Maximize,
  Minimize,
  X,
  Home,
  User,
  Info,
  LayoutGrid,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { MathJax, MathJaxContext } from "better-react-mathjax";

// Parser function to clean up question HTML
const parseQuestionHTML = (html: string): string => {
  return (
    html
      // Convert display MathJax to inline by removing display="true"
      .replace(/display="true"/g, 'display="false"')
      // Add inline style to MathJax containers to force inline display
      .replace(
        /<mjx-container([^>]*?)>/g,
        '<mjx-container$1 style="display: inline; vertical-align: middle; margin: 0;">',
      )
      // Replace div.htmroot with span for inline rendering
      .replace(/<div class="htmroot">/g, "<span>")
      .replace(/<div class="document">/g, "<span>")
      .replace(/<\/div>/g, "</span>")
      // Replace paragraph tags with spans
      .replace(/<p class="[^"]*">/g, "<span>")
      .replace(/<\/p>/g, "</span>")
      .trim()
  );
};

interface Question {
  id: string;
  subject: string;
  question: string;
  options: string[];
  // correctAnswer: number; // Hidden
  hint?: string;
}

const mathJaxConfig = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
  },
};

// Props for the memoized main interface
interface TestInterfaceProps {
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswers: Record<string, number>;
  markedForReview: Record<string, boolean>;
  visited: Record<string, boolean>;
  activeSubject: string;
  availableSubjects: string[];
  isPaletteOpen: boolean;
  status: string;
  onAnswerSelect: (index: number) => void;
  onNavigate: (index: number) => void;
  onSubjectChange: (subject: string) => void;
  onPaletteToggle: (open: boolean) => void;
  onSubmit: () => void;
  onMarkForReview: () => void;
  onClearResponse: () => void;
  questionContentRef: React.RefObject<HTMLDivElement | null>;
  parsedQuestionHTML: string;
  parsedOptionsHTML: string[];
  userName?: string | null;
  userEmail?: string | null;
}

// Memoized Test Interface Component
const TestInterface = memo(
  ({
    questions,
    currentQuestionIndex,
    selectedAnswers,
    markedForReview,
    visited,
    activeSubject,
    availableSubjects,
    isPaletteOpen,
    status,
    onAnswerSelect,
    onNavigate,
    onSubjectChange,
    onPaletteToggle,
    onSubmit,
    onMarkForReview,
    onClearResponse,
    questionContentRef,
    parsedQuestionHTML,
    parsedOptionsHTML,
    userName,
    userEmail,
  }: TestInterfaceProps) => {
    const currentQuestion = questions[currentQuestionIndex];

    const getQuestionStatus = (questionId: string) => {
      const isAnswered = selectedAnswers[questionId] !== undefined;
      const isMarked = markedForReview[questionId];
      const isVisited = visited[questionId];

      if (isAnswered && isMarked) return "answered-marked";
      if (isAnswered) return "answered";
      if (isMarked) return "marked";
      if (isVisited && !isAnswered) return "not-answered";
      return "not-visited";
    };

    // Calculate Stats
    const stats = {
      answered: Object.keys(selectedAnswers).length,
      notAnswered: Object.keys(visited).filter(
        (id) => selectedAnswers[id] === undefined,
      ).length,
      notVisited: questions.length - Object.keys(visited).length,
      marked: Object.keys(markedForReview).filter(
        (id) => selectedAnswers[id] === undefined,
      ).length,
      markedAnswered: Object.keys(markedForReview).filter(
        (id) => selectedAnswers[id] !== undefined,
      ).length,
    };

    if (!currentQuestion) return null;

    return (
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side: Question Area */}
        <div className="bg-card flex min-h-0 flex-1 flex-col overflow-hidden">
          {/* Subject Tabs */}
          <div className="border-border bg-muted/10 hide-scrollbar flex flex-shrink-0 overflow-x-auto border-b">
            {availableSubjects.map((subject) => (
              <button
                key={subject}
                onClick={() => onSubjectChange(subject)}
                className={cn(
                  "border-border/40 hover:bg-muted/50 relative border-r px-6 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200",
                  activeSubject === subject
                    ? "text-primary bg-background shadow-[inset_0_-2px_0_0_theme(colors.primary.DEFAULT)]"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {subject}
              </button>
            ))}
          </div>

          {/* Question Header */}
          <div className="border-border bg-card/50 flex flex-shrink-0 items-center justify-between border-b px-6 py-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="border-primary/20 bg-primary/5 px-3 py-1 text-sm"
              >
                Question {currentQuestionIndex + 1}
              </Badge>
              <div className="bg-border mx-1 h-4 w-[1px]" />
              <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                Single Choice
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Badge
                variant="secondary"
                className="flex items-center gap-1.5 border-green-200 bg-green-500/10 text-green-700 hover:bg-green-500/20"
              >
                <span className="font-bold">+1</span> Correct
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1.5 border-red-200 bg-red-500/10 text-red-700 hover:bg-red-500/20"
              >
                <span className="font-bold">0</span> Wrong
              </Badge>
            </div>
          </div>

          {/* Question Content */}
          <ScrollArea className="min-h-0 flex-1 p-6">
            <div className="mx-auto max-w-4xl" ref={questionContentRef}>
              <div className="text-foreground mb-6 text-lg leading-relaxed">
                <MathJax>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: parsedQuestionHTML,
                    }}
                  />
                </MathJax>
              </div>

              <RadioGroup
                value={selectedAnswers[currentQuestion.id]?.toString() ?? ""}
                onValueChange={(value) => onAnswerSelect(parseInt(value))}
                className="space-y-4"
              >
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    className={cn(
                      "group relative flex cursor-pointer items-start space-x-3 rounded-xl border p-4 transition-all duration-200",
                      selectedAnswers[currentQuestion.id] === index + 1
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border hover:bg-muted/40 hover:border-primary/50",
                    )}
                    onClick={() => onAnswerSelect(index + 1)}
                  >
                    <RadioGroupItem
                      value={(index + 1).toString()}
                      id={`option-${index}`}
                      className="border-primary text-primary mt-1 h-5 w-5 transition-transform group-hover:scale-110"
                    />
                    <Label
                      htmlFor={`option-${index}`}
                      className="text-foreground flex-1 cursor-pointer text-base leading-relaxed font-normal"
                    >
                      <MathJax>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: parsedOptionsHTML[index] || "",
                          }}
                        />
                      </MathJax>
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {/* In-content Navigation */}
              <div className="border-border mt-8 flex items-center justify-between border-t pt-6">
                <Button
                  variant="secondary"
                  onClick={onMarkForReview}
                  className="bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/40 dark:text-purple-300"
                >
                  Mark for Review
                </Button>

                <Button
                  onClick={() => {
                    if (currentQuestionIndex < questions.length - 1) {
                      onNavigate(currentQuestionIndex + 1);
                    } else {
                      onSubmit();
                    }
                  }}
                  className="bg-primary hover:bg-primary/90 min-w-[120px]"
                >
                  {currentQuestionIndex < questions.length - 1
                    ? "Save & Next"
                    : "Submit"}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </ScrollArea>

          {/* Footer Actions */}
          <div className="border-border bg-card/95 supports-[backdrop-filter]:bg-card/75 z-10 flex-shrink-0 border-t p-4 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
              <div className="flex gap-2">
                <Button
                  onClick={onMarkForReview}
                  className="bg-purple-600 text-white hover:bg-purple-700"
                >
                  Mark for Review & Next
                </Button>
                <Button
                  variant="outline"
                  onClick={onClearResponse}
                  className="border-red-200 text-red-700 hover:border-red-300 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  Clear Response
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    if (currentQuestionIndex < questions.length - 1) {
                      onNavigate(currentQuestionIndex + 1);
                    } else {
                      onSubmit();
                    }
                  }}
                  className="min-w-[140px] bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save & Next
                </Button>

                <Button
                  onClick={onSubmit}
                  className="min-w-[100px] bg-green-600 text-white hover:bg-green-700"
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Question Palette (Desktop) */}
        <div className="border-l-border bg-card hidden w-80 flex-col border-l lg:flex">
          {/* User Info */}
          <div className="bg-muted/10 border-border border-b p-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full font-bold">
                {userName?.charAt(0) || "P"}
              </div>
              <div className="overflow-hidden">
                <h3 className="truncate text-sm font-bold">
                  {userName || "Prashant Patil"}
                </h3>
                <p
                  className="text-muted-foreground truncate text-xs"
                  title={userEmail || ""}
                >
                  {userEmail || "patilanilprashant178@gmail.com"}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Stats Legend */}
          <div className="border-border bg-card space-y-3 border-b p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500 text-sm font-bold text-white shadow-sm">
                  {stats.answered}
                </div>
                <span className="text-xs font-medium">Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500 text-sm font-bold text-white shadow-sm">
                  {stats.notAnswered}
                </div>
                <span className="text-xs font-medium">Not Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-card border-border text-foreground flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-bold shadow-sm">
                  {stats.notVisited}
                </div>
                <span className="text-xs font-medium">Not Visited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500 text-sm font-bold text-white shadow-sm">
                  {stats.marked}
                </div>
                <span className="text-xs font-medium">Marked for Review</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500 text-sm font-bold text-white shadow-sm">
                {stats.markedAnswered}
                <div className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
              </div>
              <span className="text-xs font-medium">
                Ans & Marked for Review
              </span>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, index) => {
                if (q.subject !== activeSubject) return null;
                const status = getQuestionStatus(q.id);
                return (
                  <button
                    key={q.id}
                    onClick={() => onNavigate(index)}
                    className={cn(
                      "relative flex h-9 w-9 items-center justify-center rounded-lg border text-xs font-medium transition-all hover:scale-105",
                      status === "answered" &&
                        "border-green-600 bg-green-500 text-white shadow-sm",
                      status === "not-answered" &&
                        "border-red-600 bg-red-500 text-white shadow-sm",
                      status === "marked" &&
                        "border-purple-600 bg-purple-500 text-white shadow-sm",
                      status === "answered-marked" &&
                        "border-purple-600 bg-purple-500 text-white shadow-sm ring-2 ring-green-400 ring-offset-1",
                      status === "not-visited" &&
                        "bg-card border-border text-muted-foreground hover:bg-accent hover:text-foreground",
                      status === "not-visited" &&
                        currentQuestionIndex === index &&
                        "border-primary text-primary bg-primary/5",
                      currentQuestionIndex === index &&
                        status !== "not-visited" &&
                        "ring-primary ring-2 ring-offset-2",
                    )}
                  >
                    {index + 1}
                    {status === "answered-marked" && (
                      <div className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full border border-white bg-green-500 shadow-sm"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </ScrollArea>

          {/* Submit Button */}
          <div className="border-border bg-card border-t p-4">
            <Button
              onClick={onSubmit}
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
            >
              Submit Test
            </Button>
          </div>
        </div>
      </div>
    );
  },
);
TestInterface.displayName = "TestInterface";

export default function TestPage() {
  const params = useParams();
  const testId = params.testId as string;
  const { data: session } = useSession();
  const router = useRouter();

  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [status, setStatus] = useState<
    "STARTING" | "IN_PROGRESS" | "SUBMITTED"
  >("STARTING");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, number>
  >({});
  const [markedForReview, setMarkedForReview] = useState<
    Record<string, boolean>
  >({});
  const [visited, setVisited] = useState<Record<string, boolean>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(90 * 60); // 90 minutes in seconds
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeSubject, setActiveSubject] = useState("Physics");
  const [hasError, setHasError] = useState(false);

  const utils = api.useUtils();
  const startMutation = api.exam.tests.start.useMutation();
  const responseMutation = api.exam.tests.submitResponse.useMutation();
  const submitMutation = api.exam.tests.submitSection.useMutation();

  // Sync State Helper
  const syncState = useCallback(
    (data: any) => {
      const mappedQuestions = data.questions.map((q: any) => ({
        id: q.id,
        subject: q.subject || "General",
        question: q.text,
        options: q.options
          .sort((a: any, b: any) => a.order - b.order)
          .map((o: any) => o.text),
      }));

      setQuestions(mappedQuestions);
      // Remove * 60 since backend returns seconds
      // @ts-ignore
      setTimeRemaining(Math.max(0, Math.floor(data.timeLeft)));

      if (data.responses) {
        setSelectedAnswers(data.responses);
      }
      setStatus(data.status);

      if (mappedQuestions.length > 0 && !activeSubject) {
        setActiveSubject(mappedQuestions[0].subject);
      }
    },
    [activeSubject],
  );

  // 1. Initialize Test
  useEffect(() => {
    if (!session?.user?.id || !testId) return;

    // Validate UUID format
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(testId)) {
      toast.error("Invalid Test ID");
      setHasError(true);
      setIsLoading(false);
      return;
    }

    const initTest = async () => {
      try {
        setIsLoading(true);
        const savedAttemptId = localStorage.getItem(
          `attempt_${testId}_${session.user.id}`,
        );

        if (savedAttemptId) {
          try {
            const data = await utils.exam.tests.getState.fetch({
              attemptId: savedAttemptId,
            });
            // @ts-ignore
            if (data.success && data.data.status !== "ABANDONED") {
              setAttemptId(savedAttemptId);
              // @ts-ignore
              syncState(data.data);
              setIsLoading(false);
              return;
            }
          } catch (e) {
            localStorage.removeItem(`attempt_${testId}_${session.user.id}`);
          }
        }

        const startData = await startMutation.mutateAsync({
          testId,
          userId: session.user.id,
        });

        // @ts-ignore
        if (startData.success) {
          // @ts-ignore
          const newAttemptId = startData.data.attemptId;
          setAttemptId(newAttemptId);
          localStorage.setItem(
            `attempt_${testId}_${session.user.id}`,
            newAttemptId,
          );

          const stateData = await utils.exam.tests.getState.fetch({
            attemptId: newAttemptId,
          });
          // @ts-ignore
          if (stateData.success) syncState(stateData.data);
        } else {
          // @ts-ignore
          toast.error("Failed to start: " + startData.message);
        }
      } catch (error) {
        console.error("Init Error:", error);
        toast.error("Error connecting to test engine");
      } finally {
        setIsLoading(false);
      }
    };

    initTest();
  }, [testId, session?.user?.id, syncState]);

  // 2. Poll State
  const { data: pollData } = api.exam.tests.getState.useQuery(
    { attemptId: attemptId! },
    {
      enabled: !!attemptId && status === "IN_PROGRESS",
      refetchInterval: 30000,
    },
  );

  useEffect(() => {
    // @ts-ignore
    if (pollData?.success) {
      // @ts-ignore
      setTimeRemaining(Math.max(0, Math.floor(pollData.data.timeLeft)));
      // @ts-ignore
      if (pollData.data.status === "SUBMITTED") {
        setStatus("SUBMITTED");
        localStorage.removeItem(`attempt_${testId}_${session?.user?.id}`);
      }
    }
  }, [pollData, session?.user?.id]);

  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const testContainerRef = useRef<HTMLDivElement>(null);
  const questionContentRef = useRef<HTMLDivElement>(null);

  // Initialize visited for first question
  useEffect(() => {
    const currentQ = questions[currentQuestionIndex];
    if (currentQ) {
      setVisited((prev) => ({
        ...prev,
        [currentQ.id]: true,
      }));
    }
  }, [currentQuestionIndex, questions]);

  // Timer effect
  useEffect(() => {
    if (status === "IN_PROGRESS" && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining <= 0 && status === "IN_PROGRESS") {
      handleSubmit();
    }
  }, [timeRemaining, status]);

  // Fullscreen API
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      if (testContainerRef.current) {
        testContainerRef.current.requestFullscreen().catch((err) => {
          console.error("Error attempting to enable fullscreen:", err);
        });
      }
    } else {
      document.exitFullscreen();
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  // Memoize parsed question HTML to prevent re-parsing on every render
  const parsedQuestionHTML = useMemo(() => {
    return currentQuestion ? parseQuestionHTML(currentQuestion.question) : "";
  }, [currentQuestion?.question]);

  // Memoize parsed options HTML
  const parsedOptionsHTML = useMemo(() => {
    return currentQuestion
      ? currentQuestion.options.map(parseQuestionHTML)
      : [];
  }, [currentQuestion?.options]);

  // Get unique subjects from questions
  const availableSubjects = useMemo(
    () => Array.from(new Set(questions.map((q) => q.subject))).filter(Boolean),
    [questions],
  );

  // Update active subject based on current question
  useEffect(() => {
    if (currentQuestion) {
      setActiveSubject(currentQuestion.subject);
    }
  }, [currentQuestionIndex, questions]);

  const handleAnswerSelectCallback = useCallback(
    async (answerIndex: number) => {
      if (!currentQuestion || !attemptId) return;
      setSelectedAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: answerIndex,
      }));
      try {
        await responseMutation.mutateAsync({
          attemptId,
          questionId: currentQuestion.id,
          optionOrder: answerIndex,
        });
      } catch (e) {
        // @ts-ignore
        toast.error("Failed to save answer");
      }
    },
    [currentQuestion, attemptId, responseMutation],
  );

  const handleNavigate = useCallback((index: number) => {
    setCurrentQuestionIndex(index);
    // setIsPaletteOpen(false);
  }, []);

  const handleSubjectChange = useCallback(
    (subject: string) => {
      const firstQuestionIndex = questions.findIndex(
        (q) => q.subject === subject,
      );
      if (firstQuestionIndex !== -1) {
        setCurrentQuestionIndex(firstQuestionIndex);
        setActiveSubject(subject);
      }
    },
    [questions],
  );

  const handleMarkForReview = useCallback(() => {
    if (!currentQuestion) return;
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQuestion.id]: true,
    }));
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }, [currentQuestion, currentQuestionIndex, questions.length]);

  const handleClearResponse = useCallback(() => {
    if (!currentQuestion) return;
    setSelectedAnswers((prev) => {
      const newAnswers = { ...prev };
      delete newAnswers[currentQuestion.id];
      return newAnswers;
    });

    setMarkedForReview((prev) => {
      const newMarked = { ...prev };
      delete newMarked[currentQuestion.id];
      return newMarked;
    });
  }, [currentQuestion]);

  const handleSubmit = useCallback(async () => {
    if (!attemptId) return;
    setIsSubmitting(true);
    try {
      const res = await submitMutation.mutateAsync({ attemptId });
      // @ts-ignore
      if (res.success || res.ok) {
        setStatus("SUBMITTED");
        localStorage.removeItem(`attempt_${testId}_${session?.user?.id}`);
        // @ts-ignore
        toast.success("Test Submitted Successfully");
      }
    } catch (e) {
      // @ts-ignore
      toast.error("Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  }, [attemptId, submitMutation, testId, session?.user?.id]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getQuestionStatus = (questionId: string | number) => {
    const isAnswered = selectedAnswers[questionId] !== undefined;
    const isMarked = markedForReview[questionId];
    const isVisited = visited[questionId];

    if (isAnswered && isMarked) return "answered-marked";
    if (isAnswered) return "answered";
    if (isMarked) return "marked";
    if (isVisited && !isAnswered) return "not-answered";
    return "not-visited";
  };

  if (hasError) {
    return (
      <div className="bg-background flex h-screen flex-col items-center justify-center gap-4">
        <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
          <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold">Unable to Load Test</h2>
          <p className="text-muted-foreground mt-1">
            The test ID provided is invalid or the test could not be found.
          </p>
        </div>
        <Button onClick={() => router.push("/dashboard/student/practice")}>
          Return to Practice
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  // Submitted View
  if (status === "SUBMITTED") {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md border-2 shadow-lg">
          <CardContent className="pt-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="mb-2 text-2xl font-bold">Test Submitted!</h1>
            <p className="text-muted-foreground mb-6">
              Your responses have been recorded successfully. You can view
              detailed analytics once the results are published.
            </p>
            <Link href="/dashboard/overview">
              <Button className="w-full">Return to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Reusable Palette Component
  const PaletteContent = () => (
    <div className="flex h-full flex-col">
      {/* User Profile */}
      <div className="border-border bg-primary/5 flex items-center gap-3 border-b p-4">
        <div className="bg-primary/20 text-primary flex h-12 w-12 items-center justify-center rounded-full">
          <User className="h-6 w-6" />
        </div>
        <div>
          <div className="text-foreground font-bold">
            {session?.user?.name || "Candidate"}
          </div>
          <div className="text-muted-foreground text-xs">
            {session?.user?.email || "Not logged in"}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="border-border text-muted-foreground grid grid-cols-2 gap-2 border-b p-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-green-500 text-center leading-6 text-white">
            {Object.keys(selectedAnswers).length}
          </div>
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-red-500 text-center leading-6 text-white">
            {Object.keys(visited).filter((id) => !selectedAnswers[id]).length}
          </div>
          <span>Not Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="border-border bg-card text-muted-foreground h-6 w-6 rounded-full border text-center leading-6">
            {questions.length - Object.keys(visited).length}
          </div>
          <span>Not Visited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-purple-600 text-center leading-6 text-white">
            {
              Object.keys(markedForReview).filter((id) => !selectedAnswers[id])
                .length
            }
          </div>
          <span>Marked for Review</span>
        </div>
        <div className="col-span-2 flex items-center gap-2">
          <div className="relative h-6 w-6 rounded-full bg-purple-600 text-center leading-6 text-white">
            <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
            {
              Object.keys(markedForReview).filter((id) => selectedAnswers[id])
                .length
            }
          </div>
          <span>Ans & Marked for Review</span>
        </div>
      </div>

      {/* Palette Grid */}
      <div className="bg-muted/20 flex-1 overflow-hidden">
        <div className="bg-primary text-primary-foreground px-4 py-2 text-sm font-bold">
          {activeSubject} Section
        </div>
        <ScrollArea className="h-full p-4">
          <div className="grid grid-cols-4 gap-3">
            {questions.map((q, index) => {
              if (q.subject !== activeSubject) return null;
              const status = getQuestionStatus(q.id);
              return (
                <button
                  key={q.id}
                  onClick={() => handleNavigate(index)}
                  className={cn(
                    "relative flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium shadow-sm transition-all hover:scale-105",
                    status === "answered" && "bg-green-500 text-white",
                    status === "not-answered" && "bg-red-500 text-white",
                    status === "marked" && "bg-purple-600 text-white",
                    status === "answered-marked" && "bg-purple-600 text-white",
                    status === "not-visited" &&
                      "bg-card border-border text-foreground hover:bg-accent border",
                    currentQuestionIndex === index &&
                      "ring-primary ring-2 ring-offset-2",
                  )}
                >
                  {index + 1}
                  {status === "answered-marked" && (
                    <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
                  )}
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Submit Button */}
      <div className="border-border bg-card border-t p-4">
        <Button
          onClick={handleSubmit}
          className="bg-primary hover:bg-primary/90 text-primary-foreground w-full"
        >
          Submit Test
        </Button>
      </div>
    </div>
  );

  // CET Exam Interface
  return (
    <MathJaxContext config={mathJaxConfig}>
      <div
        ref={testContainerRef}
        className="bg-background flex h-screen flex-col overflow-hidden font-sans"
      >
        {/* Header - Always visible now */}
        <header className="bg-primary text-primary-foreground flex h-14 items-center justify-between px-4 shadow-md">
          <div className="flex items-center gap-4">
            <Sheet open={isPaletteOpen} onOpenChange={setIsPaletteOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground hover:bg-primary-foreground/20 lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-80 p-0"
                container={testContainerRef.current}
              >
                <SheetHeader className="sr-only">
                  <SheetTitle>Question Palette</SheetTitle>
                </SheetHeader>
                <PaletteContent />
              </SheetContent>
            </Sheet>
            <h1 className="text-lg font-bold">MHT-CET Exam</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-primary-foreground/10 flex items-center gap-2 rounded px-3 py-1">
              <span className="text-xs font-medium uppercase opacity-80">
                Time Left:
              </span>
              <span className="font-mono text-lg font-bold">
                {formatTime(timeRemaining)}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullScreen}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              {isFullScreen ? (
                <Minimize className="h-5 w-5" />
              ) : (
                <Maximize className="h-5 w-5" />
              )}
            </Button>
          </div>
        </header>

        <TestInterface
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          selectedAnswers={selectedAnswers}
          markedForReview={markedForReview}
          visited={visited}
          activeSubject={activeSubject}
          availableSubjects={availableSubjects}
          isPaletteOpen={isPaletteOpen}
          status={status}
          onAnswerSelect={handleAnswerSelectCallback}
          onNavigate={handleNavigate}
          onSubjectChange={handleSubjectChange}
          onPaletteToggle={setIsPaletteOpen}
          onSubmit={handleSubmit}
          questionContentRef={questionContentRef}
          parsedQuestionHTML={parsedQuestionHTML}
          parsedOptionsHTML={parsedOptionsHTML}
          onMarkForReview={handleMarkForReview}
          onClearResponse={handleClearResponse}
          userName={session?.user?.name}
          userEmail={session?.user?.email}
        />
      </div>
    </MathJaxContext>
  );
}
