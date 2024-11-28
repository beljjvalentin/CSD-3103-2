import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CustomCellComponent = (props) => {
  const { data, deleteRecord } = props; // Access the row's data

  return (
    <div>
      <Link className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input
                        text-white bg-blue-600 hover:bg-blue-500 h-9 rounded-md px-3"
            to={`/edit/${data._id}`}
      >
        Edit
      </Link>
      <button
        className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input
                        text-white bg-red-600 hover:bg-red-500 hover:text-accent-foreground h-9 rounded-md px-3"
        onClick={async() => {
          //if (confirm("Are you sure you want to delete?")) {
            deleteRecord(data._id); // Use the function here
          //}
        }}
      >
        Delete
      </button>
    </div>
  );
};

CustomCellComponent.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired, // Ensure 'user' itself is required
  deleteRecord: PropTypes.func,
};

export default CustomCellComponent;