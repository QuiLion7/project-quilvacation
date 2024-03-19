"use client";

import { useState } from "react";
import { categories } from "@/constants";
import { FileCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingData } from "../loadingData";
import FormAccommodation from "../formAccommodation";
import FormTransportation from "../formTransportation";

export function ShowConfig() {
  const [selectedShow, setSelectedShow] = useState("manage");

  const handleSelectedClick = (select: string) => {
    setSelectedShow(select);
  };
  return (
    <div className="w-full flex-col gap-6 justify-center items-center">
      <nav className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-center justify-center gap-2 text-secondary duration-300">
        <Button
          key={0}
          className="flex-1 flex justify-center items-center gap-2 w-full hover:font-bold"
          onClick={() => handleSelectedClick("manage")}
        >
          <FileCog className="h-auto w-4 md:w-5" />
          <p className="text-xs md:text-base">Manage</p>
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            className="flex-1 w-full hover:font-bold"
            onClick={() => handleSelectedClick(category.name)}
          >
            <p className="text-xs md:text-base">{category.name}</p>
          </Button>
        ))}
      </nav>
      <div
        className="w-full flex justify-center items-center py-2"
      >
        {selectedShow === "manage" && <LoadingData />}
        {selectedShow === "Accommodation" && <FormAccommodation />}
        {selectedShow === "Transportation" && <FormTransportation />}
        {selectedShow === "Good Food" && (
          <h1 className="uppercase font-bold text-sm sm:text-base md:text-lg lg:text-2xl my-5">
            under construction
          </h1>
        )}
      </div>
    </div>
  );
}
