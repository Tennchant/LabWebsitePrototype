// set up the server
const express = require("express");
const logger = require("morgan");
const db = require('./db/db_connection');
const app = express();
const port = 3000;
const DEBUG = true;

//start the server
app.listen(port, () => {
    console.log(`App server listening on ${port}`);
});

app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

// define middleware that logs all incoming requests
app.use(logger("dev"));

// define middleware that serves static resources in the public directory
app.use(express.static(__dirname + '/public'));

// Configure Express to parse URL-encoded POST request bodies (traditional forms)
app.use( express.urlencoded({ extended: false }) );

//define a route for the default home page
app.get("/", (req, res) => {
    res.render('index');
})

const read_inventory_sql = `
    select item_id, item_name, item_brand, item_count
    from inventory
    order by item_id;
`

app.get("/inventory", (req, res) => {
    db.execute(read_inventory_sql, (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else{
            let data = { itemList : results };
            res.render('inventory', data);
        }
    })
})

const read_detail_sql = `
    select item_id, item_name, item_brand, item_count, item_desc
    from inventory
    where inventory.item_id = ?
`

//define a route for the details page
app.get("/inventory/detail/:id", (req, res) => {
    db.execute(read_detail_sql, [req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else if (results.length == 0)
            res.status(404).send(`No item found with id = "${req.params.id}"` );
        else{
            let data = {item: results[0]}; // results is still an array, get first (only) element
            res.render('detail', data);
        }
    })
})

//define a route for the schedule page
app.get("/schedule", (req, res) => {
    res.render('schedule');
})

const delete_item_sql = `
    DELETE 
    FROM
        inventory
    WHERE
        item_id = ?
`
app.get("/inventory/detail/:id/delete", ( req, res ) => {
    db.execute(delete_item_sql, [req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect("/inventory");
        }
    });
});

const delete_assignment_sql = `
    DELETE 
    FROM
        inventory
    WHERE
        item_id = ?
`
app.get("/inventory/detail/:id/delete", ( req, res ) => {
    db.execute(delete_inventory_sql, [req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect("/inventory");
        }
    });
});

// define a route for assignment CREATE
const create_item_sql = `
    INSERT INTO inventory 
        (item_name, item_count, item_brand, item_desc) 
    VALUES 
        (?, ?, ?, ?);
`
app.post("/inventory", ( req, res ) => {
    const { item_name, item_count, item_brand, item_desc } = req.body;

  // Check if any of the required parameters are undefined
  if (item_name === undefined || item_count === undefined || item_brand === undefined || item_desc === undefined) {
    res.status(400).send("Missing required parameters");
    return;
  }

    db.execute(create_item_sql, [req.body.item_name, req.body.item_count, req.body.item_brand, req.body.item_desc], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            //results.insertId has the primary key (assignmentId) of the newly inserted row.
            res.redirect(`/inventory/detail/${results.insertId}`);
        }
    });
});

const update_item_sql = `
    UPDATE
        inventory
    SET
        item_name = ?,
        item_brand = ?,
        item_count = ?,
        item_desc = ?
    WHERE
        item_id = ?
`
app.post("/inventory/detail/:id", ( req, res ) => {
    db.execute(update_item_sql, [req.body.item_name, req.body.item_brand, req.body.item_count, req.body.item_desc, req.params.id], (error, results) => {
        if (DEBUG)
            console.log(error ? error : results);
        if (error)
            res.status(500).send(error); //Internal Server Error
        else {
            res.redirect(`/inventory/detail/${req.params.id}`);
        }
    });
});

app.get("/favicon.ico", (req, res) => {
    res.sendFile(__dirname + "/views/favicon.png");
})