import HomeButtons from "@/components/homeButtons";
import { ShowItems } from "@/components/showItems";
import TitleAnimation from "@/components/titleAnimated";

export default function Home() {
  return (
    <main className="mt-[57px] max-w-7xl w-full flex flex-col justify-center items-center gap-2 p-2 rounded-xl">
      <div className="w-full flex justify-center items-center bg-[url('/bg.jpg')] bg-cover bg-no-repeat bg-center h-[350px] md:h-[530px] rounded-xl">
        <div className="flex justify-center items-center w-full h-full">
          <TitleAnimation />
        </div>
      </div>
      <HomeButtons />
      <div className="flex h-full w-full flex-col items-center justify-center mb-10">
        <ShowItems />
      </div>
    </main>
  );
}
