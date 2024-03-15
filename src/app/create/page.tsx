import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Manage } from "./components/manage";

export default async function CreateOffer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <main className="flex h-full w-full flex-col items-center justify-center p-2">
      <h1 className="uppercase font-bold text-sm sm:text-base md:text-lg lg:text-2xl my-5">
        to manage
      </h1>
      <Manage />
    </main>
  );
}
