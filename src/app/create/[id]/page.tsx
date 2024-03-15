export default function CreateDetails({
  params,
}: {
  params: { slug: string };
}) {
  return <div>My Post: {params.slug}</div>;
}
