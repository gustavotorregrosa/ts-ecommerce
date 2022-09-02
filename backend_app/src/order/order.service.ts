import { Injectable } from '@nestjs/common';
import { StockRepository } from '../stock/stock.repository';
import { IOrder, LineItem } from './order.interface';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {

    constructor(private orderRepository: OrderRepository, private stockRepository: StockRepository){}

    async listAllFromUser(email: string): Promise<IOrder[]>{
        return this.orderRepository.getAllItemsFromUser(email)
    }

    async saveOrder(cartItems: LineItem[], email: string): Promise<IOrder>{
        for(const lineItem of cartItems){
            const {id, qty} = lineItem
            await this.stockRepository.removeQtyFromProduct(id, qty)
        }

        let order: IOrder = {
            lineItems: cartItems,
            totalValue: cartItems.reduce((a, b) => a + b.qty * (b.price - b.discountPercentage/100), 0)
        }

        return this.orderRepository.saveOrder(order, email)
    }
}
