"use client";

import {
  TextSelect,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  AtSign,
  User,
  SmilePlus,
  CircleDollarSign,
  Wallet,
  FileCog,
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
import { useContext } from "react";
import UserType from "../userType";
import { UserContext } from "@/app/contexts/UserContext";

const Header = () => {
  const { status, data } = useSession();
  const { userType } = useContext(UserContext);

  return (
    <div className="w-full flex justify-center items-center border-y">
      {status === "authenticated" && userType === null && <UserType />}
      <nav className="flex w-full">
        <Card className="flex items-center justify-between w-full max-w-7xl p-2 border-none">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-[19.688rem] md:w-[21.875rem]"
            >
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

                {status === "authenticated" && userType === "client" && (
                  <div className="mt-4 flex flex-col gap-2">
                    <SheetClose asChild>
                      <Link href="/offers">
                        <Button
                          variant="default"
                          className="w-full justify-start gap-2"
                        >
                          <CircleDollarSign size={16} />
                          Explore Offers
                        </Button>
                      </Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <Link href="/vacation">
                        <Button
                          variant="default"
                          className="w-full justify-start gap-2"
                        >
                          <SmilePlus size={16} />
                          My Vacation
                        </Button>
                      </Link>
                    </SheetClose>
                  </div>
                )}

                {status === "authenticated" && userType === "advertiser" && (
                  <div className="mt-4 flex flex-col gap-2">
                    <SheetClose asChild>
                      <Link href="/create">
                        <Button
                          variant="default"
                          className="w-full justify-start gap-2"
                        >
                          <Wallet size={16} />
                          Create Offer
                        </Button>
                      </Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <Link href="/manage">
                        <Button
                          variant="default"
                          className="w-full justify-start gap-2"
                        >
                          <FileCog size={16} />
                          Manage Offers
                        </Button>
                      </Link>
                    </SheetClose>
                  </div>
                )}

                {status === "authenticated" && data?.user && (
                  <div className="flex flex-col gap-2">
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

                    <Button
                      onClick={() => signOut()}
                      variant="default"
                      className="w-full justify-start gap-2"
                    >
                      <LogOutIcon size={16} />
                      Logout
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
      </nav>

      {/* <nav className="hidden h-[60px] items-center justify-center gap-2 border bg-card p-[0.5rem] px-[2%] text-card-foreground shadow-sm md:flex">
        <Link href="/">
          <h1 className="font-bold text-sm md:text-xl lg:text-2xl xl:text-3xl">
            QUIL
            <span className="bg-gradient-to-r from-purple-900 to-indigo-500 bg-clip-text text-transparent">
              VACATION
            </span>
          </h1>
        </Link>
        <ul className="p2-1 flex h-full w-full items-center justify-end gap-2 pr-2 text-sm uppercase">
            <li>
              
              
            </li>
          ))}
        </ul>
      </nav> */}
    </div>
  );
};

export default Header;
