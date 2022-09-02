import config from '../config.json'

export const getOrders = async user => {
   try {
      const myHeaders = new Headers();
      myHeaders.append('user', user);
      const res = await fetch(config.api_url + 'orders', {
         method: 'get',
         headers: myHeaders,
      })

      const orders = await res.json()
      return orders
   } catch (error) {
      console.log({error})
   }

}

export const saveOrder = async (cartItems, user) => {
   try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const res = await fetch(config.api_url + 'orders', {
         method: 'post',
         headers: myHeaders,
         body: JSON.stringify({
            cartItems,
            user
         })
      })

      const order = await res.json()
      return order
   } catch (error) {
      console.log({error})
   }

}
