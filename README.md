# Banking Management System

## Project Overview

The Banking Management System is a robust and scalable backend application designed to handle the core operations of a banking institution. This system provides functionalities for managing customer accounts, processing transactions, handling loans, and generating financial reports. Built using Node.js and Express, it leverages modern web development practices to ensure efficiency, security, and ease of use.

## Features

- **Customer Management**: Create, update, and manage customer profiles and their associated bank accounts.
- **Account Management**: Support for different types of accounts such as savings, checking, and fixed deposits.
- **Transaction Processing**: Handle deposits, withdrawals, transfers, and payments with secure transaction logging.
- **Loan Management**: Manage loan applications, approvals, repayments, and interest calculations.
- **Authentication and Authorization**: Secure login and role-based access control to ensure data privacy and security.
- **Financial Reporting**: Generate detailed financial reports, including account statements and transaction histories.
- **Error Handling and Logging**: Comprehensive error handling and logging mechanisms to ensure system reliability and maintainability.
- **Environment Configurations**: Configuration of sensitive data through environment variables for enhanced security.
- **Future Enhancements**: Upcoming features include online payment routes and additional functionalities to enhance the banking experience.

## Technologies Used

- **bcrypt** and **bcryptjs**: Hashing libraries for securely storing passwords.
- **cloudinary**: Cloud-based service for managing and serving images and other media files.
- **cookie-parser**: Middleware for parsing cookies attached to the client request object.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.js.
- **dotenv**: Module for loading environment variables from a `.env` file into `process.env`.
- **express**: Fast, unopinionated, minimalist web framework for Node.js.
- **jsonwebtoken**: Implementation of JSON Web Tokens (JWT) for secure authentication between parties.
- **mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.
- **multer**: Middleware for handling multipart/form-data, primarily used for uploading files.
- **oracledb**: Official Node.js driver for Oracle Database.

# Installation and Setup

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB instance running locally or remotely.

## 1. Clone the Repository:\*\*

### Steps

```
git clone https://github.com/TechWithChhotu/BankingManagementSystem.git
```

```
 cd BankingManagementSystem
```

```
npm install
```

Create a .env file in the backend directory and add your configuration settings (excluding this file from version control):

```
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
PORT=your-port


ORACLE_USERNAME=username
ORACLE_PASSWORD=password
ORACLE_CONNECTION_STRING=connection_string


CLOUDINARY_CLOUD_NAME=name
CLOUDINARY_API_KEY=API_Key
CLOUDINARY_API_SECRET=API_Secret
```

run backend server

```
cd backend
```

```
npm start
```

# Login Functionality

This document provides a detailed explanation of the customer login functionality for the "Bank of Bihar" application. The login process supports both employees and customers, utilizing OTP (One-Time Password) verification for customers to ensure secure authentication.

## Table of Contents

- Dependencies
- Endpoint
- Request Body
- Response
- Flow
- Error Handling
- Example

## Dependencies

Ensure you have the following dependencies installed:

- express
- mongoose
- redis
- util

## Endpoint

### POST /login

- This endpoint is used for logging in a customer or an employee.

## Request Body

### The request body should contain the following fields:

- phone (string): The phone number of the user.
- password (string): The password of the user.
- lp (string): Login pin (optional).
- branchId (string): The branch ID if the user is an employee (optional).
- otp (string): The One-Time Password for - - customer login verification (optional).

## Response

### Success Response for Employee Login

```
{
  "success": true,
  "message": "Login successfully",
  "data": {
    // Employee data
  }
}
```

### Success Response for OTP Sent

```
{
  "success": true,
  "msg": "OTP sent to phone, linked with aadhar"
}
```

### Success Response for Customer Login

```
{
  "success": true,
  "message": "Login successfully",
  "data": {
    // Customer data
  }
}
```

### Error Response

```
{
  "success": false,
  "msg": "Login failed, Data not found!"
}
```

```
{
  "success": false,
  "msg": "Failed to send OTP"
}
```

```
{
  "success": false,
  "message": "Invalid or expired OTP"
}
```

```
{
  "success": false,
  "message": "Server error"
}
```

## Flow

### Check for Employee Login:

- If branchId is provided, attempt to find the employee by phone number.
- If found, generate a token and set it in a cookie.
- Respond with a success message and employee data.
- If not found, respond with an error message.

### Check for Customer Login:

- Attempt to find the customer by phone number and password.
- If found, proceed with OTP verification.
- - If otp is not provided, generate and send an OTP to the customer's phone number linked with Aadhaar.
- - Store the OTP in Redis with a 5-minute expiration.
- - Respond with a message indicating that the OTP has been sent.
- - If otp is provided, retrieve the stored OTP from Redis.
- - - If the OTP matches, delete it from Redis, generate a token, set it in a cookie, and respond with a success message and customer data.
- - - If the OTP does not match, respond with an error message indicating invalid or expired OTP.
- If the customer is not found, respond with an error message.

## Error Handling

### The application handles various error scenarios:

- If an employee or customer is not found, a 404 status code is returned with an appropriate message.
- If OTP sending fails, a 500 status code is returned.
- If OTP validation fails, a 400 status code is returned with a message indicating an invalid or expired OTP.
- Any server errors are caught and returned with a 400 status code and the error message.

## Example

### Request

```
{
  "phone": "1234567890",
  "password": "customer_password"
}
```

### Response (OTP Sent)

```
{
  "success": true,
  "msg": "OTP sent to phone, linked with aadhar"
}
```

### Request (With OTP)

```
{
  "phone": "1234567890",
  "password": "customer_password",
  "otp": "123456"
}
```

### Response (Successful Login)

```
{
  "success": true,
  "message": "Login successfully",
  "data": {
    // customer data
  }
}
```

### Employee Login Request

```
{
  "phone": "9876543210",
  "branchId": "branch_123",
  "password":"786554"
}
```

### Successful Employee Login Response

```
{
  "success": true,
  "message": "Login successfully",
  "data": {
    //  employee data
  }
}
```

# Frontend (UI)

## Login Component

The Login component in React handles user authentication by providing a login form with username and password fields, an optional OTP input, and a virtual keyboard. The component integrates with a backend API to verify user credentials and OTP.

### Dependencies

install required dependencies

```
npm install react react-dom react-router-dom axios react-toastify react-simple-keyboard
```

### Virtual Keyboard

Toggle Virtual Keyboard: Enable/disable the virtual keyboard using the provided checkbox.
Customize Layout: Adjust the virtual keyboard layout by modifying the layoutName state and the Keyboard component's props.

### Generate QR of respective A/C

### Scan QR pay payment

### Other helper method

# Some Modification in Backend

# Check Balance

# See Transaction Records

# Contributing

Contributions are welcome! Please fork this repository and submit pull requests for any features, improvements, or bug fixes.

# License

This project is licensed under the MIT License. See the LICENSE file for more details.

# Contact

For any inquiries or issues, please contact [ techwithchhotu2022@gmail.com , chhotustudymail@gmail.com] or visit [https://chhotupatel.netlify.app/]
