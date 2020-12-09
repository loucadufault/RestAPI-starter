# API Coding test


You're being given a swagger specification file which describes a micro api.
The goal of the coding challenge is to implement it with the language,
frameworks and database of your choice.

# Notes

* We expect a solution using any tools or libraries you believe are relevant to
  the completion of the tasks;
* We expect you to explain in the deliverable the choices that you made in term
  of tools & design;
* We will pay **a lot of attention** to code quality, maintainability,
  testability and best software engineering practices;

# Dependencies

Requires:
- npm
- docker & docker-compose

# Secrets

The project expects a .env file to be present in the root directory, usually it should be ignored by the VCS as a best practice. However for the sake of simplicity it has been omitted from the `.gitignore` file. 

# Onboarding

1. Clone the repo

ex: `git clone https://github.com/dialoguemd/Louca-Dufault.git` (HTTPS)

2. Open the project root directory in a terminal

ex: `cd Louca-Dufault` (unix)

3. Install the dependencies

`npm install`

4. Start the backing services

`npm run start:backing`

5. Run the tests

`npm test`  

6. Start the development server

`npm run dev`

7. Access the Rest API

Navigate to `http://localhost:8000/` in your browser or some other HTTP/S client (e.g. Postman)
