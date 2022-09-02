import M from 'materialize-css'

export default function (state = { stockItems: [] }, action) {
    const orderItemsByCatId = (items) => {
        return items.sort((a, b) => {
            if(a.category == b.category){
                if(a.id < b.id){
                    return -1
                }

                return 1
            }else {
                if(a.category < b.category){
                    return -1
                }
                return 1
            }
        })
    }

    const increaseBy = ({id, qty}) => {
        const itemIndex = state.stockItems.findIndex(item => item.id == id)
        const item = {
            ...state.stockItems[itemIndex],
            stock: state.stockItems[itemIndex].stock + qty
        }

        if(item.stock < 0){
            M.toast({html: 'Stock cannot be less than zero'})
            return state.stockItems
        }

        const stockItems = state.stockItems
        stockItems[itemIndex] = {...item}

        return stockItems

    }


    switch(action.type) {
      case 'REFRESH_ALL':
        return {
            ...state,
            stockItems: orderItemsByCatId(action.payload)
        }

        case 'INCREASE_BY':
            return {
                ...state,
                stockItems: increaseBy(action.payload)
            }
  
      default:
        return state
    }
  }
  