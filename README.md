# Node.js Project Management System API

This project is a RESTful API built with Node.js, designed to manage users, projects, tasks, and comments. It can be used for an open-source coding platform, for example. The application uses JWT for authentication, Mongoose as the ORM for database operations and MongoDB Atlas as the database service. It includes various features like CRUD operations, data validation, and error handling.

Features:
- CRUD operations for users, projects, tasks, and comments.
- JWT-based authentication for private routes.
- Data persistence using MongoDB Atlas with Mongoose ORM.
- Request validation and error handling middleware.
- Public and private routes.
- Optional advanced features: filtering, sorting, pagination, transactions, custom middleware, advanced authentication (role-based access control), image upload, and cloud deployment.

Core Features:

- User Authentication and Authorization: Secure signup and login processes, with support for JWT for secure token-based user authentication. Implement role-based access control to differentiate between regular users and administrators, ensuring that users can only access and modify their tasks and projects.

- Task Management: Enable users to create, read, update, and delete (CRUD) tasks. Tasks can include details such as title, description, due date, priority level (e.g., high, medium, low), and status (e.g., pending, in progress, completed).

- Project Organization: Allow users to group tasks into projects. Each project can have its own set of tasks, making it easier to organize and manage related activities. Implement features to add, update, delete, and list all projects.

- Collaboration: Facilitate collaboration by allowing users to assign tasks to other registered users. Include functionality for commenting on tasks to enable communication between team members within the platform.

- Advanced Filtering and Search: Provide advanced filtering options, allowing users to view tasks by status, priority, due date, or assigned user. Include a search feature for users to quickly find specific tasks or projects by keywords.

## Technologies Used:

- Backend Framework: Node.js with Express.js for handling API requests and middleware.
- Authentication: JWT for secure authentication and authorization.
- Database: MongoDB for flexible and scalable data storage.
- Testing: Mocha and Chai for unit and integration testing to ensure code quality and reliability.
- Documentation: Swagger or Postman for creating a comprehensive and interactive API documentation.

## Setup intructions:
1. Clone the Repository: git clone <repository_url>
2. Install Dependencies: npm install
3. Set Environment Variables: Create a .env file with necessary environment variables (e.g., database connection details, JWT secret).
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
The user registers into the application, then he can see all the projects on the platform and all the tasks assigned to him. He can also leave comments on tasks and see all his comments.

## API Documentation

## Flow Chart Diagram
![FlowChartDiagram](https://github.com/anamariapanait10/ProjectManagementRESTAPI/blob/main/FlowChartDiagram.png)

## Tests

There are 6 unit tests made usisng `Jest` for testing the project's endpoints functionality. To run the tests use the `npm test` command.