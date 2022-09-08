export const GET_PRODUCT = (id_tenant) =>  `
SELECT * FROM konecta.product_${id_tenant}
  JOIN stock_${id_tenant}
  ON product_${id_tenant}.id = stock.product_id
WHERE tenant.id = ?;
`;

export const GET_PRODUCTS = (id_tenant) => `
SELECT * FROM konecta.product_${id_tenant}
JOIN konecta.stock_${tableName}
ON product_${id_tenant}.id = stock.product_id;
`;

export const DELETE_PRODUCT = (id_tenant) => `
DELETE product_${id_tenant}
FROM konecta.product_${id_tenant}
JOIN konecta.stock_${tableName}
ON product_${id_tenant}.id = stock.product_id
WHERE  id = ?;
`
export const CREATE_PRODUCT = (id_tenant) => `
INSERT INTO product_${id_tenant}
(name,description)
VALUES (?, ?);
`
export const ADD_STOCK = (id_tenant) => `
INSERT INTO stock_${id_tenant}
(id_product,amount)
VALUES (?, ?);
`
export const ADD_IMAGE = (id_tenant) => `
INSERT INTO image_${id_tenant}
(id_product,src)
VALUES (?, ?);
`