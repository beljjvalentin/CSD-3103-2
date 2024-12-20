import { NavLink } from "react-router-dom";
import axios from "axios";

export default function Navbar() {

  const handleClick = async () => {
    try {
      const response = await axios.post('http://localhost:5050/users/populate', {}, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Handle the response
      if (response.status === 200) {
        window.location.reload();
        alert(response.data.message); // Success message
      } else {
        throw new Error('Failed to populate users');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error populating users');
    }
  };


  return (
    <div>
      <nav className="flex justify-between items-center mb-6 w-full">
        <NavLink to="/">
          <h1 className="text-xl"><b>Users App</b></h1>
        </NavLink>

        <div>
          <button
            onClick={handleClick}
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input text-white bg-orange-600 hover:bg-orange-500 h-9 rounded-md px-3"
          >
            Populate Users
          </button>

          <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input
            text-white bg-green-600 hover:bg-green-500 h-9 rounded-md px-3"
                   to="/create">
            Create New User
          </NavLink>
        </div>

      </nav>
    </div>
  );
}
