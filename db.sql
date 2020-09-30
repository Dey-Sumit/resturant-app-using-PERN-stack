-- connect database
-- /c <db-name>

-- create database CREATE DATABASE <name>

-- list all db \d

-- list all tables \l

-- ADD COLUMN
--  ALTER TABLE products ADD COLUMN featured;

-- DROP COLUMN
--  ALTER TABLE products DROP COLUMN featured;

-- DROP TABLE
-- DROP TABLE <table name>




CREATE TABLE resturants
(
    id INT,
    name VARCHAR(50),
    location VARCHAR(50),
    price_range INT
);

-- insert data
INSERT INTO resturants
    (id,name,location,price_range)
values(123, 'mcdonalds', 'new yorks', 3);

INSERT INTO resturants
    (name,location,price_range)
values( 'mcdonalds', 'new yorks', 3);

-- select data
--all
SELECT *
from restutants;
--specific columns
SELECT name, price_range
from resturants;


-- with constraints(NOT NULL,RANGE)
CREATE TABLE resturants
(
    id BIGSERIAL NOT NULL,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check(price_range>=1 and price_range<=5)
);

-- primary key(unique identification)

CREATE TABLE resturants
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL check(price_range>=1 and price_range<=5)
);

--UPDATE
-- ** single quote
UPDATE resturants SET name='pizza khao',location='miami',price_range=2 where id = 6;