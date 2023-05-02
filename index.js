/*
 todo: create and read a registry to store the services

*/
const express = require("express");
const app = express();


const {router: serviceRoutes} = require("./routes/serviceRoutes")
const {router: registyRoutes} = require("./routes/registryRoutes")

require('dotenv').config()
const port = process.env.PORT || 8088;


app.use("/service", serviceRoutes)
app.use("/registy", registyRoutes)

app.listen(port, () => {
    console.log(`Gateway listening at http://localhost:${port}`);
});



