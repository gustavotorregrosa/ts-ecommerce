export function refreshAll (stockItems) {

    return {
      type: 'REFRESH_ALL',
      payload: stockItems
    }
  }
  
export function increaseBy ({id, qty}) {
    return {
      type: 'INCREASE_BY',
      payload: {id, qty}
    }
}