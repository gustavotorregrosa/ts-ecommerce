import { IProduct } from "src/products/Product.interface"

export interface LineItem {
    id: number
    qty: number
    product: IProduct
    price: number
    discountPercentage: number
}


export interface IOrder {
    id?: string
    lineItems: LineItem[]
    email?: string
    totalValue: number
}

