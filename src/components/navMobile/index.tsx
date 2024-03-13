"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  CircleDollarSign,
  FileCog,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  SmilePlus,
  User,
  Wallet,
  Home,
  PhoneCall,
  NotebookPen,
} from "lucide-react";
import UserType from "@/components/userType";

const NavMobile = () => {
  const { status, data } = useSession();
  const { userType } = useContext(UserContext);

  return (
    <div className="flex w-full ">
      {status === "authenticated" && userType === null && <UserType />}

      <Card className="flex items-center max-w-7xl justify-between w-full p-2 border-none">
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

              {status === "authenticated" && data?.user && (
                <div className="flex flex-col">
                  <SheetClose asChild>
                    <Link href="/">
                      <Button
                        variant="default"
                        className="w-full justify-start gap-2"
                      >
                        <Home size={16} />
                        Home
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              )}

              {status === "authenticated" && userType === "client" && (
                <div className="flex flex-col gap-2">
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
                <div className="flex flex-col gap-2">
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

                  <SheetClose asChild>
                    <Link href="/about">
                      <Button
                        variant="default"
                        className="w-full justify-start gap-2"
                      >
                        <NotebookPen size={16} />
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
                        <PhoneCall size={16} />
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
    </div>
  );
};

export default NavMobile;
