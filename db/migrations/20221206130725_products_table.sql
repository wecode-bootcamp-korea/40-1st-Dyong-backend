-- migrate:up
CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  content VARCHAR(2000) NOT NULL,
  image_id INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category_id INT NOT NULL,
  product_type_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (image_id) REFERENCES images (id),
  FOREIGN KEY (category_id) REFERENCES categories (id),
  FOREIGN KEY (product_type_id) REFERENCES product_types (id)
);
-- migrate:down
DROP TABLE products
