import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";

export const metadata = {
  title: "Dashboard: Students",
};

export default async function StudentsPage() {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Students"
            description="Manage student enrollments and view their performance."
          />
          <Link
            href="/dashboard/students/new"
            className={cn(buttonVariants(), "text-xs md:text-sm")}
          >
            <IconPlus className="mr-2 h-4 w-4" /> Add Student
          </Link>
        </div>
        <Separator />

        {/* Student listing will go here */}
        <div className="rounded-lg border p-8 text-center">
          <p className="text-muted-foreground">
            Student management interface coming soon...
          </p>
          <p className="text-muted-foreground mt-2 text-sm">
            View all enrolled students, their test attempts, scores, and
            performance analytics.
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
