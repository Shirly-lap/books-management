# books-management
  A book management system that allows performing CRUD (Create, Read, Update, Delete) operations on a book database. This project includes user authentication 
  and book management operations through a RESTful API.

## Table of Contents

  1. Features
  2. Technologies Used
  3. Installation
  4. Project Structure
  5. Contributing
  6. License

## Features
1. User Authentication: Allows users to log in to access book management functionalities.
2. Book Management: Users can create, read, update, and delete books.
3. Pagination: Retrieve books in a paginated format for better viewing.

## Technologies Used
  Frontend:
    TypeScript
    HTML
    CSS
    Bootstrap (for UI)
    SweetAlert2 (for alerts)
  Backend:
    RESTful API (documented for CRUD operations on books)
    
## Installation
Step-by-step instructions to set up the project locally.

## Clone this repository
```bash
$ git clone https://github.com/Shirly-lap/books-management.git
```

# Enter the project directory
``` bash
cd book-management-system
```
## Configuration
  1. API Base URL: Configure the base URL of the API in configuration files (like users.controller.ts and books.controller.ts).

  2. Environment Variables: If necessary, create a .env file at the root of the project to store environment variables like the authentication token.

## Project Structure
  /controllers: Contains controllers for handling API requests.
  /models: Contains interfaces to define data structures.
  /views: Contains HTML and CSS files for the user interface.
  index.html: The main file that loads the application.

## Contributing
  Contributions are welcome. Please follow these steps to contribute:

  1. Fork the repository.
  2. Create a new branch (git checkout -b feature/my-new-feature).
  3. Make the necessary changes and commit (git commit -am 'Added new feature').
  4. Push the branch to your repository (git push origin feature/my-new-feature).
  5. Open a Pull Request in the original repository.

## License
This project is licensed under the MIT License.
