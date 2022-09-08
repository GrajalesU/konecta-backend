export const CREATE_REPRESENTATIVE = `
INSERT INTO konecta.representative
(name, email, phone)
VALUES(?, ?, ?)
`;

export const CREATE_COMPANY = `
INSERT INTO konecta.company
(address, activity, email, name, phone, country, department, city, nit, representative_id) 
 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`

export const CREATE_TENANT = `
INSERT INTO konecta.tenant 
(its_active, company_id)     
VALUES ( 1, ?) 
`

export const CREATE_DYNAMIC_TABLES = (stock,product,image) => 
`
CREATE TABLE  ${stock} (
  id INT NOT NULL AUTO_INCREMENT,
  amount INT NOT NULL,
  PRIMARY KEY (id))

CREATE TABLE  ${product} (
  id INT NOT NULL AUTO_INCREMENT,
  description LONGTEXT NULL,
  name VARCHAR(200) NOT NULL,
  price INT NOT NULL,
  stock_id INT NOT NULL,
  PRIMARY KEY (id, stock_id),
  INDEX fk_product_stock_idx (stock_id ASC) VISIBLE,
  CONSTRAINT fk_product_stock
    FOREIGN KEY (stock_id)
    REFERENCES ${stock} (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)

CREATE TABLE IF NOT EXISTS ${image} (
  id INT NOT NULL AUTO_INCREMENT,
  source VARCHAR(2083) NOT NULL,
  product_id INT NOT NULL,
  product_stock_id INT NOT NULL,
  PRIMARY KEY (id, product_id, product_stock_id),
  INDEX fk_image_product1_idx (product_id ASC, product_stock_id ASC) VISIBLE,
  CONSTRAINT fk_image_product1
    FOREIGN KEY (product_id , product_stock_id)
    REFERENCES ${product} (id , stock_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
`
// 1. stock -- konecta.{stock_id}
// 2. product -- konecta.{product_id}
// 2.1. stock
// 3. image -- konecta.{image_id}
// 3.1 product

export const UPDATE_LOGO = `
UPDATE konecta.tenant 
SET logo = ?
WHERE id = ?
`

