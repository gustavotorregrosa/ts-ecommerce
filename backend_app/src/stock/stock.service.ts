import { Injectable } from '@nestjs/common';
import { IProduct } from 'src/products/Product.interface';
import { StockRepository } from './stock.repository';

@Injectable()
export class StockService {

    constructor(private stockRepository: StockRepository){}

    async listAll(): Promise<IProduct[]>{
        return await this.stockRepository.getAllItems()
    }

}
