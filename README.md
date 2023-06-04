# NestJS API Gateway

## Description
API Gateway for NestJS microservices. This is a simple implementation of the API Gateway pattern for NestJS microservices. It is based on the [NestJS microservices documentation](https://docs.nestjs.com/microservices/basics)
It exposes REST endpoints and uses GPRC protocol to communicate with the Loan Enquiry Microservice microservice.

## Installation

```bash
$ npm install && npm run build
```

## Running the app

```bash
$ npm run start
```

## Usage
1: Check request.http file for sample requests
2: Check the swagger documentation for the exposed endpoints
You can access the swagger documentation at http://localhost:3000/api
3: Run CURL commands to test the endpoints
```shell
curl -H 'application/json' http://localhost:3000/api/v1/loan/F422B567
curl -H 'application/json' http://localhost:3000/api/v1/loans/default?year=2018
curl -H 'application/json' http://localhost:3000/api/v1/loans/default-exchanged?year=2017
curl -H 'application/json' http://localhost:3000/api/v1/loans/distribution?startDate=01/01/2015&endDate=01/01/2018
# Possible filter types for the moment are: education, age, maritalStatus and job
curl -H 'application/json' http://localhost:3000/api/v1/loans/filter?filterType=education&value=tertiary
```
