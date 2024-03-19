import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { experiences } from "@/constants";

export default function Experience() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="text-md cursor-default text-center font-bold uppercase duration-300 hover:text-primary md:text-base lg:text-xl">
        Experience
      </h1>
      <section className="grid h-full w-full grid-cols-1 items-center justify-center gap-2 ">
        <Accordion type="single" collapsible className="w-full">
          {experiences.map((experience, index) => (
            <AccordionItem
              className="p-2 duration-300 hover:rounded-lg hover:bg-background/50"
              value={index.toString()}
              key={index}
            >
              <AccordionTrigger className="text-sm font-bold uppercase duration-300 hover:text-primary md:text-base lg:text-xl">
                {experience.role} | {experience.period}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                <h3 className="text-justify text-[0.7rem] font-semibold duration-300 hover:text-primary sm:text-xs md:text-sm lg:text-base">
                  <strong>COMPANY:</strong> {experience.company}
                </h3>
                <h3 className="text-justify text-[0.7rem] font-semibold duration-300 hover:text-primary sm:text-xs md:text-sm lg:text-base">
                  <strong>RESPONSIBILITIES:</strong>{" "}
                  {experience.responsibilities.join(" ")}
                </h3>
                <h3 className="text-justify text-[0.7rem] font-semibold duration-300 hover:text-primary sm:text-xs md:text-sm lg:text-base">
                  <strong>ACHIEVEMENTS:</strong>{" "}
                  {experience.achievements.join(" ")}
                </h3>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
