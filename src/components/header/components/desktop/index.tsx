"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import UserType from "@/components/userType";
import { UserContext } from "@/contexts/UserContext";
import { HoverCard } from "@radix-ui/react-hover-card";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";

const NavDesktop = () => {
  const { status, data } = useSession();
  const { userType } = useContext(UserContext);

  return (
    <div className="flex w-full max-w-7xl h-[56px] p-2 items-center justify-center">
      {status === "authenticated" && userType === null && <UserType />}

      <Link
        href="/"
        className="h-[45px] w-full flex justify-start items-center"
      >
        <h1 className="font-bold text-sm md:text-xl lg:text-2xl xl:text-3xl">
          QUIL
          <span className="bg-gradient-to-r from-purple-900 to-indigo-500 bg-clip-text text-transparent">
            VACATION
          </span>
        </h1>
      </Link>

      <ul className="flex flex-1 h-[45px] w-full items-center justify-end gap-3 text-sm uppercase">
        <li className="hover:bg-primary hover:text-secondary p-2 rounded-lg">
          <Link href="/">Home</Link>
        </li>
        {status === "authenticated" && userType === "client" && (
          <li className="hover:bg-primary hover:text-secondary p-2 rounded-lg">
            <Link href="/offers">Offers</Link>
          </li>
        )}
        {status === "authenticated" && userType === "client" && (
          <li className="hover:bg-primary hover:text-secondary p-2 rounded-lg">
            <Link href="/vacation">Vacation</Link>
          </li>
        )}
        {status === "authenticated" && userType === "advertiser" && (
          <li className="hover:bg-primary hover:text-secondary p-2 rounded-lg">
            <Link href="/create">Create</Link>
          </li>
        )}
        {status === "authenticated" && userType === "advertiser" && (
          <li className="hover:bg-primary hover:text-secondary p-2 rounded-lg">
            <Link href="/manage">Manage</Link>
          </li>
        )}

        <li className="hover:bg-primary hover:text-secondary p-2 rounded-lg">
          <Link href="about">About</Link>
        </li>
        <li className="hover:bg-primary hover:text-secondary p-2 rounded-lg">
          <Link href="contact">Contact</Link>
        </li>

        {status === "unauthenticated" && (
          <Button
            onClick={() => signIn()}
            variant="default"
            className="w-full justify-start uppercase"
          >
            Login
          </Button>
        )}

        {status === "authenticated" && data?.user && (
          <HoverCard>
            <HoverCardTrigger>
              <Avatar
                onClick={() => signOut()}
                className="cursor-pointer hover:scale-105 duration-700"
              >
                <AvatarFallback>
                  {data.user.name?.[0].toUpperCase()}
                </AvatarFallback>

                {data.user.image && <AvatarImage src={data.user.image} />}
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="uppercase w-auto p-2">
              Logout
            </HoverCardContent>
          </HoverCard>
        )}
      </ul>
    </div>
  );
};

export default NavDesktop;
