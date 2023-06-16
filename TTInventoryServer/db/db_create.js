const db = require("./db_connection")

/**** Drop existing tables, if any ****/

const drop_client_item_table_sql = "DROP TABLE IF EXISTS client_item;"

db.execute(drop_client_item_table_sql);

const drop_client_table_sql = "DROP TABLE IF EXISTS client;"

db.execute(drop_client_table_sql);

const drop_inventory_table_sql = "DROP TABLE IF EXISTS inventory;"

db.execute(drop_inventory_table_sql);

const create_client_table_sql = `
    CREATE TABLE client (
    client_id INT NOT NULL AUTO_INCREMENT,
    client_first_name VARCHAR(45) NULL,
    client_last_name VARCHAR(45) NULL,
    client_time VARCHAR(45) NULL,
    client_day VARCHAR(45) NULL,
    PRIMARY KEY (client_id));
    `
    db.execute(create_client_table_sql);

const create_inventory_table_sql = `
CREATE TABLE inventory (
    item_id INT NOT NULL AUTO_INCREMENT,
    item_name VARCHAR(45) NULL,
    item_brand VARCHAR(45) NULL,
    item_count INT NULL,
    item_desc VARCHAR(100) NULL,
    PRIMARY KEY (item_id));
    `
    db.execute(create_inventory_table_sql);

  
    db.end();