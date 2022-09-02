import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { IOrder } from './order.interface';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {

    constructor(private orderService: OrderService){}

    @Get()
    async getAllFromUser(@Headers('user') user): Promise<IOrder[]> {
       return await this.orderService.listAllFromUser(user)
    }

    @Post()
    async saveOrder(@Body() body: any): Promise<any>{
        const {cartItems, user} = body
        return await this.orderService.saveOrder(cartItems, user)
    }

}
