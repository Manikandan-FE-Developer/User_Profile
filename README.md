# User Profile

This project is a user profile management system where users can register, log in, and update their profile information, including profile pictures. The front-end is built with React, and the back-end is built with Express.js and MongoDB.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Features

- User registration and login
- Profile update with profile picture upload
- Form validation for email and password
- User authentication
- Persistent user session using localStorage
- Responsive design

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/user-profile.git
    cd user-profile
    ```

2. Install dependencies for both the client and server:
    ```sh
    cd client
    npm install
    cd ../server
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the `server` directory and add the following:
    ```sh
    PORT=8000
    MONGODB_URI=your_mongodb_connection_string
    ```

4. Start the MongoDB server (if not already running):
    ```sh
    mongod
    ```

### Usage

1. Start the server:
    ```sh
    cd server
    npm start
    ```

2. Start the client:
    ```sh
    cd client
    npm start
    ```

3. Open your browser and navigate to:
    ```
    http://localhost:3000
    ```

## API Endpoints

### User Registration

- **URL**: `/api/v1/register`
- **Method**: `POST`
- **Body**:
    ```json
    {
        "firstname": "John",
        "lastname": "Doe",
        "email": "john.doe@example.com",
        "password": "password123"
    }
    ```

### User Login

- **URL**: `/api/v1/login`
- **Method**: `POST`
- **Body**:
    ```json
    {
        "email": "john.doe@example.com",
        "password": "password123"
    }
    ```

### Update User

- **URL**: `/api/v1/updateUser`
- **Method**: `PUT`
- **Body**:
    ```json
    {
        "firstname": "Will",
        "lastname": "Doe",
        "email": "will.doe@example.com",
        "password": "newpassword123"
    }
    ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## My Details

Name: D. Manikandan
Email: manikandan151020@gmail.com
Phone: 6384614956
