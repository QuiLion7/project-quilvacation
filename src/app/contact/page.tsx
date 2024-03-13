import FormContact from "@/components/formContact";

export default function Contact() {
  return (
    <main className="flex h-full w-full flex-col items-center justify-center p-2">
      <h1 className="uppercase font-bold text-sm sm:text-base md:text-lg lg:text-2xl my-5">
        Contact
      </h1>
      <FormContact />
    </main>
  );
}
