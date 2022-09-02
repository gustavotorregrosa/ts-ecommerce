export default function (state = { products: [] }, action) {
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

    const addProduct = (product) => {
        let cartItems = state.products
        let item = state.products.find(i => i.id == product.id)

        if(!item){
            item = {
                ...product,
                qty: 0
            }
        }

       ++item.qty

        cartItems = cartItems.filter(c => c.id != product.id)
        cartItems.push(item)

        
        cartItems = orderItemsByCatId(cartItems)



        localStorage.setItem('cart', JSON.stringify(cartItems))

        return cartItems
    }

    const removeProduct = (product) => {
        
        let cartItems = state.products
        let item = cartItems.find(i => i.id == product.id)
        if(!item){
            item = {
                ...product,
                qty: 1
            }
        }
        --item.qty
        cartItems = cartItems.filter(i => i.id != product.id)
        cartItems.push(item)
        cartItems = cartItems.filter(c => c.qty)
        cartItems = orderItemsByCatId(cartItems)

        localStorage.setItem('cart', JSON.stringify(cartItems))

        return cartItems
    }

    const refresh = products => {
        localStorage.setItem('cart', JSON.stringify(products))
        return products
    }

    switch(action.type) {
        case 'ADD_PRODUCT':

            return {
                ...state,
                products: addProduct(action.payload)
            }

        case 'REMOVE_PRODUCT':
            return {
                ...state,
                products: removeProduct(action.payload)
            }

        case 'REFRESH':
            return {
                ...state,
                products: refresh(action.payload)
            }
  
      default:
        return state
    }
  }
  