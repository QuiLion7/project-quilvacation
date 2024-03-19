import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { education } from "@/constants";

export default function Education() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="text-md cursor-default text-center font-bold uppercase duration-300 hover:text-primary md:text-base lg:text-xl">
        EDUCATION
      </h1>
      <section className="grid h-full w-full grid-cols-1 items-center justify-center gap-2">
        <Accordion
          type="single"
          collapsible
          className="grid w-full grid-cols-1 sm:grid-cols-2"
        >
          {education.map((educ, index) => (
            <AccordionItem
              className="p-2 duration-300 hover:rounded-lg hover:bg-background/50"
              value={index.toString()}
              key={index}
            >
              <AccordionTrigger className="text-sm font-bold uppercase duration-300 hover:text-primary md:text-base lg:text-xl">
                {educ.degree}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-2">
                <h3 className="text-justify text-[0.7rem] font-semibold duration-300 hover:text-primary sm:text-xs md:text-sm lg:text-base ">
                  <strong>INSTITUTION:</strong> {educ.institution}
                </h3>
                <h3 className="text-justify text-[0.7rem] font-semibold duration-300 hover:text-primary sm:text-xs md:text-sm lg:text-base">
                  <strong>PERIOD:</strong> {educ.period}
                </h3>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
