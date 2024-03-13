import NavDesktop from "../navDesktop";
import NavMobile from "../navMobile";

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
