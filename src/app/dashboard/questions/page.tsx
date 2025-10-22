import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";

export const metadata = {
  title: "Dashboard: Questions",
};

export default async function QuestionsPage() {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Questions Bank"
            description="Manage questions across subjects and chapters."
          />
          <Link
            href="/dashboard/questions/new"
            className={cn(buttonVariants(), "text-xs md:text-sm")}
          >
            <IconPlus className="mr-2 h-4 w-4" /> Add Question
          </Link>
        </div>
        <Separator />

        {/* Question listing will go here */}
        <div className="rounded-lg border p-8 text-center">
          <p className="text-muted-foreground">
            Question management interface coming soon...
          </p>
          <p className="text-muted-foreground mt-2 text-sm">
            This will show all questions from your database with filters by
            Subject, Chapter, and Difficulty.
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
