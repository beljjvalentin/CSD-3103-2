// Valentin Belii c0886610
// CSD-3102 Full Stack JavaScript
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="w-full p-5">
      <Navbar />
      <Outlet />
    </div>
  );
};
export default App;
