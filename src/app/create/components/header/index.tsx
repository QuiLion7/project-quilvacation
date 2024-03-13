import { categories } from "@/constants";
import { FileCog } from "lucide-react";
import Link from "next/link";

export function HeaderCreate() {
  return (
    <nav className="w-full p-2 flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 text-secondary duration-300">
      <Link
        key={0}
        href="/create"
        className=" flex justify-center items-center gap-2 px-1 py-2 rounded-lg h-full w-full hover:scale-[102%] duration-300 bg-primary"
      >
        <FileCog className="h-auto w-4 md:w-5" />
        <p className="text-xs md:text-base">Manage</p>
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/create/${category.url}`}
          className=" flex justify-center items-center gap-2 px-1 py-2 h-full w-full  hover:scale-[102%] duration-300 bg-primary rounded-lg"
        >
          {/* <category.icon className="h-auto w-6" /> */}
          <p className="text-xs md:text-base">{category.name}</p>
        </Link>
      ))}
    </nav>
  );
}
