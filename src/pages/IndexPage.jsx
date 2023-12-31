import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import Customers from "../components/Customers";

function IndexPage() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [searchQuery, setSearchQuery] = useState("");
console.log(currentPage);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${apiUrl}/createNewUser?search=${searchQuery}&limit=5&skip=${(currentPage - 1) * 5}&page=${currentPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setCustomers(data.customers);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  fetchData();
}, [searchQuery, currentPage]);

  const handleDeleteCustomer = async (customerId) => {
    try {
      const response = await fetch(`${apiUrl}/createNewUser/${customerId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("User deleted:", customerId);
        // Remove the deleted customer from the list
        setCustomers((prevCustomers) =>
          prevCustomers.filter((customer) => customer._id !== customerId)
        );
      } else {
        console.error("Failed to delete user:", customerId);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handlePageChange = (page) => {
    // Ensure the page number is within the valid range
    if (page >= 1 && page <= totalPages) {
      setCurrentPage((prevPage) => (prevPage === page ? prevPage : page));
    }
  };
  

  const renderPagination = () => {
    if (totalPages > 1) {
      const paginationItems = [];
      for (let i = 1; i <= totalPages; i++) {
        paginationItems.push(
          <span
            key={i}
            className={currentPage === i ? "active" : "pagination-button"}
            onClick={() => handlePageChange(i)}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              cursor: "pointer",
              marginTop:"20px",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "5px",
              background: currentPage === i ? "blue" : "black",
              border: "1px solid black",
            }}
          >
            {i}
          </span>
        );
      }
      return <div className="pagination" style={{ display: "flex", justifyContent: "center",marginTop:"20px" }}>{paginationItems}</div>;
    }
    return null;
  };
  
  
  
  

  return (
    <div style={{ marginTop: "30px" }}>
      <div style={{ marginBottom: "50px" }}>
        <input
          type="text"
          placeholder="Search User"
          className="search_user"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {loading ? (
        <div className="post-loading-wrapper" style={{ marginTop: "50px" }}>
          <div className="post-loading">
            <div className="image">
              <Skeleton
                width="100%"
                height={200}
                style={{ marginBottom: "20px" }}
              />
            </div>
            <div className="texts">
              <Skeleton
                width="80%"
                height={24}
                style={{ marginBottom: "15px" }}
              />
              <div className="info">
                <Skeleton
                  width="40%"
                  height={16}
                  style={{ marginRight: "10px" }}
                />
                <Skeleton width="30%" height={16} />
              </div>
              <Skeleton
                count={3}
                width="100%"
                height={16}
                style={{ marginBottom: "20px" }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          {customers && customers.length > 0 ? (
            <table className="customers-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Occupation</th>
                  <th>Created At</th>
                  <th>Phone Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <Customers
                    key={customer._id}
                    {...customer}
                    onDelete={() => handleDeleteCustomer(customer._id)}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: "white" }}>No customers found.</p>
          )}
          
        </div>
      )}
      {renderPagination()}
    </div>
  );
}

export default IndexPage;
