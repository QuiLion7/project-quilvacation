import NavDesktop from "./components/navDesktop";
import NavMobile from "./components/navMobile";

const Header = () => {
  return (
    <div className="fixed top-0 bg-secondary/80 left-0 shadow-xl z-50 w-full flex items-center justify-center border-y">
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
