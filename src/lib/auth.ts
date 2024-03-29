import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import { Adapter } from "next-auth/adapters";
import { auth } from "firebase-admin";

export interface UserIDProps {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  userType?: string | null;
}

async function createUserInFirebaseAuth(user: UserIDProps) {
  try {
    const { id, email, name, image } = user;
    await auth().createUser({
      uid: id as string | undefined,
      email: email as string | undefined,
      displayName: name,
      photoURL: image,
    });
  } catch (error) {
    console.error(
      "Erro ao criar novo usuário no Firebase Authentication",
      error
    );
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    }),
  }) as Adapter,
  callbacks: {
    async session({ session, token, user }) {
      if (user && typeof user.id === "string") {
        session.user = {
          id: user.id,
          name: user.name || null,
          email: user.email || null,
          image: user.image || null,
        };

        await createUserInFirebaseAuth(session.user);
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
