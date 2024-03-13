import { HeaderCreate } from "./components/header";

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderCreate />
      {children}
    </>
  );
}
