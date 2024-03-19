import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function MyVacation() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }
  return <main className="mt-[57px] p-2 max-w-7xl"><h1 className="uppercase font-bold text-sm sm:text-base md:text-lg lg:text-2xl my-5">
  vacation under construction
        </h1></main>;
}
