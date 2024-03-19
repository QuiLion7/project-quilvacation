import * as React from "react";
import Image from "next/image";
import Experience from "@/app/about/components/experience";
import Education from "@/app/about/components/education";
import Footer from "@/components/footer";

export default function About() {
  return (
    <div className="mt-[57px] max-w-7xl flex h-full w-full flex-col items-center justify-center">
      <div className=" flex gap-2 h-full w-full flex-col items-center justify-between overflow-y-auto">
        <div className="flex h-auto w-full flex-col items-center justify-center gap-2 px-[2%] pt-2 sm:gap-4 md:gap-6">
          <section className=" relative flex h-auto w-full flex-col items-center justify-center gap-2 border-y-2 border-primary p-2 duration-300 hover:rounded-lg hover:bg-background/50 sm:flex-row">
            <div className="w-full">
              <h1 className="text-md flex cursor-default justify-center text-center font-bold uppercase duration-300 hover:text-primary md:text-2xl lg:text-3xl">
                FRONT-END DEVELOPER
              </h1>
              <div className="flex h-full w-full flex-col justify-center gap-2">
                <h2 className="w-full cursor-default text-center text-sm font-semibold uppercase duration-300 hover:text-primary md:text-lg lg:text-xl">
                  Who am I?!
                </h2>
                <h3 className="cursor-default text-justify text-[0.7rem] font-semibold duration-300 hover:text-primary md:text-sm lg:text-base">
                  I am a developer of codes and solutions who believes in the
                  importance of collaboration and effective communication. I
                  study periodically, as technology is one of my passions.
                </h3>
                <h3 className="cursor-default text-justify text-[0.7rem] font-semibold duration-300 hover:text-primary md:text-sm lg:text-base">
                  We have verbal and written communication skills, dynamism and
                  proactivity have become routine, and working in a team is a
                  hard skill I am proud to have.
                </h3>
                <h3 className="cursor-default text-justify text-[0.68rem] font-semibold duration-300 hover:text-primary md:text-sm lg:text-base"></h3>
                <h3 className="cursor-default text-justify text-[0.7rem] font-semibold duration-300 hover:text-primary md:text-sm lg:text-base">
                  A distinguished teacher, a passionate husband, a playful
                  father, and grateful. A technology enthusiast, who is
                  detail-oriented and persistent in achieving goals. As an
                  unsatisfied loser, I am a problem solver.
                </h3>
              </div>
            </div>
            <Image
              src="/quilabout1.png"
              width={0}
              height={0}
              className="hidden w-auto rounded-lg duration-300 sm:block sm:h-[250px] sm:scale-[105.5%] md:h-[350px] md:scale-[103.7%] lg:h-[400px]"
              sizes="100%"
              priority
              alt="Quilion"
            />
            <Image
              src="/quilprofile.png"
              width={0}
              height={0}
              className="block h-[100px] w-auto scale-[113%] rounded-lg duration-300 sm:hidden"
              sizes="100%"
              priority
              alt="Quilion"
            />
          </section>
          <section className="grid h-full w-full grid-cols-1 items-center justify-center gap-4 md:grid-cols-2">
            <div className="h-full w-full border-y-2 border-primary p-2 duration-300 hover:rounded-lg hover:bg-background/50">
              <Experience />
            </div>
            <div className="h-full w-full border-y-2 border-primary p-2 duration-300 hover:rounded-lg hover:bg-background/50">
              <Education />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
