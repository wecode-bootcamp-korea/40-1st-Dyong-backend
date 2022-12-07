-- migrate:up
CREATE TABLE categories (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(200),
  PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE categories