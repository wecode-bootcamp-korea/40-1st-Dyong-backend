-- migrate:up
CREATE TABLE images (
  id INT NOT NULL AUTO_INCREMENT,
  main_image VARCHAR(2000) NOT NULL,
  sub_image VARCHAR(2000) NOT NULL,
  content_image VARCHAR(2000) NOT NULL,
  PRIMARY KEY (id)
);

-- migrate:down
DROP TABLE images
