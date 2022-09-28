export function validateCartItems(inventorySrc, cartDetails) {
  const validatedItems = [];

  for (const id in cartDetails) {
    const inventoryItem = inventorySrc.find((currentProduct) => {
      return currentProduct.id === id || currentProduct.sku === id;
    });
    if (inventoryItem === undefined) {
      throw new Error(
        `Invalid Cart: product with id "${id}" is not in your inventory.`
      );
    }

    const item = {
      price_data: {
        currency: inventoryItem.currency || "COP",
        unit_amount: Number(inventoryItem.price) * 100,
        product_data: {
          name: inventoryItem.name,
          ...inventoryItem.product_data,
        },
        ...inventoryItem.price_data,
      },
      adjustable_quantity: {
        enabled: true,
        minimum: 0,
        maximum: inventoryItem.stock,
      },
      quantity: cartDetails[id].quantity,
    };

    if (
      cartDetails[id].product_data &&
      typeof cartDetails[id].product_data.metadata === "object"
    ) {
      item.price_data.product_data.metadata = {
        ...item.price_data.product_data.metadata,
        ...cartDetails[id].product_data.metadata,
      };
    }

    if (
      typeof inventoryItem.description === "string" &&
      inventoryItem.description.length > 0
    )
      item.price_data.product_data.description = inventoryItem.description;

    if (!!inventoryItem.imgs && inventoryItem.imgs.length > 0)
      item.price_data.product_data.images = [...inventoryItem.imgs];

    validatedItems.push(item);
  }

  return validatedItems;
}
