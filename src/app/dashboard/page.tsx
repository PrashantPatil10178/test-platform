import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    return redirect("/signin");
  }

  // Role-based dashboard routing
  const userRole = session.user.role;

  if (userRole === "STUDENT") {
    redirect("/dashboard/student");
  } else if (userRole === "ORGANIZATION") {
    redirect("/dashboard/organization");
  } else if (userRole === "ADMIN" || userRole === "MODERATOR") {
    redirect("/dashboard/admin");
  } else {
    // Default fallback
    redirect("/dashboard/overview");
  }
}
