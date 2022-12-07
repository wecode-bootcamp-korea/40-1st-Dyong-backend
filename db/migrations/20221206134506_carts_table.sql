-- migrate:up
CREATE TABLE carts (
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  user_id INT NOT NULL,
  quantity INT NOT NULL,
  status_code_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES products (id),
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (status_code_id) REFERENCES status_codes (id)
);
-- migrate:down
DROP TABLE carts
