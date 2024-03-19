"use client";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";

const TitleAnimation = () => {
  return (
    <div className="group flex-1 flex flex-col sm:flex-row gap-2 justify-center items-center w-full h-full bg-primary/30 hover:bg-primary/0 duration-500 rounded-xl">
      <div className="group flex flex-col gap-2 justify-center items-center w-full group-hover:bg-primary/70 duration-500 rounded-xl h-[30%] sm:flex-1 sm:ml-1 py-8">
        <motion.h1
          variants={fadeIn("left", 0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="font-bold text-secondary text-center text-lg sm:text-xl md:text-3xl lg:text-4xl uppercase duration-500 tracking-wide cursor-default"
        >
          <TypeAnimation
            sequence={[
              "Creating you",
              2000,
              "Planning you",
              2000,
              "Realizing",
              2000,
            ]}
            speed={20}
            className="text-secondary"
            wrapper="span"
            repeat={Infinity}
          />
          Dream Vacations in 2024!
        </motion.h1>
        <motion.h3
          variants={fadeIn("left", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="font-bold text-center text-xs text-secondary sm:text-base md:text-lg lg:text-2xl uppercase hover:scale-105 tracking-wide cursor-default shadow-2xl"
        >
          Escaping to Dream Vacations in 2024
        </motion.h3>
      </div>
      <motion.div
        variants={fadeIn("right", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
        className="h-[70%] sm:flex-1 bg-[url('/bg3.png')] bg-contain bg-no-repeat bg-center w-full sm:h-full"
      ></motion.div>
    </div>
  );
};

export default TitleAnimation;
