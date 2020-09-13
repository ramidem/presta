import React from "react";
import Navbar from "./components/partials/Navbar";
import SideBarNav from "./components/partials/SideBarNav";

function App() {
  return (
    <div>
      {/* display on mobile only */}
      <Navbar />
      <SideBarNav />
    </div>
  );
}

export default App;
