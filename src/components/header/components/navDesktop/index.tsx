"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import UserType from "@/components/userType";
import { UserContext } from "@/contexts/UserContext";
import { HoverCard } from "@radix-ui/react-hover-card";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

const NavDesktop = () => {
  const { status, data } = useSession();
  const { userType } = useContext(UserContext);
  const pathname = usePathname();
  const parts = pathname.split("/");
  const beforePathName = parts[1];

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

      {status === "authenticated" && userType === "client" && (
        <ul className="flex flex-1 h-[45px] w-full items-center justify-end gap-3 text-sm uppercase">
          <li
            className={`${
              pathname === "/"
                ? "bg-primary text-secondary p-2 rounded-lg hover:bg-secondary hover:text-primary duration-300 font-bold"
                : "hover:bg-primary hover:text-secondary p-2 rounded-lg duration-300"
            }`}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className={`${
              beforePathName === "offers"
                ? "bg-primary text-secondary p-2 rounded-lg hover:bg-secondary hover:text-primary duration-300 font-bold"
                : "hover:bg-primary hover:text-secondary p-2 rounded-lg duration-300"
            }`}
          >
            <Link href="/offers">Offers</Link>
          </li>
          <li
            className={`${
              pathname === "/vacation"
                ? "bg-primary text-secondary p-2 rounded-lg hover:bg-secondary hover:text-primary duration-300 font-bold"
                : "hover:bg-primary hover:text-secondary p-2 rounded-lg duration-300"
            }`}
          >
            <Link href="/vacation">Vacation</Link>
          </li>
          <li
            className={`${
              beforePathName === "profile"
                ? "bg-primary text-secondary p-2 rounded-lg hover:bg-secondary hover:text-primary duration-300 font-bold"
                : "hover:bg-primary hover:text-secondary p-2 rounded-lg duration-300"
            }`}
          >
            <Link href="/profile">Profile</Link>
          </li>
          <li
            className={`${
              pathname === "/about"
                ? "bg-primary text-secondary p-2 rounded-lg hover:bg-secondary hover:text-primary duration-300 font-bold"
                : "hover:bg-primary hover:text-secondary p-2 rounded-lg duration-300"
            }`}
          >
            <Link href="/about">About</Link>
          </li>
          <li
            className={`${
              pathname === "/contact"
                ? "bg-primary text-secondary p-2 rounded-lg hover:bg-secondary hover:text-primary duration-300 font-bold"
                : "hover:bg-primary hover:text-secondary p-2 rounded-lg duration-300"
            }`}
          >
            <Link href="/contact">Contact</Link>
          </li>
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
              click to logout
            </HoverCardContent>
          </HoverCard>
        </ul>
      )}

      {status === "authenticated" && userType === "advertiser" && (
        <ul className="flex flex-1 h-[45px] w-full items-center justify-end gap-3 text-sm uppercase">
          <li
            className={`${
              pathname === "/"
                ? "bg-primary text-secondary p-2 rounded-lg hover:bg-secondary hover:text-primary duration-300 font-bold"
                : "hover:bg-primary hover:text-secondary p-2 rounded-lg duration-300"
            }`}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className={`${
              beforePathName === "create"
                ? "bg-primary text-secondary p-2 rounded-lg hover:bg-secondary hover:text-primary duration-300 font-bold"
                : "hover:bg-primary hover:text-secondary p-2 rounded-lg duration-300"
            }`}
          >
            <Link href="/create">Create</Link>
          </li>
          <li
            className={`${
              beforePathName === "offers"
                ? "bg-primary text-secondary p-2 rounded-lg hover:bg-secondary hover:text-primary duration-300 font-bold"
                : "hover:bg-primary hover:text-secondary p-2 rounded-lg duration-300"
            }`}
          >
            <Link href="/offers">Offers</Link>
          </li>
          <li
            className={`${
              beforePathName === "profile"
                ? "bg-primary text-secondary p-2 rounded-lg hover:bg-secondary hover:text-primary duration-300 font-bold"
                : "hover:bg-primary hover:text-secondary p-2 rounded-lg duration-300"
            }`}
          >
            <Link href="/profile">Profile</Link>
          </li>
          <li
            className={`${
              pathname === "/about"
                ? "bg-primary text-secondary p-2 rounded-lg hover:bg-secondary hover:text-primary duration-300 font-bold"
                : "hover:bg-primary hover:text-secondary p-2 rounded-lg duration-300"
            }`}
          >
            <Link href="/about">About</Link>
          </li>
          <li
            className={`${
              pathname === "/contact"
                ? "bg-primary text-secondary p-2 rounded-lg hover:bg-secondary hover:text-primary duration-300 font-bold"
                : "hover:bg-primary hover:text-secondary p-2 rounded-lg duration-300"
            }`}
          >
            <Link href="/contact">Contact</Link>
          </li>
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
            <HoverCardContent className="uppercase w-auto p-2 bg-primary text-secondary">
              click to logout
            </HoverCardContent>
          </HoverCard>
        </ul>
      )}

      {status === "unauthenticated" && (
        <ul className="flex flex-1 h-[45px] w-full items-center justify-end gap-3 text-sm uppercase">
          <li
            className={`${
              pathname === "/"
                ? "bg-primary text-secondary p-2 rounded-lg hover:bg-secondary hover:text-primary duration-300 font-bold"
                : "hover:bg-primary hover:text-secondary p-2 rounded-lg duration-300"
            }`}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className={`${
              pathname === "/about"
                ? "bg-primary text-secondary p-2 rounded-lg hover:bg-secondary hover:text-primary duration-300 font-bold"
                : "hover:bg-primary hover:text-secondary p-2 rounded-lg duration-300"
            }`}
          >
            <Link href="/about">About</Link>
          </li>
          <li
            className={`${
              pathname === "/contact"
                ? "bg-primary text-secondary p-2 rounded-lg hover:bg-secondary hover:text-primary duration-300 font-bold"
                : "hover:bg-primary hover:text-secondary p-2 rounded-lg duration-300"
            }`}
          >
            <Link href="/contact">Contact</Link>
          </li>
          <Button
            onClick={() => signIn()}
            variant="destructive"
            className="w-full justify-start uppercase"
          >
            Login
          </Button>
        </ul>
      )}
    </div>
  );
};

export default NavDesktop;
