import Link from "next/link";

function Navlinks() {
  return (
    <div className="navbar navbar-dark bg-dark p-0">
      <div className="container">
        <span className="navbar__links navbar-text ml-auhref pr-3 text-uppercase">
          <Link href="/addcar">
            <a>Add Car</a>
          </Link>
          <span> / </span>
          <Link href="/reservations">
            <a>Reservations</a>
          </Link>
          <span> / </span>
          <Link href="/logout">
            <a>Logout</a>
          </Link>
          <span> / </span>
          <Link href="/signup">
            <a>Sign Up</a>
          </Link>
          <span> / </span>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Navlinks;
