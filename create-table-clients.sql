DROP TABLE IF EXISTS clients;

CREATE TABLE clients (
  id          serial,
  first_name  text,
  last_name   text,
  intake_date date
);
