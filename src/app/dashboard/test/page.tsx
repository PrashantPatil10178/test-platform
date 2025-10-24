"use client";
import { useState, useEffect } from "react";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(90 * 60); // 90 minutes in seconds
  const [showHint, setShowHint] = useState<Record<number, boolean>>({});
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

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
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const currentQuestion = mhtCetQuestions[currentQuestionIndex];
  const physicsQuestions = mhtCetQuestions.filter(
    (q) => q.subject === "Physics",
  );
  const chemistryQuestions = mhtCetQuestions.filter(
    (q) => q.subject === "Chemistry",
  );
  const mathematicsQuestions = mhtCetQuestions.filter(
    (q) => q.subject === "Mathematics",
  );

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const toggleMarkForReview = (questionId: number) => {
    setMarkedForReview((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const toggleShowHint = (questionId: number) => {
    setShowHint((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setIsPaletteOpen(false);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < mhtCetQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
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
    if (selectedAnswers[questionId] !== undefined) {
      return markedForReview[questionId] ? "answered-marked" : "answered";
    } else if (markedForReview[questionId]) {
      return "marked";
    } else {
      return "not-visited";
    }
  };

  const { correct, total } = calculateScore();
  const percentage = Math.round((correct / total) * 100);

  if (!currentQuestion) {
    return null;
  }

  // Results View
  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold md:text-3xl">Test Results</h1>
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
              <div className="mb-4 text-xl font-medium">
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
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Correct
                  </div>
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
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Incorrect
                  </div>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
                  <div className="text-3xl font-bold text-gray-600 dark:text-gray-300">
                    {
                      mhtCetQuestions.filter(
                        (q) => selectedAnswers[q.id] === undefined,
                      ).length
                    }
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Unanswered
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Answer Review */}
          <Card>
            <CardHeader>
              <CardTitle>Answer Review</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {mhtCetQuestions.map((question) => (
                    <Card key={question.id} className="border">
                      <CardContent className="pt-4">
                        <div className="mb-3 flex items-start gap-3">
                          <Badge variant="outline" className="mt-1 shrink-0">
                            {question.subject}
                          </Badge>
                          <div className="flex-1">
                            <div className="mb-2 flex items-start gap-2">
                              <span className="font-semibold">
                                Q{question.id}.
                              </span>
                              <span className="flex-1">
                                {question.question}
                              </span>
                              {selectedAnswers[question.id] ===
                              question.correctAnswer ? (
                                <CheckCircle className="h-5 w-5 shrink-0 text-green-600" />
                              ) : (
                                <XCircle className="h-5 w-5 shrink-0 text-red-600" />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="ml-6 space-y-2">
                          {question.options.map((option, index) => (
                            <div
                              key={index}
                              className={cn(
                                "rounded-lg border p-3 text-sm transition-colors",
                                index === question.correctAnswer &&
                                  "border-green-500 bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-100",
                                selectedAnswers[question.id] === index &&
                                  index !== question.correctAnswer &&
                                  "border-red-500 bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-100",
                              )}
                            >
                              <div className="flex items-center justify-between">
                                <span>{option}</span>
                                {index === question.correctAnswer && (
                                  <Badge
                                    variant="default"
                                    className="ml-2 bg-green-600"
                                  >
                                    Correct
                                  </Badge>
                                )}
                                {selectedAnswers[question.id] === index &&
                                  index !== question.correctAnswer && (
                                    <Badge
                                      variant="destructive"
                                      className="ml-2"
                                    >
                                      Your Answer
                                    </Badge>
                                  )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              onClick={() => {
                setSelectedAnswers({});
                setMarkedForReview({});
                setShowHint({});
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

  // Test View
  return (
    <div className="bg-background flex h-screen flex-col overflow-hidden">
      {/* Top Header Bar */}
      <div className="bg-card border-b shadow-sm">
        <div className="flex items-center justify-between px-3 py-3 sm:px-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Sheet open={isPaletteOpen} onOpenChange={setIsPaletteOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle>Question Palette</SheetTitle>
                </SheetHeader>
                <ScrollArea className="mt-4 h-[calc(100vh-8rem)]">
                  <QuestionPalette
                    physicsQuestions={physicsQuestions}
                    chemistryQuestions={chemistryQuestions}
                    mathematicsQuestions={mathematicsQuestions}
                    currentQuestionIndex={currentQuestionIndex}
                    getQuestionStatus={getQuestionStatus}
                    goToQuestion={goToQuestion}
                  />
                </ScrollArea>
              </SheetContent>
            </Sheet>

            <div>
              <h1 className="text-sm font-bold sm:text-base md:text-lg">
                MHT CET Practice
              </h1>
              <p className="text-muted-foreground text-xs">
                Q {currentQuestionIndex + 1}/{mhtCetQuestions.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Timer */}
            <div
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors sm:gap-2 sm:px-3 sm:py-2 sm:text-sm",
                timeRemaining < 300
                  ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  : timeRemaining < 600
                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
              )}
            >
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="font-mono">{formatTime(timeRemaining)}</span>
            </div>

            {/* Full Screen Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullScreen}
              className="hidden h-8 w-8 p-0 sm:flex"
            >
              {isFullScreen ? (
                <Minimize className="h-4 w-4" />
              ) : (
                <Maximize className="h-4 w-4" />
              )}
            </Button>

            {/* Exit Test */}
            <Link href="/dashboard/overview">
              <Button variant="ghost" size="sm" className="h-8 px-2 sm:px-3">
                <X className="h-4 w-4 sm:mr-1.5" />
                <span className="hidden sm:inline">Exit</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Progress Bar */}
        <Progress
          value={(Object.keys(selectedAnswers).length / total) * 100}
          className="h-1 rounded-none"
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Question Palette Sidebar */}
        <div className="bg-card hidden w-72 border-r lg:block xl:w-80">
          <ScrollArea className="h-full p-4">
            <QuestionPalette
              physicsQuestions={physicsQuestions}
              chemistryQuestions={chemistryQuestions}
              mathematicsQuestions={mathematicsQuestions}
              currentQuestionIndex={currentQuestionIndex}
              getQuestionStatus={getQuestionStatus}
              goToQuestion={goToQuestion}
            />

            {/* Submit Button - Desktop */}
            <Button
              onClick={handleSubmit}
              className="mt-6 w-full"
              size="lg"
              variant="destructive"
            >
              Submit Test
            </Button>
          </ScrollArea>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <ScrollArea className="flex-1">
            <div className="container mx-auto max-w-3xl p-3 sm:p-4 md:p-6">
              {/* Question Card */}
              <Card className="shadow-lg">
                <CardHeader className="space-y-3 pb-4 sm:space-y-4 sm:pb-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
                    <Badge variant="secondary" className="text-xs sm:text-sm">
                      {currentQuestion.subject}
                    </Badge>
                    <Button
                      variant={
                        markedForReview[currentQuestion.id]
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => toggleMarkForReview(currentQuestion.id)}
                      className="gap-1.5 text-xs sm:gap-2 sm:text-sm"
                    >
                      <Bookmark
                        className={cn(
                          "h-3 w-3 sm:h-4 sm:w-4",
                          markedForReview[currentQuestion.id] && "fill-current",
                        )}
                      />
                      <span className="hidden sm:inline">
                        {markedForReview[currentQuestion.id]
                          ? "Marked"
                          : "Mark Review"}
                      </span>
                      <span className="sm:hidden">Mark</span>
                    </Button>
                  </div>
                  <CardTitle className="text-base leading-relaxed sm:text-lg md:text-xl">
                    {currentQuestion.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  {/* Options */}
                  <RadioGroup
                    value={selectedAnswers[currentQuestion.id]?.toString()}
                    onValueChange={(value) =>
                      handleAnswerSelect(currentQuestion.id, parseInt(value))
                    }
                    className="space-y-2.5 sm:space-y-3"
                  >
                    {currentQuestion.options.map((option, index) => (
                      <div
                        key={index}
                        className={cn(
                          "group relative flex items-start space-x-2.5 rounded-xl border-2 p-3 transition-all duration-200 sm:space-x-3 sm:p-4",
                          "hover:border-primary/50 hover:bg-primary/5 hover:shadow-md active:scale-[0.98]",
                          selectedAnswers[currentQuestion.id] === index &&
                            "border-primary bg-primary/10 shadow-md",
                        )}
                      >
                        <RadioGroupItem
                          value={index.toString()}
                          id={`option-${currentQuestion.id}-${index}`}
                          className="mt-0.5 h-5 w-5 sm:h-4 sm:w-4"
                        />
                        <Label
                          htmlFor={`option-${currentQuestion.id}-${index}`}
                          className="flex-1 cursor-pointer text-sm leading-relaxed sm:text-base"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  {/* AI Hint Section */}
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      onClick={() => toggleShowHint(currentQuestion.id)}
                      className="w-full gap-2 text-sm sm:text-base"
                    >
                      <Bot className="h-4 w-4" />
                      {showHint[currentQuestion.id]
                        ? "Hide AI Hint"
                        : "Show AI Hint"}
                    </Button>

                    {showHint[currentQuestion.id] && (
                      <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20">
                        <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <AlertDescription className="text-xs leading-relaxed text-blue-900 sm:text-sm dark:text-blue-100">
                          {currentQuestion.hint}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  {/* Navigation Buttons inside Question Card - Mobile Optimized */}
                  <div className="space-y-3 border-t pt-4">
                    {/* Question Counter */}
                    <div className="text-center">
                      <span className="text-muted-foreground text-sm font-medium sm:text-base">
                        Question {currentQuestionIndex + 1} of{" "}
                        {mhtCetQuestions.length}
                      </span>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <Button
                        variant="outline"
                        onClick={goToPreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                        className="h-11 gap-1.5 sm:h-10 sm:gap-2"
                        size="default"
                      >
                        <ChevronLeft className="h-4 w-4 shrink-0" />
                        <span className="truncate">Previous</span>
                      </Button>

                      <Button
                        variant="outline"
                        onClick={goToNextQuestion}
                        disabled={
                          currentQuestionIndex === mhtCetQuestions.length - 1
                        }
                        className="h-11 gap-1.5 sm:h-10 sm:gap-2"
                        size="default"
                      >
                        <span className="truncate">Next</span>
                        <ChevronRight className="h-4 w-4 shrink-0" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>

          {/* Bottom Navigation Bar */}
          <div className="bg-card border-t p-3 shadow-lg sm:p-4">
            <div className="container mx-auto flex max-w-3xl items-center justify-between gap-2 sm:gap-4">
              <Button
                variant="outline"
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="gap-1.5 text-xs sm:gap-2 sm:text-sm"
                size="sm"
              >
                <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-xs font-medium sm:text-sm">
                  {currentQuestionIndex + 1} / {mhtCetQuestions.length}
                </span>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={goToNextQuestion}
                  disabled={currentQuestionIndex === mhtCetQuestions.length - 1}
                  className="gap-1.5 text-xs sm:gap-2 sm:text-sm"
                  size="sm"
                >
                  <span className="hidden sm:inline">Next</span>
                  <span className="sm:hidden">Next</span>
                  <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>

                {/* Submit Button - Mobile */}
                <Button
                  onClick={handleSubmit}
                  variant="destructive"
                  className="text-xs sm:text-sm lg:hidden"
                  size="sm"
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Question Palette Component
function QuestionPalette({
  physicsQuestions,
  chemistryQuestions,
  mathematicsQuestions,
  currentQuestionIndex,
  getQuestionStatus,
  goToQuestion,
}: {
  physicsQuestions: Question[];
  chemistryQuestions: Question[];
  mathematicsQuestions: Question[];
  currentQuestionIndex: number;
  getQuestionStatus: (id: number) => string;
  goToQuestion: (index: number) => void;
}) {
  return (
    <div className="space-y-5">
      {/* Legend */}
      <div className="bg-muted/50 rounded-lg p-3">
        <h3 className="mb-3 text-xs font-semibold sm:text-sm">Status Legend</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 shrink-0 rounded bg-green-500"></div>
            <span>Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 shrink-0 rounded bg-red-500"></div>
            <span>Marked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 shrink-0 rounded bg-gray-300 dark:bg-gray-600"></div>
            <span>Not Done</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 shrink-0 rounded bg-blue-500"></div>
            <span>Current</span>
          </div>
        </div>
      </div>

      {/* Physics */}
      <div>
        <h3 className="mb-3 text-xs font-semibold text-blue-600 sm:text-sm dark:text-blue-400">
          Physics ({physicsQuestions.length})
        </h3>
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {physicsQuestions.map((question) => (
            <button
              key={question.id}
              onClick={() => goToQuestion(question.id - 1)}
              className={cn(
                "flex h-9 w-full items-center justify-center rounded-lg text-xs font-medium transition-all hover:scale-105 active:scale-95 sm:h-10 sm:text-sm",
                currentQuestionIndex === question.id - 1
                  ? "bg-blue-500 text-white shadow-lg ring-2 ring-blue-400"
                  : getQuestionStatus(question.id) === "answered"
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : getQuestionStatus(question.id) === "answered-marked"
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : getQuestionStatus(question.id) === "marked"
                        ? "bg-purple-500 text-white hover:bg-purple-600"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300",
              )}
            >
              {question.id}
            </button>
          ))}
        </div>
      </div>

      {/* Chemistry */}
      <div>
        <h3 className="mb-3 text-xs font-semibold text-green-600 sm:text-sm dark:text-green-400">
          Chemistry ({chemistryQuestions.length})
        </h3>
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {chemistryQuestions.map((question) => (
            <button
              key={question.id}
              onClick={() => goToQuestion(question.id - 1)}
              className={cn(
                "flex h-9 w-full items-center justify-center rounded-lg text-xs font-medium transition-all hover:scale-105 active:scale-95 sm:h-10 sm:text-sm",
                currentQuestionIndex === question.id - 1
                  ? "bg-blue-500 text-white shadow-lg ring-2 ring-blue-400"
                  : getQuestionStatus(question.id) === "answered"
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : getQuestionStatus(question.id) === "answered-marked"
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : getQuestionStatus(question.id) === "marked"
                        ? "bg-purple-500 text-white hover:bg-purple-600"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300",
              )}
            >
              {question.id}
            </button>
          ))}
        </div>
      </div>

      {/* Mathematics */}
      <div>
        <h3 className="mb-3 text-xs font-semibold text-purple-600 sm:text-sm dark:text-purple-400">
          Mathematics ({mathematicsQuestions.length})
        </h3>
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {mathematicsQuestions.map((question) => (
            <button
              key={question.id}
              onClick={() => goToQuestion(question.id - 1)}
              className={cn(
                "flex h-9 w-full items-center justify-center rounded-lg text-xs font-medium transition-all hover:scale-105 active:scale-95 sm:h-10 sm:text-sm",
                currentQuestionIndex === question.id - 1
                  ? "bg-blue-500 text-white shadow-lg ring-2 ring-blue-400"
                  : getQuestionStatus(question.id) === "answered"
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : getQuestionStatus(question.id) === "answered-marked"
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : getQuestionStatus(question.id) === "marked"
                        ? "bg-purple-500 text-white hover:bg-purple-600"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300",
              )}
            >
              {question.id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
