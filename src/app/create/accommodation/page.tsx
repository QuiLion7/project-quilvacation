import FormAccommodation from "@/components/formAccommodation";

export default function Accommodation() {
  return (
    <main className="flex h-full w-full flex-col items-center justify-center p-2">
      <h1 className="uppercase font-bold text-sm sm:text-base md:text-lg lg:text-2xl my-5">
        Create Accommodation
      </h1>
      <FormAccommodation />
    </main>
  );
}
