-- migrate:up
CREATE TABLE status_codes (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  status VARCHAR(50) NOT NULL
);
-- migrate:down
DROP TABLE status_codes