"use client";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function NewDashboardPage() {
  const { data: session, status } = useSession();
  const { data: response, isLoading } = api.post.getSecretMessage.useQuery(
    undefined,
    {
      refetchOnWindowFocus: false,
      retry: false,
    },
  );

  const mutation = api.dashboard.editStats.useMutation({
    retry: false,

    onSuccess: (data) => {
      console.log("Mutation successful:", data);
    },
  });

  // Run mutation only once when session is ready
  useEffect(() => {
    if (session) {
      mutation.mutate({
        postId: "examplePostId",
        views: 100,
        likes: 10,
      });
    }
  }, [session]); // dependency: only when session changes

  if (isLoading) return <div>Loading...</div>;
  if (!session) return <div>Please sign in to view the dashboard.</div>;

  return (
    <div>{response ? <p>{response}</p> : <p>No secret message found.</p>}</div>
  );
}
