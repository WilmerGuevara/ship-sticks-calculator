Shipping Package Calculator
===========================
### How to run the project?

This project was developed using Docker. So all you need is Docker and docker-compose installed.

Once those two features are installed you need to run these commands in the root folder of the project:

1. `docker network create ship_sticks_network` to create the docker virtual network.
2. `docker-compose run api rails db:seed` to populate database with data from provided file `products.json`.
3. `docker-compose run frontend yarn` to create the docker `frontend` container`.
4. `docker-compose up` to start the project.

The Frontend will run in http://localhost:3000 and the API in http://localhost:3001.

### Test the API

This project contains a folder called `postman-collection`, import the file inside the folder in Postman and start playing with the endpoints 🤓

### References

This project was dockerized using this template, but using ECMAScript and MongoDB [Rails & React Docker Starter](https://github.com/aryrabelo/rails-react-docker-starter)

### Tech Stack

- React
- React-bootstrap
- MongoDB
- Ruby on Rails
- Docker
### Author

Wilmer Guevara (wilmerguevarap@gmail.com)
