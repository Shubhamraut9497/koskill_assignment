import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

function Customers({ _id, name, age, occupation, createdAt, phoneNo, onDelete }) {
  // The Customers component represents a single row in the table displaying customer details.
  // It receives customer information as props (_id, name, age, occupation, createdAt, phoneNo) and a function onDelete.

  // The handleDelete function is called when the "Delete" button is clicked.
  const handleDelete = async () => {
    // Call the onDelete function, which is passed as a prop from the parent component.
    onDelete();
  };

  return (
    <tr>
      {/* Render the customer's name as a clickable link to view the details */}
      <td>
        <Link to={`/createNewUser/${_id}`} style={{ textDecoration: "none", color: "white" }}>
          {name}
        </Link>
      </td>
      {/* Render the customer's age */}
      <td>{age}</td>
      {/* Render the customer's occupation */}
      <td>{occupation}</td>
      {/* Format and render the creation date of the customer */}
      <td>{format(new Date(createdAt), "MMM d yyyy HH:mm")}</td>
      {/* Render the customer's phone number */}
      <td>{phoneNo}</td>
      <td>
        {/* Render the "Delete" button and attach the handleDelete function to its onClick event */}
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default Customers;
