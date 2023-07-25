import React, { useState } from "react";
import { Navigate } from "react-router-dom";

function CreateNewUser() {
  // Define state variables to store form input values
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [occupation, setOccupation] = useState("");
  const [phoneNo, setPhone] = useState("");
  const [file, setFile] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  // Function to handle form submission
  const submitForm = async (e) => {
    e.preventDefault();

    // Create a new FormData object to hold form data including the file
    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("age", age);
    formData.append("occupation", occupation);
    formData.append("phoneNo", phoneNo);
    formData.append("file", file);

    // Set up request options for the fetch API
    const requestOptions = {
      method: "POST",
      body: formData,
      credentials:"include",
    };

    try {
      // Make a POST request to the server with the form data
      const response = await fetch(`${apiUrl}/createNewUser`, requestOptions);
      if (response.ok) {
        // If the request is successful, show an alert and set the redirect state to true
        alert("Create User Successfully");
        setRedirect(true);
      } else {
        // If the request fails, show an error alert
        alert("Failed to create new user");
      }
    } catch (error) {
      // Handle any errors that occur during the fetch request
      console.error("Error:", error);
    }
  };

  // If redirect state is true, navigate to the home page ("/") using the Navigate component from react-router-dom
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    // Form to capture user details and file upload
    <form className="login" onSubmit={submitForm}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        type="text"
        placeholder="phone No."
        value={phoneNo}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="text"
        placeholder="occupation"
        value={occupation}
        onChange={(e) => setOccupation(e.target.value)}
      />
      <input
        type="text"
        placeholder="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type="file"
        style={{color:"black"}} // Optional styling for the file input
        onChange={(e) => setFile(e.target.files[0])} // Update the file state when a file is selected
      />
      <button>Add new User</button>
    </form>
  );
}

export default CreateNewUser;
