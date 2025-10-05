"use client";
import { useState, useEffect } from "react";
import PageContainer from "@/components/layout/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Clock,
  CheckCircle,
  XCircle,
  HelpCircle,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Bot,
  Lightbulb,
} from "lucide-react";

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

  if (showResults) {
    return (
      <PageContainer scrollable={true}>
        <div className="container mx-auto max-w-6xl p-4">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-center text-2xl">
                MHT CET Test Results
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-4 text-5xl font-bold">{percentage}%</div>
              <div className="mb-4 text-xl">
                You scored {correct} out of {total}
              </div>
              <Progress value={percentage} className="mb-6 h-4" />

              <div className="mb-6 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {
                      mhtCetQuestions.filter(
                        (q) => selectedAnswers[q.id] === q.correctAnswer,
                      ).length
                    }
                  </div>
                  <div className="text-sm text-gray-600">Correct</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {
                      mhtCetQuestions.filter(
                        (q) =>
                          selectedAnswers[q.id] !== undefined &&
                          selectedAnswers[q.id] !== q.correctAnswer,
                      ).length
                    }
                  </div>
                  <div className="text-sm text-gray-600">Incorrect</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">
                    {
                      mhtCetQuestions.filter(
                        (q) => selectedAnswers[q.id] === undefined,
                      ).length
                    }
                  </div>
                  <div className="text-sm text-gray-600">Unanswered</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="mb-2 text-xl font-semibold">Answer Review</h3>
                {mhtCetQuestions.map((question) => (
                  <Card key={question.id} className="text-left">
                    <CardContent className="pt-4">
                      <div className="mb-2 flex items-start gap-2">
                        <span className="font-medium">Q{question.id}.</span>
                        <span>{question.question}</span>
                        {selectedAnswers[question.id] ===
                        question.correctAnswer ? (
                          <CheckCircle className="mt-0.5 h-5 w-5 text-green-600" />
                        ) : (
                          <XCircle className="mt-0.5 h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div className="ml-6 space-y-1">
                        {question.options.map((option, index) => (
                          <div
                            key={index}
                            className={`rounded py-1 pl-4 ${
                              index === question.correctAnswer
                                ? "bg-green-100 text-green-800"
                                : selectedAnswers[question.id] === index
                                  ? "bg-red-100 text-red-800"
                                  : ""
                            }`}
                          >
                            {option}
                            {index === question.correctAnswer && (
                              <span className="ml-2 text-sm font-medium">
                                (Correct Answer)
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button
                onClick={() => {
                  setSelectedAnswers({});
                  setMarkedForReview({});
                  setShowHint({});
                  setShowResults(false);
                  setCurrentQuestionIndex(0);
                  setTimeRemaining(90 * 60);
                }}
                className="mt-6"
              >
                Retake Test
              </Button>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer scrollable={true}>
      <div className="container mx-auto max-w-7xl p-4">
        {/* Header with timer and progress */}
        <div className="mb-4 rounded-lg bg-slate-800 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">MHT CET Practice Test</h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span className="font-medium">
                  Time Remaining: {formatTime(timeRemaining)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  Answered: {Object.keys(selectedAnswers).length}/{total}
                </span>
              </div>
            </div>
          </div>
          <Progress
            value={(Object.keys(selectedAnswers).length / total) * 100}
            className="mt-2 h-2 bg-slate-700"
          />
        </div>

        <div className="flex gap-4">
          {/* Question palette sidebar */}
          <div className="w-64">
            <Card className="h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Question Palette</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Legend */}
                <div className="flex flex-wrap gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 rounded bg-green-500"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 rounded bg-red-500"></div>
                    <span>Answered & Marked</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 rounded bg-purple-500"></div>
                    <span>Marked</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 rounded bg-gray-300"></div>
                    <span>Not Answered</span>
                  </div>
                </div>

                {/* Physics questions */}
                <div>
                  <h3 className="mb-2 font-medium">Physics</h3>
                  <div className="grid grid-cols-5 gap-1">
                    {physicsQuestions.map((question) => (
                      <button
                        key={question.id}
                        onClick={() => goToQuestion(question.id - 1)}
                        className={`h-8 w-8 rounded text-xs font-medium ${
                          currentQuestionIndex === question.id - 1
                            ? "ring-2 ring-blue-500"
                            : ""
                        } ${
                          getQuestionStatus(question.id) === "answered"
                            ? "bg-green-500 text-white"
                            : getQuestionStatus(question.id) ===
                                "answered-marked"
                              ? "bg-red-500 text-white"
                              : getQuestionStatus(question.id) === "marked"
                                ? "bg-purple-500 text-white"
                                : "bg-gray-300"
                        }`}
                      >
                        {question.id}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chemistry questions */}
                <div>
                  <h3 className="mb-2 font-medium">Chemistry</h3>
                  <div className="grid grid-cols-5 gap-1">
                    {chemistryQuestions.map((question) => (
                      <button
                        key={question.id}
                        onClick={() => goToQuestion(question.id - 1)}
                        className={`h-8 w-8 rounded text-xs font-medium ${
                          currentQuestionIndex === question.id - 1
                            ? "ring-2 ring-blue-500"
                            : ""
                        } ${
                          getQuestionStatus(question.id) === "answered"
                            ? "bg-green-500 text-white"
                            : getQuestionStatus(question.id) ===
                                "answered-marked"
                              ? "bg-red-500 text-white"
                              : getQuestionStatus(question.id) === "marked"
                                ? "bg-purple-500 text-white"
                                : "bg-gray-300"
                        }`}
                      >
                        {question.id}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mathematics questions */}
                <div>
                  <h3 className="mb-2 font-medium">Mathematics</h3>
                  <div className="grid grid-cols-5 gap-1">
                    {mathematicsQuestions.map((question) => (
                      <button
                        key={question.id}
                        onClick={() => goToQuestion(question.id - 1)}
                        className={`h-8 w-8 rounded text-xs font-medium ${
                          currentQuestionIndex === question.id - 1
                            ? "ring-2 ring-blue-500"
                            : ""
                        } ${
                          getQuestionStatus(question.id) === "answered"
                            ? "bg-green-500 text-white"
                            : getQuestionStatus(question.id) ===
                                "answered-marked"
                              ? "bg-red-500 text-white"
                              : getQuestionStatus(question.id) === "marked"
                                ? "bg-purple-500 text-white"
                                : "bg-gray-300"
                        }`}
                      >
                        {question.id}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full"
                  variant="destructive"
                >
                  Submit Test
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main content area */}
          <div className="flex-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-sm">
                      {currentQuestion.subject}
                    </Badge>
                    <CardTitle className="text-xl">
                      Question {currentQuestion.id}
                    </CardTitle>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleMarkForReview(currentQuestion.id)}
                    className={`gap-1 ${
                      markedForReview[currentQuestion.id]
                        ? "bg-purple-100 text-purple-700"
                        : ""
                    }`}
                  >
                    <Bookmark
                      className={`h-4 w-4 ${
                        markedForReview[currentQuestion.id]
                          ? "fill-current"
                          : ""
                      }`}
                    />
                    Mark for Review
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6 text-lg">{currentQuestion.question}</div>

                <RadioGroup
                  value={selectedAnswers[currentQuestion.id]?.toString()}
                  onValueChange={(value) =>
                    handleAnswerSelect(currentQuestion.id, parseInt(value))
                  }
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 rounded-lg border p-3 transition-colors hover:bg-slate-50"
                    >
                      <RadioGroupItem
                        value={index.toString()}
                        id={`option-${currentQuestion.id}-${index}`}
                      />
                      <Label
                        htmlFor={`option-${currentQuestion.id}-${index}`}
                        className="flex-1 cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {/* AI Hint Section */}
                <div className="mt-6">
                  <Button
                    variant="outline"
                    onClick={() => toggleShowHint(currentQuestion.id)}
                    className="w-full gap-2"
                  >
                    <Bot className="h-4 w-4" />
                    {showHint[currentQuestion.id] ? "Hide" : "Show"} AI Hint
                  </Button>

                  {showHint[currentQuestion.id] && (
                    <Alert className="mt-3 border-blue-200 bg-blue-50">
                      <Lightbulb className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-800">
                        {currentQuestion.hint}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* Navigation buttons */}
                <div className="mt-6 flex justify-between">
                  <Button
                    variant="outline"
                    onClick={goToPreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>

                  <div className="flex gap-2">
                    <span className="flex items-center px-3 text-sm text-gray-600">
                      {currentQuestionIndex + 1} / {mhtCetQuestions.length}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    onClick={goToNextQuestion}
                    disabled={
                      currentQuestionIndex === mhtCetQuestions.length - 1
                    }
                    className="gap-1"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
