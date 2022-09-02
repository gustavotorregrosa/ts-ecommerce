import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockController } from './stock/stock.controller';
import { StockRepository } from './stock/stock.repository';
import { StockService } from './stock/stock.service';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { OrderRepository } from './order/order.repository';


@Module({
  imports: [],
  controllers: [AppController, StockController, OrderController],
  providers: [AppService, StockService, StockRepository, OrderService, OrderRepository],
})
export class AppModule {}
