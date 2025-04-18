## Secure API Middleware for RestCountries

This project contains a secure API middleware service that interfaces with [Restcountries.com](https://restcountries.com/) to retrieve and display specific country data. It will give specific informations about a country user query through the points such as Name, Capital, Currency, Language and Country Flag.

##  Features

- **Rest API integration** - Fetch data of the country through endpoints.
- **User Authentication** - Ensures secure registration and login.
- **API key managing** - Automatically generate API key and allows to regenerate if necessary
- **Database** - Incorporates SQL lite with 3NF(Third Normal Form) to store data
- **Containarizing** - with docker compose deploy FE and BE instances in seperate containers.

## Installation and Setup

### Prerequisites

- Docker (with Docker Compose)
- Git

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Vihangahw/coursework1-server-side.git
   cd COURSEWORK1-SERVER-SIDE
2. **Start the Application**:

    ```bash
   docker-compose up --build
   

**Seperate access of Front End and Back End**

Backend: http://localhost:3000 <br>
Frontend: http://localhost:5173 <br>

**To Access the Application**
Visit http://localhost:5173 to register and use the app with a new or existing user.

**Stopping**:

 ```bash
 docker-compose down