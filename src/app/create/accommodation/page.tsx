import FormAccommodation from "@/components/formAccommodation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Accommodation() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }
  return (
    <main className="flex h-full w-full flex-col items-center justify-center p-2">
      <h1 className="uppercase font-bold text-sm sm:text-base md:text-lg lg:text-2xl my-5">
        Create Accommodation
      </h1>
      <FormAccommodation />
    </main>
  );
}
