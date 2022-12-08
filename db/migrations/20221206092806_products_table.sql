-- migrate:up
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(30) NOT NULL,
  email VARCHAR(50) NOT NULL,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(1000) NOT NULL,
  phone_number VARCHAR(30) NOT NULL,
  point DECIMAL(8,2) NOT NULL DEFAULT 50000,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  UNIQUE (email),
  UNIQUE (username)
);
-- migrate:down
DROP TABLE users