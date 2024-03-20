"use client";
import { TypeAnimation } from "react-type-animation";

const TitleAnimation = () => {
  return (
    <div className=" flex-1 flex flex-col sm:flex-row gap-2 justify-center items-center w-full h-full bg-primary/10 hover:bg-primary/45 duration-500 rounded-xl">
      <div className="flex flex-col gap-2 justify-center items-center w-full   h-[30%] sm:flex-1 p-4">
        <h1 className="font-bold text-secondary text-center text-lg sm:text-xl md:text-3xl lg:text-4xl uppercase duration-500 tracking-wide cursor-default">
          <TypeAnimation
            sequence={["Creating", 2000, "Planning", 2000, "Realizing", 2000]}
            speed={20}
            className="text-secondary"
            wrapper="span"
            repeat={Infinity}
          />
          Your Dream Vacations in 2024!
        </h1>
        <h3 className="font-bold text-center text-xs text-secondary sm:text-base md:text-lg lg:text-2xl uppercase hover:scale-105 tracking-wide cursor-default shadow-2xl">
          Escaping to Dream Vacations in 2024
        </h3>
      </div>
    </div>
  );
};

export default TitleAnimation;
