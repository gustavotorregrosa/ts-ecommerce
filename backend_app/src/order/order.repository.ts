import { Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'
import {promises as fs} from 'fs'
import { IOrder } from './order.interface'


class OrderRepository {

    private readFile
    private writeFile
    private path: string

    constructor(){
        const {readFile, writeFile} = fs
        this.readFile = readFile
        this.writeFile = writeFile
        this.path = __dirname + '/orders.json'
    }

    public async getAllItemsFromUser(email: string): Promise<IOrder[]> {
        return (await this.readAllItems()).filter(order => email && order.email == email)
    }

    public async saveOrder(order: IOrder, email: string): Promise<IOrder> {
        const orderWithID: IOrder = {
            ...order,
            id: randomUUID(),
            email
        }

        const orders: IOrder[] = await this.getAllItems()
        orders.push(orderWithID)
        await this.saveData(orders)
        return orderWithID
    }

    private async getAllItems(): Promise<IOrder[]> {
        return await this.readAllItems()
    }

    private async readAllItems(): Promise<IOrder[]> {
        const dataString: string = await this.readFile(this.path, 'utf-8')
        return JSON.parse(dataString).items as IOrder[]
    }

    private async saveData(orders: IOrder[]): Promise<IOrder[]> {
        await this.writeFile(this.path, JSON.stringify({
            items: orders
        }), 'utf-8')
        return orders
    }

    

}

export {OrderRepository}