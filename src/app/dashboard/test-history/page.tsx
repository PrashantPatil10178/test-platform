"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Clock,
  Calendar,
  TrendingUp,
  TrendingDown,
  Award,
  Target,
  CheckCircle2,
  XCircle,
  Eye,
  Search,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";
import PageContainer from "@/components/layout/page-container";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";

export default function TestHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const { data: attempts, isLoading } = api.test.getAttemptsByUser.useQuery();

  const filteredAttempts = attempts?.filter((attempt) => {
    const matchesSearch =
      attempt.test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attempt.test.subject?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || attempt.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: attempts?.length ?? 0,
    completed: attempts?.filter((a) => a.status === "SUBMITTED").length ?? 0,
    avgScore: attempts?.length
      ? (
          attempts.reduce((sum, a) => sum + a.percentage, 0) / attempts.length
        ).toFixed(1)
      : "0.0",
    bestScore: attempts?.length
      ? Math.max(...attempts.map((a) => a.percentage)).toFixed(1)
      : "0.0",
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "SUBMITTED":
        return (
          <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        );
      case "IN_PROGRESS":
        return (
          <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20">
            <Clock className="mr-1 h-3 w-3" />
            In Progress
          </Badge>
        );
      case "EVALUATED":
        return (
          <Badge className="bg-purple-500/10 text-purple-600 hover:bg-purple-500/20">
            <Award className="mr-1 h-3 w-3" />
            Evaluated
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            <XCircle className="mr-1 h-3 w-3" />
            Abandoned
          </Badge>
        );
    }
  };

  const getPerformanceBadge = (percentage: number) => {
    if (percentage >= 80) {
      return (
        <div className="flex items-center gap-1 text-green-600">
          <TrendingUp className="h-4 w-4" />
          <span className="font-semibold">{percentage.toFixed(1)}%</span>
        </div>
      );
    } else if (percentage >= 60) {
      return (
        <div className="flex items-center gap-1 text-yellow-600">
          <Target className="h-4 w-4" />
          <span className="font-semibold">{percentage.toFixed(1)}%</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1 text-red-600">
          <TrendingDown className="h-4 w-4" />
          <span className="font-semibold">{percentage.toFixed(1)}%</span>
        </div>
      );
    }
  };

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
          <Skeleton className="h-96 flex-1" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header with gradient */}
        <div className="border-border/50 relative overflow-hidden rounded-xl border bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 p-8 backdrop-blur-sm">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Test History
                </h1>
                <p className="text-muted-foreground mt-1">
                  Track your progress and review past test attempts
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards with enhanced styling */}
        <div className="grid gap-4 md:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="group border-border/50 relative h-full overflow-hidden bg-gradient-to-br from-blue-500/5 to-blue-600/5 transition-all hover:shadow-lg hover:shadow-blue-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Attempts
                </CardTitle>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
                  <Clock className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold tracking-tight">
                  {stats.total}
                </div>
                <p className="text-muted-foreground mt-1 text-xs">
                  All test attempts
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="group border-border/50 relative h-full overflow-hidden bg-gradient-to-br from-green-500/5 to-green-600/5 transition-all hover:shadow-lg hover:shadow-green-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/10">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold tracking-tight">
                  {stats.completed}
                </div>
                <p className="text-muted-foreground mt-1 text-xs">
                  {stats.total > 0
                    ? `${((stats.completed / stats.total) * 100).toFixed(0)}%`
                    : "0%"}{" "}
                  completion rate
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="group border-border/50 relative h-full overflow-hidden bg-gradient-to-br from-purple-500/5 to-purple-600/5 transition-all hover:shadow-lg hover:shadow-purple-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Score
                </CardTitle>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10">
                  <Target className="h-4 w-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold tracking-tight">
                  {stats.avgScore}%
                </div>
                <p className="text-muted-foreground mt-1 text-xs">
                  Across all tests
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="group border-border/50 relative h-full overflow-hidden bg-gradient-to-br from-amber-500/5 to-amber-600/5 transition-all hover:shadow-lg hover:shadow-amber-500/10">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Best Score
                </CardTitle>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10">
                  <Award className="h-4 w-4 text-amber-600" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold tracking-tight">
                  {stats.bestScore}%
                </div>
                <p className="text-muted-foreground mt-1 text-xs">
                  Personal best
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Filters with enhanced styling */}
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1 md:max-w-sm">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Search by test name or subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-background/50 border-input pl-9 backdrop-blur-sm"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="bg-background/50 border-input w-full backdrop-blur-sm md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="SUBMITTED">Completed</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="EVALUATED">Evaluated</SelectItem>
                  <SelectItem value="ABANDONED">Abandoned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        {/* Test History Table with enhanced styling */}
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
                <Calendar className="h-4 w-4 text-blue-600" />
              </div>
              Your Test Attempts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!filteredAttempts?.length ? (
              <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 py-20 text-center">
                <Clock className="h-12 w-12 opacity-20" />
                <p className="text-lg font-medium">No test attempts found</p>
                <p className="text-sm">
                  {searchQuery || filterStatus !== "all"
                    ? "Try adjusting your filters"
                    : "Start taking tests to see your history here"}
                </p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead>Test Name</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead className="text-center">Correct</TableHead>
                      <TableHead className="text-center">Incorrect</TableHead>
                      <TableHead className="text-center">Time Spent</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {filteredAttempts.map((attempt, index) => (
                        <motion.tr
                          key={attempt.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ delay: index * 0.05 }}
                          className="group hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors"
                        >
                          <TableCell className="font-medium">
                            {attempt.test.title}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="font-normal">
                              {attempt.test.subject || "General"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-muted-foreground flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {format(new Date(attempt.startedAt), "MMM dd")}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(attempt.status)}
                          </TableCell>
                          <TableCell>
                            {attempt.status === "SUBMITTED" ||
                            attempt.status === "EVALUATED"
                              ? getPerformanceBadge(attempt.percentage)
                              : "-"}
                          </TableCell>
                          <TableCell className="text-center">
                            {attempt.status === "SUBMITTED" ||
                            attempt.status === "EVALUATED" ? (
                              <span className="font-medium text-green-600 dark:text-green-500">
                                {attempt.correct}
                              </span>
                            ) : (
                              "-"
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            {attempt.status === "SUBMITTED" ||
                            attempt.status === "EVALUATED" ? (
                              <span className="font-medium text-red-600 dark:text-red-500">
                                {attempt.incorrect}
                              </span>
                            ) : (
                              "-"
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="text-muted-foreground flex items-center justify-center gap-1">
                              <Clock className="h-4 w-4" />
                              {Math.floor(attempt.timeSpent / 60)}m{" "}
                              {attempt.timeSpent % 60}s
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {attempt.status === "IN_PROGRESS" ? (
                              <Link href={`/dashboard/test/${attempt.testId}`}>
                                <Button
                                  size="sm"
                                  className="bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                                >
                                  Continue
                                </Button>
                              </Link>
                            ) : (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="hover:bg-muted"
                              >
                                Review
                              </Button>
                            )}
                          </TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
