import { Controller, Get } from '@nestjs/common';
import { IProduct } from 'src/products/Product.interface';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {


    constructor(private stockService: StockService){}

    @Get()
    async listAllProducts(): Promise<IProduct[]>{
        return await this.stockService.listAll()
    }
}
