import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LoadingDataVacation } from "./components/loadingDataVacation";

export default async function MyVacation() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }
  return (
    <main className="mt-[57px] p-2 max-w-7xl">
      <LoadingDataVacation />
    </main>
  );
}
