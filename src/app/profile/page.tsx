import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }
  return <main className="p-2">Perfil do Usuário</main>;
}
