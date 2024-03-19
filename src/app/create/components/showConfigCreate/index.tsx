"use client";

import { useState } from "react";
import { categories } from "@/constants";
import { Button } from "@/components/ui/button";
import { LoadingDataCreate } from "../loadingDataCreate";
import FormAccommodation from "../formAccommodation";
import FormTransportation from "../formTransportation";

export function ShowConfigCreate() {
  const [selectedShow, setSelectedShow] = useState("manage");

  const handleSelectedClick = (select: string) => {
    setSelectedShow(select);
  };
  return (
    <div className="w-full flex-col gap-6 justify-center items-center">
      <nav className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-center justify-center gap-2 text-secondary duration-300">
        <Button
          key={0}
          className={`${
            selectedShow === "manage"
              ? "flex-1 flex justify-center items-center gap-2 w-full shadow-lg shadow-indigo-600"
              : "flex-1 flex justify-center items-center gap-2 w-full"
          }`}
          onClick={() => handleSelectedClick("manage")}
        >
          <p className="text-xs md:text-base">Manage Offers</p>
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            className={`${
              selectedShow === category.name
                ? "flex-1 w-full hover:font-bold shadow-lg shadow-indigo-600"
                : "flex-1 w-full duration-300"
            }`}
            onClick={() => handleSelectedClick(category.name)}
          >
            <p className="text-xs md:text-base">Form {category.name}</p>
          </Button>
        ))}
      </nav>
      <div className="w-full flex justify-center items-center py-2">
        {selectedShow === "manage" && <LoadingDataCreate />}
        {selectedShow === "Accommodation" && <FormAccommodation />}
        {selectedShow === "Transportation" && <FormTransportation />}
        {selectedShow === "Food" && (
          <h1 className="uppercase font-bold text-sm sm:text-base md:text-lg lg:text-2xl my-5">
            under construction
          </h1>
        )}
      </div>
    </div>
  );
}
