"use client";

import {
  TextSelect,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  AtSign,
  User,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

import { AvatarFallback } from "@radix-ui/react-avatar";

import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";

const Header = () => {
  const { status, data } = useSession();

  return (
    <Card className="flex items-center justify-between p-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-[19.688rem] md:w-[21.875rem]">
          <SheetHeader className="text-left text-lg font-semibold">
            Menu
          </SheetHeader>

          {status === "authenticated" && data?.user && (
            <div className="flex flex-col">
              <div className="flex items-center gap-2 py-4">
                <Avatar>
                  <AvatarFallback>
                    {data.user.name?.[0].toUpperCase()}
                  </AvatarFallback>

                  {data.user.image && <AvatarImage src={data.user.image} />}
                </Avatar>

                <div className="flex flex-col">
                  <p className="font-medium">{data.user.name}</p>
                  <p className="text-sm opacity-75">
                    Thank you for your trust!
                  </p>
                </div>
              </div>

              <Separator />
            </div>
          )}

          <div className="mt-4 flex flex-col gap-2">
            {status === "unauthenticated" && (
              <Button
                onClick={() => signIn()}
                variant="default"
                className="w-full justify-start gap-2"
              >
                <LogInIcon size={16} />
                Fazer Login
              </Button>
            )}

            {status === "authenticated" && (
              <div className="mt-4 flex flex-col gap-2">
                <SheetClose asChild>
                  <Link href="/profile">
                    <Button
                      variant="default"
                      className="w-full justify-start gap-2"
                    >
                      <User size={16} />
                      Profile
                    </Button>
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link href="/about">
                    <Button
                      variant="default"
                      className="w-full justify-start gap-2"
                    >
                      <TextSelect size={16} />
                      About
                    </Button>
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link href="/contact">
                    <Button
                      variant="default"
                      className="w-full justify-start gap-2"
                    >
                      <AtSign size={16} />
                      Contact
                    </Button>
                  </Link>
                </SheetClose>

                <Button
                  onClick={() => signOut()}
                  variant="default"
                  className="w-full justify-start gap-2"
                >
                  <LogOutIcon size={16} />
                  Fazer Logout
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <Link href="/">
        <h1 className="font-bold text-sm md:text-xl lg:text-2xl xl:text-3xl">
          QUIL
          <span className="bg-gradient-to-r from-purple-900 to-indigo-500 bg-clip-text text-transparent">
            VACATION
          </span>
        </h1>
      </Link>
    </Card>
  );
};

export default Header;
