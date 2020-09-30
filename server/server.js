require('dotenv').config();
const express = require('express')
const morgan = require('morgan')
const db = require('./db')

const app = express()

// route is also a middleware (last middleware)
//define middleware at top
// app.use((req, res, next) => {
//     console.log("middleware");
//     next(); // pass the packet to the next middleware
// })
app.use(morgan("tiny"));

app.use(express.json())


// Retrieve all restaurants : GET : /api/v1/restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const results = await db.query("select * from resturants");
        console.log(results);
        res.status(200).json({
            status: "success",
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
        // const results = await db.query(`select * from resturants where id=${restaurant_id}`)
        const results = await db.query("select * from resturants where id=$1", [req.params.id])
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurant: results.rows[0]
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
        const results = await db.query("INSERT INTO resturants (name,location,price_range) values($1,$2,$3) returning *", [name, location, price_range])
        console.log(results);
        res.status(200).json({
            status: "success",
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
        const results = await db.query("UPDATE resturants SET name=$1,location=$2,price_range=$3 where id = $4 returning *", [name, location, price_range, req.params.id])
        console.log(results);
        res.status(200).json({
            status: "success",
            restaurant: results.rows[0]
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
        await db.query("DELETE FROM resturants where id=$1", [restaurant_id])

        res.status(200).json({
            status: "success",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
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