const db = require("./db_connection")

// Query
db.execute('SELECT 1 + 1 AS solution', (error, results) => {
    if(error) throw error;
    console.log(result);
})

db.end();

//terminal > node db/db_test.js