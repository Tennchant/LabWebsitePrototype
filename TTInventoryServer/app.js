// set up the server
const express = require("express");
const app = express();
const port = 3000;

//start the server
app.listen(port, () => {
    console.log(`App server listening on ${port}`);
});

//define a route for the default home page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
})

app.get("/inventory", (req, res) => {
    res.sendFile(__dirname + "/views/inventory.html");
})

//define a route for the details page
app.get("/assignments/details", (req, res) => {
    res.sendFile(__dirname + "/views/detail.html");
})

//define a route for the schedule page
app.get("/assignments/schedule", (req, res) => {
    res.sendFile(__dirname + "/views/schedule.html");
})

app.get("/favicon.ico", (req, res) => {
    res.sendFile(__dirname + "/views/favicon.png");
})

//