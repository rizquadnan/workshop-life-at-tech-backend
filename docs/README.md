# What is Baret PT API ?

This API is used for a mobile web application. The application is used a gym personal trainer and his/her customer. They use the app to manage the exercise sessions that are going to happen between them.

So there are 2 users:

1. Trainer
2. Customer

The most important feature of this application is the managing the exercise session count between a trainer and a customer

Trainer does not want a exercise session happening but the exercise count does not decrease

While customer does not want the exercise count to decrease without any consent

# How does the endpoint work in this repo ?

For the purpose of this workshop only 3 resources are granted:

1. Auth: Managing users of the app
2. Contract: Managing relation between trainer and customer
3. Exercise: Managing the exercises within a contract

If you want to create an exercise then you'll need to:

1. Create trainer with /register/trainer
2. Create customer with /register/customer
3. Create contract with the created trainer and customer
4. Create exercise
