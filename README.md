# Node.js Project Management System API

This project is a RESTful API built with Node.js, designed to manage users, projects, tasks, and comments. It can be used for an open-source coding platform, for example. The application uses JWT for authentication, Mongoose as the ORM for database operations and MongoDB Atlas as the database service. It includes various features like CRUD operations, data validation, and error handling.

Features:
- CRUD operations for users, projects, tasks, and comments.
- JWT-based authentication for private routes.
- Data persistence using MongoDB Atlas with Mongoose ORM.
- Request validation and error handling middleware.
- Public and private routes.
- Optional advanced features: filtering, sorting, pagination, transactions, custom middleware, advanced authentication (role-based access control), image upload, and cloud deployment.

## Technologies Used:

- Backend Framework: Node.js with Express.js for handling API requests and middleware.
- Authentication: JWT for secure authentication and authorization.
- Database: MongoDB Atlas for flexible and scalable data storage.
- Testing: Jest for unit testing to ensure code quality and reliability.
- Documentation: Swagger for creating a comprehensive and interactive API documentation.

## Setup intructions:
1. Clone the Repository: git clone <repository_url>
2. Install Dependencies: npm install
3. Set Environment Variables (e.g. database connection details, JWT secret)
5. Start the Server: npm start

## ENV variables

Replace in the `nodemon.json` file with the following ENV variables:
```
{
    "env": {
        "MONGO_ATLAS_PW": <password>,
        "JWT_KEY": <secret>
    }
}
```

## DB diagram
![DatabaseDiagram](https://github.com/anamariapanait10/ProjectManagementRESTAPI/blob/main/db_diagram.png)

## Aplication flows
The user registers into the application, then he can see all the projects, tasks and comments on the platform. He can see the tasks for a specific project or the comments for a specific task. He can also leave comments on tasks.

## API Documentation
I used Swagger for creating a comprehensive and interactive API documentation. You can access the documentation by running the server and going to `http://localhost:3000/api-docs`.

## Flow Chart Diagram
![FlowChartDiagram](https://github.com/anamariapanait10/ProjectManagementRESTAPI/blob/main/FlowChartDiagram.png)

## Tests

There are 6 unit tests made usisng `Jest` for testing the project's endpoints functionality. To run the tests use the `npm test` command.

## Middleware
- Request Validation: Middleware for validating request payloads and parameters.
- Error Handling: Middleware for handling errors globally.
- Authentication: Middleware for verifying JWT tokens and protecting private routes.