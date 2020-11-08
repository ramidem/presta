import Link from "next/link";
import Navlinks from "./navlinks";

function Navigation() {
  return (
    <>
      <Navlinks />
      <nav className="navbar__bar navbar navbar-light bg-light shadow-sm">
        <div className="navbar__faux_bg"></div>
        <div className="container">
          <div className="col-6">
            <Link href="/">
              <a className="navbar-brand d-flex flex-column justify-content-center">
                <span className="navbar__title">PRESTA</span>
                <span className="navbar__slogan m-0">car rental</span>
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Navigation;
