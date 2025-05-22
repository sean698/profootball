import CommentsPage from "@/components/CommentsPage";

export default async function Page({ params }) {
  const awaitedParams = await params;
  return <CommentsPage title={awaitedParams.title} />;
}
