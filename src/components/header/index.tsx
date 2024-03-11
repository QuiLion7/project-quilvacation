import NavMobile from "./components/mobile";
import NavDesktop from "./components/desktop";

const Header = () => {
  return (
    <div className="w-full flex items-center border-y">
      <nav className="md:hidden flex w-full">
        <NavMobile />
      </nav>
      <nav className="hidden md:flex w-full">
        <NavDesktop />
      </nav>
    </div>
  );
};

export default Header;
