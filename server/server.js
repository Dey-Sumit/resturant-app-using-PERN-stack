require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const db = require('./db')
const cors = require('cors')

const app = express()

// route is also a middleware (last middleware)
//define middleware at top
// app.use((req, res, next) => {
//     console.log("middleware");
//     next(); // pass the packet to the next middleware
// })
app.use(cors())
app.use(morgan("tiny"));

app.use(express.json())


// Retrieve all restaurants : GET : /api/v1/restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        // const results = await db.query("select * from restaurants");
        const results = await db.query("SELECT * FROM restaurants left join (select restaurant_id,count(*) as no_of_reviews,TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id")

        res.status(200).json({
            results: results.rows.length,
            data: {
                restaurants: results.rows
            }
        })
    } catch (error) {
        console.log(error);
    }

})

// Retrieve one restaurant : GET : /api/v1/restaurants/:id

app.get("/api/v1/restaurants/:id", async (req, res) => {
    const restaurant_id = req.params.id;
    try {
        // const results = await db.query(`select * from restaurants where id=${restaurant_id}`)
        const results = await db.query(" SELECT * FROM restaurants left join (select restaurant_id,count(*) as no_of_reviews,TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id=$1;", [restaurant_id])
        const reviews = await db.query("SELECT * from REVIEWS where restaurant_id=$1", [restaurant_id])

        res.status(200).json({
            data: {
                restaurant: results.rows[0],
                reviews: reviews.rows
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send("server error")
    }

})

// Create restaurant : POST : /api/v1/restaurants

app.post("/api/v1/restaurants/", async (req, res) => {
    try {
        const { name, location, price_range } = req.body;
        //const results = await db.query("INSERT INTO restaurants (name,location,price_range) values($1,$2,$3) returning *", [name, location, price_range])
        res.status(200).json({
            restaurant: results.rows[0]
        })
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

// Update restaurant : PUT : /api/v1/restaurants/:id

app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const { name, location, price_range } = req.body;
        const restaurant = await db.query("UPDATE restaurants SET name=$1,location=$2,price_range=$3 where id = $4 returning *", [name, location, price_range, req.params.id])
        // console.log(results);
        res.status(200).json({
            restaurant: restaurant.rows[0]
        })
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

// Delete restaurant : DELETE : /api/v1/restaurants/:id

app.delete("/api/v1/restaurants/:id", async (req, res) => {
    const restaurant_id = req.params.id;
    try {
        await db.query("DELETE FROM restaurants where id=$1", [restaurant_id])

        res.status(200).json({
            status: "success",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }

})

//add review
app.post("/api/v1/restaurants/:id/reviews", async (req, res) => {
    try {
        const { name, review, rating } = req.body;
        const results = await db.query("INSERT INTO reviews (restaurant_id,name,review,rating) values($1,$2,$3,$4) returning *", [req.params.id, name, review, rating])

        res.status(200).json({
            review: results.rows[0]
        })
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})


const PORT = process.env.PORT || 30001;

app.listen(PORT,
    () => console.log(`server is up and listening on port ${PORT}`))


// API ENDPOINTS
// Retrieve all restaurants : GET : /api/v1/restaurants
// Retrieve one restaurant : GET : /api/v1/restaurants/:id
// Create restaurant : POST : /api/v1/restaurants
// Update a restaurant : PUT : /api/v1/restaurants/:id
// Delete a restaurant : DELETE : /api/v1/restaurants/:id