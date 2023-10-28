# Alx Portfolio Project  -- Backend -- using Nodejs + Prisma ORM

## installing dependecies Using yarn (recommended)
1- yarn | npm i

The main idea of the project is manage Task Manager with capbility add tasks to projects and tasks without project assign to user
# USER HANDLER
## Table of Contents
- [Signup](#signup)
- [Signin](#signin)
- [Update User](#update-user)
- [Get User](#get-user)
- [Get Users](#get-users)
- [Delete User](#delete-user)

---

### Signup

The `signup` function handles the registration of new users. It expects a POST request with a JSON body containing `name`, `email`, and `password`. It then creates a new user record in the database, hashes the password, and returns a token along with user data.

**Endpoint:** `/signup`
**HTTP Method:** POST

### Signin

The `signin` function is responsible for user login. It expects a POST request with a JSON body containing `email` and `password`. It retrieves the user from the database, validates the password, and returns a token along with user data upon successful authentication.

**Endpoint:** `/signin`
**HTTP Method:** POST

### Update User

The `updateUser` function allows updating a user's information. It expects a PATCH request with a user ID parameter in the URL and a JSON body containing `name`. The function updates the user's name and returns the updated user data.

**Endpoint:** `/users/:id`
**HTTP Method:** PATCH

### Get User

The `getUser` function retrieves a user's information based on their authentication token. It expects a GET request and returns the user's data.

**Endpoint:** `/user`
**HTTP Method:** GET

### Get Users

The `getUsers` function retrieves a list of all users. It expects a GET request and returns an array of user objects.

**Endpoint:** `/users`
**HTTP Method:** GET

### Delete User

The `deleteUser` function allows an administrator to delete a user. It first checks if the user making the request has the necessary administrative privileges. If so, it deletes the user with the specified ID and returns the deleted user's data.

**Endpoint:** `/users/:id`
**HTTP Method:** DELETE

---
# PROJECT HANDLER
## Table of Contents
- [Create Project](#create-project)
- [Update Project](#update-project)
- [Get Projects](#get-projects)
- [Get Project](#get-project)
- [Delete Project](#delete-project)

---

### Create Project

The `createProject` function handles the creation of new projects. It expects a POST request with a JSON body containing `name`, `description`, and `status`. It associates the project with the currently authenticated user and then returns the newly created project.

**Endpoint:** `/projects`
**HTTP Method:** POST

### Update Project

The `updateProject` function allows updating project information. It expects a PATCH request with a project ID parameter in the URL and a JSON body containing `name`, `description`, and `status`. The function updates the project's details and returns the updated project data.

**Endpoint:** `/projects/:id`
**HTTP Method:** PATCH

### Get Projects

The `getProjects` function retrieves a list of projects associated with the currently authenticated user. It expects a GET request and returns an array of project objects.

**Endpoint:** `/projects`
**HTTP Method:** GET

### Get Project

The `getProject` function retrieves the details of a specific project. It expects a GET request with the project ID parameter in the URL and returns the project's data.

**Endpoint:** `/projects/:id`
**HTTP Method:** GET

### Delete Project

The `deleteProject` function allows the deletion of a project. It expects a DELETE request with the project ID parameter in the URL. If the project is found and deleted successfully, it returns the deleted project's data.

**Endpoint:** `/projects/:id`
**HTTP Method:** DELETE

---
# TASKS HANDLER
## Table of Contents
- [Create Task](#create-task)
- [Get Tasks](#get-tasks)
- [Get Task](#get-task)
- [Update Task](#update-task)
- [Delete Task](#delete-task)

---

### Create Task

The `createTask` function handles the creation of new tasks. It expects a POST request with a JSON body containing `name`, `description`, `status`, and optionally `projectId`. It associates the task with the currently authenticated user and, if specified, with a project. It then returns the newly created task.

**Endpoint:** `/tasks`
**HTTP Method:** POST

### Get Tasks

The `getTasks` function retrieves a list of tasks associated with the currently authenticated user. It expects a GET request and returns an array of task objects.

**Endpoint:** `/tasks`
**HTTP Method:** GET

### Get Task

The `getTask` function retrieves the details of a specific task. It expects a GET request with the task ID parameter in the URL and returns the task's data.

**Endpoint:** `/tasks/:id`
**HTTP Method:** GET

### Update Task

The `updateTask` function allows updating task information. It expects a PATCH request with a task ID parameter in the URL and a JSON body containing `name`, `description`, and `status`. The function updates the task's details and returns the updated task data.

**Endpoint:** `/tasks/:id`
**HTTP Method:** PATCH

### Delete Task

The `deleteTask` function allows the deletion of a task. It expects a DELETE request with the task ID parameter in the URL. If the task is found and deleted successfully, it returns the deleted task's data.

**Endpoint:** `/tasks/:id`
**HTTP Method:** DELETE

---

These API handler functions provide essential task management functionality for your application. Make sure your routes are correctly set up to map to these functions. Additionally, consider adding proper authentication and authorization mechanisms to secure these endpoints as per your application's requirements.
