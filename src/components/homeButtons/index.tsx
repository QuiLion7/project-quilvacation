"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";

const HomeButtons = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center flex-col sm:flex-row items-center w-full gap-2">
      <motion.div
        variants={fadeIn("right", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
        className="group flex justify-center items-center w-full bg-[url('/bg4.jpg')] bg-cover bg-no-repeat bg-center rounded-xl"
      >
        <div className="flex justify-center items-center flex-col gap-2 rounded-xl w-full uppercase p-2 bg-primary/10 group-hover:bg-primary/40 duration-500">
          <div className="text-center group-hover:scale-105 rounded-xl duration-500 p-2">
            <h1 className="font-bold text-secondary text-sm sm:text-base md:text-lg lg:text-xl">
              You deserve vacation
            </h1>
            <h3 className="font-bold text-secondary text-[0.7rem] sm:text-xs md:text-sm lg:text-lg">
              choose and hire the best
            </h3>
          </div>
          <Button
            className="uppercase w-[150px] sm:w-[170px] font-bold group-hover:scale-105 rounded-xl transition-all"
            onClick={() => router.push("/offers")}
          >
            choose now
          </Button>
        </div>
      </motion.div>
      <motion.div
        variants={fadeIn("left", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
        className="group flex justify-center items-center w-full bg-[url('/bg5.jpg')] bg-cover bg-no-repeat bg-center rounded-xl"
      >
        <div className="flex justify-center items-center flex-col gap-2 rounded-xl w-full uppercase p-2 bg-primary/10 group-hover:bg-primary/40 duration-500">
          <div className="text-center group-hover:scale-105 rounded-xl duration-500 p-2">
            <h1 className="font-bold text-secondary text-sm sm:text-base md:text-lg lg:text-xl">
              your destiny is to be happy
            </h1>
            <h3 className="font-bold text-secondary text-[0.7rem] sm:text-xs md:text-sm lg:text-lg">
              Get in touch and ask any questions
            </h3>
          </div>
          <Button
            className="uppercase w-[150px] sm:w-[170px] font-bold group-hover:scale-105 rounded-xl transition-all"
            onClick={() => router.push("/contact")}
          >
            contact
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default HomeButtons;
