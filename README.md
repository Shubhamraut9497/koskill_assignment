# CRM Management System

This is a CRM (Customer Relationship Management) management system that allows users to perform CRUD operations on customer data, authenticate and authorize users, and implement pagination.

## Features

- User Registration: Users can create a new account by providing their details such as name, email, and password.
- User Login: Registered users can log in to the system using their email and password.
- JWT Authentication: User authentication is implemented using JSON Web Tokens (JWT) to securely authenticate and authorize users.
- Customer Management: Users can perform CRUD operations (Create, Read, Update, Delete) on customer data.
- Customer Details: When a user clicks on a customer's name, they will be redirected to a page displaying detailed information about the customer, including their image, age, email, phone number, occupation, and address.
- Pagination: The customer list is paginated to enhance the user experience when there are a large number of customers.

## Technologies Used

- Front-end: React.js, HTML, CSS
- Back-end: Node.js, Express.js
- Database: MongoDB

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/crm-management-system.git
   ```
=======
<h1>CRM Management System</h1>
This is a CRM (Customer Relationship Management) management system that allows users to perform CRUD operations on customer data, authenticate and authorize users, and implement pagination.

Features
User Registration: Users can create a new account by providing their details such as name, email, and password.
User Login: Registered users can log in to the system using their email and password.
JWT Authentication: User authentication is implemented using JSON Web Tokens (JWT) to securely authenticate and authorize users.
Customer Management: Users can perform CRUD operations (Create, Read, Update, Delete) on customer data.
Customer Details: When a user clicks on a customer's name, they will be redirected to a page displaying detailed information about the customer, including their image, age, email, phone number, occupation, and address.
Pagination: The customer list is paginated to enhance the user experience when there are a large number of customers.

<h3>Technologies Used</h3>
-Front-end: React.js, HTML, CSS
-Back-end: Node.js, Express.js
-Database: MongoDB
-Installation
-Clone the repository:

Navigate to the project directory:
cd crm-management-system

bash
Copy code
cd crm-management-system
Install dependencies for the server:

-bash
-Copy code
-npm install
-Install dependencies for the client:

-bash
-Copy code
-cd client
-npm install
-Configure the environment variables:

Create a .env file in the project root directory.
Define the following environment variables in the .env file:
REACT_APP_API_URL: The URL of the API server.
JWT_SECRET: Secret key used for JWT authentication.
Start the server and client:

In the project root directory, run:

bash
Copy code
npm run dev
This will start both the server and client concurrently.

Access the application:

Open a web browser and visit http://localhost:3000 to access the CRM management system.

## Usage

Registration:

<ul>
<li>
Usage
<h4>Registration:</h4>
Click on the "Register" link on the login page.
Fill in the registration form with the required details.
Click "Submit" to create a new user account.
Login:</li>

<li>On the login page, enter your registered email and password.
Click "Login" to authenticate yourself.
Dashboard:</li>

<li>After successful login, you will be redirected to the dashboard.
The dashboard displays a list of customers.
Use the search bar to search for specific customers by name.
Click on a customer's name to view their detailed information.
Customer Details:</li>

<li>The customer details page displays the customer's image, age, email, phone number, occupation, and address.
Edit or delete the customer using the provided options.
Navigate back to the dashboard by using the back button or the navigation menu.</li>
</ul>
License
This project is licensed under the MIT License.
