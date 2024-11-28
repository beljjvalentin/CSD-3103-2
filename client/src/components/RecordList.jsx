import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import CustomCellComponent from "./CustomCellComponent.jsx";
import axios from 'axios';

const AddressCellRenderer = (props) => {
  const { address1, address2 } = props.data; // Access address1 and address2 from props.data
  return (
    <div>
      <p>{address1} {address2}</p>
    </div>
  );
};

// PropTypes validation
AddressCellRenderer.propTypes = {
  data: PropTypes.shape({
    address1: PropTypes.string,
    address2: PropTypes.string,
  }).isRequired,
};

export default function RecordList() {
  const [records, setRecords] = useState([]);

  const columnDefs = [
    {
      field: 'actions',
      headerName: 'Actions',
      cellRenderer: CustomCellComponent,
      cellRendererParams: {
        deleteRecord: deleteRecord,
      },
    },
    { headerName: "First Name", field: "firstName", sortable: true, filter: true },
    { headerName: "Last Name", field: "lastName", sortable: true, filter: true },
    { headerName: "Date of Birth", field: "dateOfBirth", sortable: true, filter: true },
    { headerName: "Address", field: "address1", sortable: true, filter: true,
      cellRenderer: (params) => {
        // Directly use AddressCellRenderer component here
        return <AddressCellRenderer data={params.data} />;
      }
    },
    { headerName: "City", field: "city", sortable: true, filter: true },
    { headerName: "Postal Code", field: "postalCode", sortable: true, filter: true },
    { headerName: "Country", field: "country", sortable: true, filter: true },
    { headerName: "Phone Number", field: "phoneNumber", sortable: true, filter: true },
    { headerName: "Email", field: "email", sortable: true, filter: true },
    { headerName: "Notes", field: "userNotes", sortable: true, filter: true },
  ];

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      try {
        const response = await axios.get('http://localhost:5050/users/');
        setRecords(response.data);
      } catch (error) {
        console.error('An error occurred:', error.message);
      }
    }
    getRecords();
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    try {
      await axios.delete(`http://localhost:5050/users/${id}`);
      const newRecords = records.filter((el) => el._id !== id);
      setRecords(newRecords);
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  }

  // This following section will display the table with the records of individuals.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Users Records</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <div className="ag-theme-alpine" style={{height: 500, width: "100%"}}>

            <AgGridReact
              rowData={records}
              columnDefs={columnDefs}

              frameworkComponents={{
                CustomCellComponent: CustomCellComponent,
              }}
              pagination={true}
              paginationPageSize={20}
              className="ag-theme-alpine"
              style={{ height: "500px", width: "100%" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
