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


-- review table
CREATE TABLE reviews
(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGSERIAL NOT NULL REFERENCES restaurants(id),
    name VARCHAR(40) NOT NULL,
    review TEXT NOT NUll,
    rating INT NOT NULL CHECK(rating>=1 and rating<=5)
);

-- rename table
--ALTER TABLE <name> RENAME TO <new name>

INSERT INTO reviews
    (restaurant_id,name,review,rating)
values(6, 'Sumit', 'Nice Pizza', '3');

SELECT restaurant_id, TRUNC(AVG(rating),1) AS average_rating
FROM reviews
GROUP BY restaurant_id;

-- join with another table

SELECT *
FROM restaurants inner join (select restaurant_id, count(*), TRUNC(AVG(rating),1) as average_rating
    from reviews
    group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;
