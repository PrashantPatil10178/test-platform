import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await auth();

  if (
    !session ||
    (session.user.role !== "ADMIN" && session.user.role !== "MODERATOR")
  ) {
    return redirect("/signin");
  }

  // Redirect admins to the overview page (the existing dashboard)
  redirect("/dashboard/overview");
}
