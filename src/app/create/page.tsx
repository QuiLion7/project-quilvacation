import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ShowConfigCreate } from "./components/showConfigCreate";

export default async function CreateOffer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <main className="mt-[57px] max-w-7xl flex h-full w-full flex-col items-center justify-center p-2">
      <ShowConfigCreate />
    </main>
  );
}
