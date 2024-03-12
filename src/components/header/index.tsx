import NavMobile from "./components/mobile";
import NavDesktop from "./components/desktop";

const Header = () => {
  return (
    <div className="w-full flex items-center justify-center border-y">
      <nav className="md:hidden flex w-full items-center justify-center">
        <NavMobile />
      </nav>
      <nav className="hidden md:flex w-full items-center justify-center">
        <NavDesktop />
      </nav>
    </div>
  );
};

export default Header;
