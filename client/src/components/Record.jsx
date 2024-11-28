import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Record() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    address1: "",
    address2: "",
    city: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
    email: "",
    userNotes: ""
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) {
        // If no ID is present, reset form for "Create" mode
        setIsNew(true);
        setForm({
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          address1: "",
          address2: "",
          city: "",
          postalCode: "",
          country: "",
          phoneNumber: "",
          email: "",
          userNotes: "",
        });
        return;
      }
      setIsNew(false);
      try {
        const response = await axios.get(`http://localhost:5050/users/${id}`);

        // Handle the response if successful
        const user = response.data;

        if (!user) {
          console.warn(`User with id ${id} not found`);
          navigate("/"); // Redirect to home or another page
          return;
        }

        user.dateOfBirth = new Date(user.dateOfBirth).toISOString().split('T')[0];
        setForm(user);

      } catch (error) {
        const message = `An error has occurred: ${error.response ? error.response.statusText : error.message}`;
        console.error(message);
      }

    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    const person = { ...form };

    try {
      let response;

      if (isNew) {
        // if we are adding a new user we will POST to /users.
        response = await axios.post("http://localhost:5050/users", person, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        // if we are updating a user we will PATCH to /users/:id.
        console.log("Update user");
        response = await axios.patch(`http://localhost:5050/users/${params.id}`, person, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      // Handle successful response if needed
      console.log('User data successfully saved or updated:', response.data);

    } catch (error) {
      console.error('A problem occurred adding or updating a user: ', error);
    } finally {
      // Reset the form state and navigate
      setForm({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        address1: "",
        address2: "",
        city: "",
        postalCode: "",
        country: "",
        phoneNumber: "",
        email: "",
        userNotes: ""
      });
      navigate("/");
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">
        {isNew} {isNew ? "Create" : "Update" } User Record
      </h3>
      <form
          onSubmit={onSubmit}
          className="border rounded-lg overflow-hidden p-2"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-1 border-b border-slate-900/10 md:grid-cols-2">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-2 ">

            <div className="sm:col-span-4">
              <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6 text-slate-900"
              >
                First Name
              </label>
              <div className="mt-2">
                <div
                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="John"
                      value={form.firstName}
                      onChange={(e) => updateForm({firstName: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                  htmlFor="lastName"
                  className="block text-sm font-medium leading-6 text-slate-900"
              >
                Last Name
              </label>
              <div className="mt-2">
                <div
                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Doe"
                      value={form.lastName}
                      onChange={(e) => updateForm({lastName: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium leading-6 text-slate-900"
              >
                Last Name
              </label>
              <div className="mt-2">
                <div
                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                      type="date"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="01-01-2020"
                      value={form.dateOfBirth}
                      onChange={(e) => updateForm({dateOfBirth: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium leading-6 text-slate-900"
              >
                Phone Number
              </label>
              <div className="mt-2">
                <div
                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="+1 111 111 1111"
                      value={form.phoneNumber}
                      onChange={(e) => updateForm({phoneNumber: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-slate-900"
              >
                Email
              </label>
              <div className="mt-2">
                <div
                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                      type="email"
                      name="email"
                      id="email"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="example@example.com"
                      value={form.email}
                      onChange={(e) => updateForm({email: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-2 ">

            <div className="sm:col-span-4">
              <label
                  htmlFor="address1"
                  className="block text-sm font-medium leading-6 text-slate-900"
              >
                Address Line 1
              </label>
              <div className="mt-2">
                <div
                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                      type="text"
                      name="address1"
                      id="address1"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="123 Sample Street"
                      value={form.address1}
                      onChange={(e) => updateForm({address1: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                  htmlFor="address2"
                  className="block text-sm font-medium leading-6 text-slate-900"
              >
                Address Line 2
              </label>
              <div className="mt-2">
                <div
                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                      type="text"
                      name="address2"
                      id="address2"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="456 District"
                      value={form.address2}
                      onChange={(e) => updateForm({address2: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-slate-900"
              >
                City
              </label>
              <div className="mt-2">
                <div
                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                      type="text"
                      name="city"
                      id="city"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Ottawa"
                      value={form.city}
                      onChange={(e) => updateForm({city: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium leading-6 text-slate-900"
              >
                Postal Code
              </label>
              <div className="mt-2">
                <div
                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                      type="text"
                      name="postalCode"
                      id="postalCode"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="AAA BBB"
                      value={form.postalCode}
                      onChange={(e) => updateForm({postalCode: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-slate-900"
              >
                Country
              </label>
              <div className="mt-2">
                <div
                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                      type="text"
                      name="country"
                      id="country"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Canada"
                      value={form.country}
                      onChange={(e) => updateForm({country: e.target.value})}
                  />
                </div>
              </div>
            </div>

          </div>

          <div className="col-span-2 p-4 text-center">
            <label
                htmlFor="userNotes"
                className="block text-sm font-medium leading-6 text-slate-900"
            >
              User Notes
            </label>
            <div className="mt-2">
              <div
                  className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
          <textarea
              name="userNotes"
              id="userNotes"
              rows="4"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Enter your notes here"
              value={form.userNotes}
              onChange={(e) => updateForm({userNotes: e.target.value})}
          />
              </div>
            </div>
          </div>
        </div>
        <input
            type="submit"
            value="Save User Record"
            className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input
              text-white bg-blue-600 hover:bg-blue-500 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />

        {params.id !== undefined && (
          <button
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input
                        text-white bg-red-600 hover:bg-red-500 hover:text-accent-foreground h-9 rounded-md px-3"
            color="red"
            type="button"
            onClick={async () => {
              if (confirm("Are you sure you want to remove it?")) {
                try {
                  const response = await axios.delete(`http://localhost:5050/users/${params.id}`);

                  if (response.status === 200) {
                    // Redirect to index after successful deletion
                    window.location.href = "/";
                  } else {
                    alert("Failed to delete. Please try again.");
                  }
                } catch (error) {
                  console.error("Error during delete request:", error);
                  alert("An error occurred. Please try again.");
                }
              }
            }}
          >
            Delete
          </button>
        )}
      </form>
    </>
  );
}
