# express-movie-prj

## API ENDPOINT

🔗 https://express-movie-prj.vercel.app/

🔌 3001

## Description

This is a movie renting project for posting and buying movies, cashlessly, from a virtual store. With an authentication process.

## Signup

🔗 https://express-movie-prj.vercel.app/v1/auth/signup

🧤 `POST`

### Request Body
```ts
req = {
    username: string,
    email: string,
    password: string
}
```

### Responses
If there are invalid `body` parameters.
```ts
res.status(500)
res.send({
    success: false,
    msg: [
        errorMsg, // If any.
        errorMsg, // If any.
        errorMsg // If any.
    ]
})
```

If there was an error signing up.
```ts
res.status(300)
res.send({
    success: false,
    msg: "Server Error!"
})
```

If the user is signed up successfully (This sets a `cookie` and puts the user in `session`).
```ts
res.status(201)
res.send({
    success: true,
    msg: "Account created!"
})
```


## Login

🔗 https://express-movie-prj.vercel.app/v1/auth/login

🧤 `POST`

### Request Body
```ts
req = {
    username: string,
    password: string
}
```

### Responses

If there is an invalid `body` parameter.
```ts
res.status(300)
res.send({
    success: false,
    msg: "Invalid credentials"
})
```

If the username doesn't exist in the database.
```ts
res.status(400)
res.send({
    success: false,
    msg: "Inexistent username!"
})
```

If the passwords don't match.
```ts
res.status(500)
res.send({
    success: false,
    msg: "Invalid password!"
})
```

If all checks are correct (This also sets a `cookie` and puts the user in `session`).
```ts
res.status(200)
res.send({
    success: true,
    msg: "Logged In!"
})
```

## View

🔗 https://express-movie-prj.vercel.app/v1/movies

🧤 `GET`

If you want to take a peek at all listed movies on the platform, this is your go to endpoint.

### Responses

If there are no movies at the moment.
```ts
res.status(300)
res.send({
    success: true,
    msg: "There are no movies at the moment"
})
```

If there are movies in stock, this returns an array of the movie datas.
```ts
res.status(200)
res.send({
    success: true,
    msg: [
        {
            "movieId": string,
			"name": string,
			"desc": string,
			"price": number,
			"quantity": number,
        }
    ]
})
```

## Post

🔗 https://express-movie-prj.vercel.app/v1/new

🧤 `POST`

This is guarded, you must be `logged in` to access.

### Request Body

```ts
req = {
    name: string,
    desc: string,
    price: number,
    quantity: number
}
```

### Responses

If there is an invalid `body` parameter.
```ts
res.status(300)
res.send({
    success: false,
    msg: "Invalid data passed"
})
```

If your new movie couldn't be created.
```ts
res.status(500)
res.send({
    success: false,
    msg: "Error creating a new movie"
})
```

If the movie was created.
```ts
res.status(201)
res.send({
    success: true,
    msg: {
        "movieId": string,
        "name": string,
        "desc": string,
        "price": number,
        "quantity": number,
    }
})
```

## Buy

🔗 https://express-movie-prj.vercel.app/v1/buy

🧤 `POST`

This is guarded, you must be `logged in` to access.

### Request Body

```ts
req = {
    movieId: string,
    number: number,
    amount: number
}

// number: How many you want to purchase.
// amount: How much you want to pay.
```

### Responses

If there is an invalid `body` parameter.
```ts
res.status(300)
res.send({
    success: false,
    msg: "Invalid data passed"
})
```

If the `movieId` does not exist in the database.
```ts
res.status(404)
res.send({
    success: false,
    msg: "Movie inexistent"
})
```

If the `number` the caller is buying is more than is left in stock.
```ts
res.status(300)
res.send({
    success: false,
    msg: "You're buying more than is left"
})
```

If the `amount` the user wants to pay is lower than the total price of the movie to be bought.
```ts
res.status(300)
res.send({
    success: false,
    msg: `Payment not up to price. Trying to pay ${amount} for movies costing ${priceOne * number}`
})
```

If there was an error in purchase.
```ts
res.status(500)
res.send({
    success: false,
    msg: "Error buying movie"
})
```

If there was an error in record update.
```ts
res.status(500)
res.send({
    success: false,
    msg: "Error updating records"
})
```

If the purchase was successful.
```ts
res.status(200)
res.send({
success: true,
msg: `${number} copies of ${movieId} : ${requestedMovie.name} purchased successfully @ ${amount}.`
})
```