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