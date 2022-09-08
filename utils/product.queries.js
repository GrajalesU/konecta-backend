export const GET_PRODUCT = (id_tenant) =>  `
SELECT * FROM konecta.product_${id_tenant}
  JOIN stock_${id_tenant}
  ON product_${id_tenant} = stock.product_id
WHERE tenant.id = ?;
`;