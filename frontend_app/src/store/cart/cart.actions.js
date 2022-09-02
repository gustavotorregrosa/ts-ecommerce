export function addProduct(product) {

  return {
    type: 'ADD_PRODUCT',
    payload: product
  }
}

export function removeProduct(product) {

  return {
    type: 'REMOVE_PRODUCT',
    payload: product
  }
}

export function refresh(productsArray) {
  return {
    type: 'REFRESH',
    payload: productsArray
  }
}