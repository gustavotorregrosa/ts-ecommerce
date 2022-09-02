
export default function (state = { orderItems: [] }, action) {

    switch(action.type) {
      case 'REFRESH_ALL_ORDERS':
        return {
            ...state,
            orderItems: action.payload
        }

      default:
        return state
    }
  }
  