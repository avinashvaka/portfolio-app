To run the project install Docker, Launch Docker and run the following command or double click run-portfolio-app.bat

docker-compose up --build

in-case if docker doesn't work please run the following 

ng serve in portfolio-app-frontend folder

mvn clean install in portfolio-app-backend folder and run the spring boot application

front-end url: http://localhost:80

backend-end url: http://localhost:8080

Scenarios covered as part of this app
1. Register a new user
2. Try to register same user
3. Login with invalid username and password
4. Logout and login again
5. Add Asset
6. Edit Asset
7. Delete Asset
8. Retrieve a specific Asset by ID/ISIN
9. ISIN validation for Add/Edit
10. Button Validations and alert messages on all important events
