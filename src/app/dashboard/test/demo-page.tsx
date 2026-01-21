"use client";
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
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

interface Question {
  id: number;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
}

const mhtCetQuestions: Question[] = [
  // Physics Questions
  {
    id: 1,
    subject: "Physics",
    question:
      "A particle moves in a circular path with a constant speed. Which of the following statements is true?",
    options: [
      "Its velocity is constant",
      "Its acceleration is zero",
      "Its acceleration is directed towards the center",
      "Its acceleration is directed away from the center",
    ],
    correctAnswer: 2,
    hint: "In uniform circular motion, the speed is constant but velocity changes direction. The acceleration (centripetal) always points toward the center of the circular path.",
  },
  {
    id: 2,
    subject: "Physics",
    question: "The SI unit of magnetic flux is:",
    options: ["Weber", "Tesla", "Gauss", "Ampere"],
    correctAnswer: 0,
    hint: "Magnetic flux (Φ) is measured in Weber (Wb). Remember: 1 Weber = 1 Tesla·meter². Tesla is the unit of magnetic field strength (B), not flux.",
  },
  {
    id: 3,
    subject: "Physics",
    question: "Which phenomenon demonstrates the wave nature of electrons?",
    options: [
      "Photoelectric effect",
      "Compton effect",
      "Electron diffraction",
      "Cathode ray emission",
    ],
    correctAnswer: 2,
    hint: "The wave-particle duality of electrons was confirmed by electron diffraction experiments (Davisson-Germer experiment). This showed electrons exhibiting wave-like properties.",
  },
  {
    id: 4,
    subject: "Physics",
    question:
      "The work done by a force is maximum when the angle between force and displacement is:",
    options: ["0°", "45°", "90°", "180°"],
    correctAnswer: 0,
    hint: "Work (W) = F·d·cos(θ). The value of cos(θ) is maximum (1) when θ = 0°, meaning the force is in the same direction as displacement.",
  },
  {
    id: 5,
    subject: "Physics",
    question: "The focal length of a convex lens is 20 cm. Its power is:",
    options: ["+0.2 D", "+5 D", "+0.05 D", "+20 D"],
    correctAnswer: 1,
    hint: "Power of a lens (P) = 1/f (in meters). Here f = 20 cm = 0.2 m, so P = 1/0.2 = 5 D. The sign is positive for convex (converging) lens.",
  },

  // Chemistry Questions
  {
    id: 6,
    subject: "Chemistry",
    question: "Which of the following has the highest bond order?",
    options: ["N₂", "O₂", "F₂", "Cl₂"],
    correctAnswer: 0,
    hint: "Bond order = (Number of bonding electrons - Number of antibonding electrons)/2. N₂ has 10 bonding and 4 antibonding electrons, giving a bond order of 3.",
  },
  {
    id: 7,
    subject: "Chemistry",
    question: "The element with electronic configuration [Ar] 3d¹⁰ 4s² 4p³ is:",
    options: ["As", "Sb", "Bi", "P"],
    correctAnswer: 0,
    hint: "Count the electrons: [Ar] has 18 electrons, 3d¹⁰ adds 10, 4s² adds 2, and 4p³ adds 3. Total = 33 electrons, which corresponds to Arsenic (As).",
  },
  {
    id: 8,
    subject: "Chemistry",
    question: "Which of the following is a strong electrolyte?",
    options: ["CH₃COOH", "NH₄OH", "NaCl", "C₆H₁₂O₆"],
    correctAnswer: 2,
    hint: "Strong electrolytes completely dissociate in water. NaCl (salt) fully dissociates into Na⁺ and Cl⁻ ions. Weak electrolytes like CH₃COOH and NH₄OH only partially dissociate.",
  },
  {
    id: 9,
    subject: "Chemistry",
    question: "The IUPAC name of CH₃CH₂CH=CHCH₃ is:",
    options: ["Pent-1-ene", "Pent-2-ene", "Pent-3-ene", "Pent-4-ene"],
    correctAnswer: 1,
    hint: "For naming alkenes: 1) Identify the longest carbon chain (5 carbons = pent) 2) Number from the end that gives the double bond the lowest number 3) The double bond is at position 2, so it's Pent-2-ene.",
  },
  {
    id: 10,
    subject: "Chemistry",
    question: "Which of the following is a secondary pollutant?",
    options: ["SO₂", "NO₂", "O₃", "CO"],
    correctAnswer: 2,
    hint: "Secondary pollutants form in the atmosphere through chemical reactions. Ozone (O₃) in the troposphere forms when NOx and VOCs react in sunlight. SO₂, NO₂, and CO are primary pollutants (emitted directly).",
  },

  // Mathematics Questions
  {
    id: 11,
    subject: "Mathematics",
    question: "The value of sin 15° is:",
    options: ["(√3 - 1)/2√2", "(√3 + 1)/2√2", "(√2 - 1)/2", "(√2 + 1)/2"],
    correctAnswer: 0,
    hint: "Use the angle subtraction formula: sin(15°) = sin(45°-30°) = sin45°cos30° - cos45°sin30° = (√2/2)(√3/2) - (√2/2)(1/2) = (√6 - √2)/4 = (√3 - 1)/2√2.",
  },
  {
    id: 12,
    subject: "Mathematics",
    question:
      "The area of the region bounded by the curve y² = 4ax and the line x = a is:",
    options: ["4a²/3", "8a²/3", "16a²/3", "2a²/3"],
    correctAnswer: 1,
    hint: "The curve y² = 4ax is a right-opening parabola. To find the area bounded by x = a, integrate: Area = ∫(from 0 to a) 2√(4ax) dx = 2∫(from 0 to a) 2√(ax) dx = 8a²/3.",
  },
  {
    id: 13,
    subject: "Mathematics",
    question:
      "If A and B are two events such that P(A) = 0.5, P(B) = 0.3 and P(A∩B) = 0.2, then P(A∪B) is:",
    options: ["0.6", "0.7", "0.8", "0.9"],
    correctAnswer: 0,
    hint: "Use the addition formula: P(A∪B) = P(A) + P(B) - P(A∩B) = 0.5 + 0.3 - 0.2 = 0.6.",
  },
  {
    id: 14,
    subject: "Mathematics",
    question: "The value of ∫₀^π x sin x dx is:",
    options: ["π", "π/2", "π/4", "2π"],
    correctAnswer: 0,
    hint: "Use integration by parts: Let u = x, dv = sin x dx. Then du = dx, v = -cos x. ∫x sin x dx = -x cos x + ∫cos x dx = -x cos x + sin x. Evaluate from 0 to π: [-π cos π + sin π] - [0 + sin 0] = π.",
  },
  {
    id: 15,
    subject: "Mathematics",
    question:
      "The equation of the plane passing through the point (1,2,3) and perpendicular to the line with direction ratios 2, -1, 1 is:",
    options: [
      "2x - y + z = 3",
      "2x - y + z = 0",
      "2x - y + z = 5",
      "2x - y + z = 1",
    ],
    correctAnswer: 0,
    hint: "Since the plane is perpendicular to the line with direction ratios 2, -1, 1, these ratios are the normal vector (a,b,c) of the plane. Using point-normal form: a(x-x₀) + b(y-y₀) + c(z-z₀) = 0, we get 2(x-1) - 1(y-2) + 1(z-3) = 0 → 2x - y + z = 3.",
  },
];

export default function MhtCetTestPage() {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [markedForReview, setMarkedForReview] = useState<
    Record<number, boolean>
  >({});
  const [visited, setVisited] = useState<Record<number, boolean>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(90 * 60); // 90 minutes in seconds
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeSubject, setActiveSubject] = useState("Physics");
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const testContainerRef = useRef<HTMLDivElement>(null);

  // Initialize visited for first question
  useEffect(() => {
    const currentQ = mhtCetQuestions[currentQuestionIndex];
    if (currentQ) {
      setVisited((prev) => ({
        ...prev,
        [currentQ.id]: true,
      }));
    }
  }, [currentQuestionIndex]);

  // Timer effect
  useEffect(() => {
    if (!showResults && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !showResults) {
      handleSubmit();
    }
  }, [timeRemaining, showResults]);

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

  const currentQuestion = mhtCetQuestions[currentQuestionIndex];

  // Update active subject based on current question
  useEffect(() => {
    if (currentQuestion) {
      setActiveSubject(currentQuestion.subject);
    }
  }, [currentQuestion]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (!currentQuestion) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answerIndex,
    }));
  };

  const handleSaveAndNext = () => {
    // Mark as visited is already handled by useEffect
    // Move to next question
    if (currentQuestionIndex < mhtCetQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleMarkForReviewAndNext = () => {
    if (!currentQuestion) return;
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQuestion.id]: true,
    }));
    if (currentQuestionIndex < mhtCetQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleClearResponse = () => {
    if (!currentQuestion) return;
    const newAnswers = { ...selectedAnswers };
    delete newAnswers[currentQuestion.id];
    setSelectedAnswers(newAnswers);

    const newMarked = { ...markedForReview };
    delete newMarked[currentQuestion.id];
    setMarkedForReview(newMarked);
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setIsPaletteOpen(false);
  };

  const calculateScore = () => {
    let correct = 0;
    let total = mhtCetQuestions.length;

    mhtCetQuestions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });

    return { correct, total };
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getQuestionStatus = (questionId: number) => {
    const isAnswered = selectedAnswers[questionId] !== undefined;
    const isMarked = markedForReview[questionId];
    const isVisited = visited[questionId];

    if (isAnswered && isMarked) return "answered-marked";
    if (isAnswered) return "answered";
    if (isMarked) return "marked";
    if (isVisited && !isAnswered) return "not-answered";
    return "not-visited";
  };

  const { correct, total } = calculateScore();
  const percentage = Math.round((correct / total) * 100);

  if (!currentQuestion) {
    return null;
  }

  // Results View (Keeping the modern look for results as it's post-exam)
  if (showResults) {
    return (
      <div className="bg-background min-h-screen">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-foreground text-2xl font-bold md:text-3xl">
              Test Results
            </h1>
            <Link href="/dashboard/overview">
              <Button variant="outline" size="sm">
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          </div>

          {/* Score Card */}
          <Card className="mb-6 border-2 shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="text-primary mb-4 text-6xl font-bold">
                {percentage}%
              </div>
              <div className="text-foreground mb-4 text-xl font-medium">
                You scored {correct} out of {total}
              </div>
              <Progress value={percentage} className="mb-6 h-3" />

              <div className="mb-6 grid grid-cols-3 gap-4">
                <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {
                      mhtCetQuestions.filter(
                        (q) => selectedAnswers[q.id] === q.correctAnswer,
                      ).length
                    }
                  </div>
                  <div className="text-muted-foreground text-sm">Correct</div>
                </div>
                <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                    {
                      mhtCetQuestions.filter(
                        (q) =>
                          selectedAnswers[q.id] !== undefined &&
                          selectedAnswers[q.id] !== q.correctAnswer,
                      ).length
                    }
                  </div>
                  <div className="text-muted-foreground text-sm">Incorrect</div>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <div className="text-muted-foreground text-3xl font-bold">
                    {
                      mhtCetQuestions.filter(
                        (q) => selectedAnswers[q.id] === undefined,
                      ).length
                    }
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Unanswered
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              onClick={() => {
                setSelectedAnswers({});
                setMarkedForReview({});
                setVisited({});
                setShowResults(false);
                setCurrentQuestionIndex(0);
                setTimeRemaining(90 * 60);
              }}
              size="lg"
              className="w-full sm:w-auto"
            >
              Retake Test
            </Button>
            <Link href="/dashboard/overview" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
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
          <div className="text-foreground font-bold">Candidate Name</div>
          <div className="text-muted-foreground text-xs">Roll No: 12345678</div>
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
            {
              Object.keys(visited).filter(
                (id) => !selectedAnswers[parseInt(id)],
              ).length
            }
          </div>
          <span>Not Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="border-border bg-card text-muted-foreground h-6 w-6 rounded-full border text-center leading-6">
            {mhtCetQuestions.length - Object.keys(visited).length}
          </div>
          <span>Not Visited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-purple-600 text-center leading-6 text-white">
            {
              Object.keys(markedForReview).filter(
                (id) => !selectedAnswers[parseInt(id)],
              ).length
            }
          </div>
          <span>Marked for Review</span>
        </div>
        <div className="col-span-2 flex items-center gap-2">
          <div className="relative h-6 w-6 rounded-full bg-purple-600 text-center leading-6 text-white">
            <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
            {
              Object.keys(markedForReview).filter(
                (id) => selectedAnswers[parseInt(id)],
              ).length
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
            {mhtCetQuestions
              .filter((q) => q.subject === activeSubject)
              .map((q) => {
                const status = getQuestionStatus(q.id);
                return (
                  <button
                    key={q.id}
                    onClick={() => goToQuestion(q.id - 1)}
                    className={cn(
                      "relative flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium shadow-sm transition-all hover:scale-105",
                      status === "answered" && "bg-green-500 text-white",
                      status === "not-answered" && "bg-red-500 text-white",
                      status === "marked" && "bg-purple-600 text-white",
                      status === "answered-marked" &&
                        "bg-purple-600 text-white",
                      status === "not-visited" &&
                        "bg-card border-border text-foreground hover:bg-accent border",
                      currentQuestionIndex === q.id - 1 &&
                        "ring-primary ring-2 ring-offset-2",
                    )}
                  >
                    {q.id}
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
    <div
      ref={testContainerRef}
      className="bg-background flex h-screen flex-col font-sans text-sm"
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

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side: Question Area */}
        <div className="bg-card flex flex-1 flex-col overflow-hidden">
          {/* Subject Tabs */}
          <div className="border-border bg-muted/30 flex border-b">
            {["Physics", "Chemistry", "Mathematics"].map((subject) => (
              <button
                key={subject}
                onClick={() => {
                  const firstQuestionOfSubject = mhtCetQuestions.find(
                    (q) => q.subject === subject,
                  );
                  if (firstQuestionOfSubject) {
                    setCurrentQuestionIndex(firstQuestionOfSubject.id - 1);
                  }
                }}
                className={cn(
                  "hover:bg-muted px-6 py-3 font-medium transition-colors",
                  activeSubject === subject
                    ? "border-primary bg-card text-primary border-b-2"
                    : "text-muted-foreground",
                )}
              >
                {subject}
              </button>
            ))}
          </div>

          {/* Question Header */}
          <div className="border-border flex items-center justify-between border-b px-6 py-3">
            <h2 className="text-foreground text-lg font-semibold">
              Question No. {currentQuestion.id}
            </h2>
            <div className="text-muted-foreground flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <span className="font-bold text-green-600">+1</span> Correct
              </span>
              <span className="flex items-center gap-1">
                <span className="font-bold text-red-600">0</span> Wrong
              </span>
            </div>
          </div>

          {/* Question Content */}
          <ScrollArea className="flex-1 p-6">
            <div className="mx-auto max-w-4xl">
              <div className="text-foreground mb-6 text-lg leading-relaxed">
                {currentQuestion.question}
              </div>

              <RadioGroup
                value={selectedAnswers[currentQuestion.id]?.toString() ?? ""}
                onValueChange={(value) => handleAnswerSelect(parseInt(value))}
                className="space-y-4"
              >
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    className={cn(
                      "hover:bg-muted/50 flex items-center space-x-3 rounded-lg border p-4 transition-colors",
                      selectedAnswers[currentQuestion.id] === index
                        ? "border-primary bg-primary/10"
                        : "border-border",
                    )}
                  >
                    <RadioGroupItem
                      value={index.toString()}
                      id={`option-${index}`}
                      className="border-primary text-primary h-5 w-5"
                    />
                    <Label
                      htmlFor={`option-${index}`}
                      className="text-foreground flex-1 cursor-pointer text-base font-normal"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </ScrollArea>

          {/* Footer Actions */}
          <div className="border-border bg-muted/30 border-t p-4">
            <div className="mx-auto flex max-w-4xl items-center justify-between">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleMarkForReviewAndNext}
                  className="border-purple-600 text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20"
                >
                  Mark for Review & Next
                </Button>
                <Button
                  variant="outline"
                  onClick={handleClearResponse}
                  className="border-input text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  Clear Response
                </Button>
              </div>

              <Button
                onClick={handleSaveAndNext}
                className="bg-green-600 px-8 text-white hover:bg-green-700"
              >
                Save & Next
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side: Question Palette - Always visible on desktop now */}
        <div className="border-border bg-muted/10 hidden w-80 flex-col border-l lg:flex">
          <PaletteContent />
        </div>
      </div>
    </div>
  );
}
