# Front Page
1. POST auth/register
2. POST auth/sign_in
3. PUT auth/forgot_password

# Trainer App
## Dashboard
1. GET len(customers)  // by trainer id. better get len of contracts
2. GET sum(contracts -> amountOfExercise) // by trainer id
3. GET len(customers) // by trainer id AND by contract endTime get len of contracs

## Train
1. GET customers // by trainer id. get contracts for a trainer id to get customers id. then get customer for each customer id 
2. POST exercises
3. GET exercises // by trainer id AND by status.
4. PATCH exercises -> status // by exercise id

## Customer
1. GET customers // by trainer id. get contracts for a trainer id to get customers id. then get customer for each customer id
2. POST contracts

## Profile
1. GET trainers // by trainer id. get user
2. PATCH trainers // by trainer id. patch user
3. PUT trainers -> password // by trainer id

# Customer App
## Dashboard
1. GET contracts -> amountOfExercise // by customer id
2. GET exercises // by contract id
3. GET contracts -> end_time // by customer id
3. GET trainers // by customer id

## Train
1. GET exercise // by customer id AND by status
2. PUT exercise -> status // by exercise id
