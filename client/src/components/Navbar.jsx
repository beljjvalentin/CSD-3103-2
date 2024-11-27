import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="flex justify-between items-center mb-6 w-full">
        <NavLink to="/">
          <h1 className="text-xl"><b>Users App</b></h1>
        </NavLink>

        <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input
            text-white bg-green-600 hover:bg-green-500 h-9 rounded-md px-3"
                 to="/create">
          Create New User
        </NavLink>
      </nav>
    </div>
  );
}