import { categories } from "@/constants";

export default function Home() {
  return (
    <main className="p-2 max-w-7xl w-full flex flex-col justify-center items-center gap-2">
      <div className="w-full flex justify-center items-center bg-[url('/card2.jpg')] bg-cover bg-no-repeat bg-center bg-origin-border h-[350px] md:h-[500px] rounded-xl mb-40">
        <div className="relative flex flex-col justify-center items-center bg-primary/20 hover:bg-primary/0 duration-300 w-full h-full rounded-xl">
          <h1 className="font-bold text-center text-xl sm:text-3xl md:text-4xl lg:text-5xl uppercase p-2 bg-secondary/80 hover:scale-110 duration-500 rounded-xl tracking-wide cursor-default">
            holidays <br />
            await you
          </h1>
          <ul className="absolute bottom-[-80px] sm:bottom-[-45px] md:bottom-[-50px] w-full h-auto flex gap-1 md:gap-2 justify-center lg:justify-around items-center rounded-xl p-2 flex-wrap">
            {categories.map((category) => (
              <li
                key={category.id}
                className="w-[140px] sm:w-[150px] md:w-[180px] lg:w-[220px] px-4 bg-secondary/80 rounded-xl flex flex-col justify-around items-center cursor-default hover:scale-105
                duration-300 hover:font-bold"
              >
                <div className="flex-1">
                  <category.icon className="w-[30px] sm:w-[35px] md:w-[40px] lg:w-[45px] h-auto py-1 md:py-2 " />
                </div>
                <p className="flex justify-center items-center text-center flex-1 uppercase text-xs sm:text-sm md:text-base lg:text-xl py-2 ">
                  {category.name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="">cards</div>
    </main>
  );
}
