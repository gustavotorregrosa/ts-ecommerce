import config from '../config.json'

export const getStock = async () => {
 try {
    let allItems = await fetch(config.api_url + 'stock')
    allItems = await allItems.json()
    return allItems
 } catch (error) {
    console.log({error})
 }
}
