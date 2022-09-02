export default function (state = {
    email: null
}, action) {
    switch(action.type) {
      case 'LOGIN':
        return {
            ...state,
            email: action.payload 
        }

        case 'LOGOUT':
            return {
                ...state,
                email: null
            }
  
      default:
        return state
    }
  }
  