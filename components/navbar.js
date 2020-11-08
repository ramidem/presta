export default function Navigation() {
  return (
    <>
      <div className="navbar navbar-dark bg-dark p-0">
        <div className="container">
          <span className="navbar__links navbar-text ml-auto pr-3 text-uppercase">
            <Link to="/add-car">Add Car</Link>
            <span> / </span>
            <Link to="/reservations">Reservations</Link> /{" "}
            <Link to="/logout">Logout</Link>
            <Link to="/register">Sign Up</Link> / <Link to="/login">Login</Link>
          </span>
        </div>
      </div>

      <nav className="navbar__bar navbar navbar-light bg-light shadow-sm">
        <div className="navbar__faux_bg"></div>
        <div className="container">
          <div className="col-6">
            <Link
              to="/"
              className="navbar-brand d-flex flex-column justify-content-center"
            >
              <span className="navbar__title">PRESTA</span>
              <span className="navbar__slogan m-0">car rental</span>
            </Link>
          </div>

          {/* <button */}
          {/*   className="btn btn-warning round-full border-0 mr-3" */}
          {/*   data-target="#bookNow" */}
          {/*   data-toggle="modal" */}
          {/* > */}
          {/*   Book Now */}
          {/* </button> */}
        </div>
      </nav>
      <Modal />
    </>
  );
}
