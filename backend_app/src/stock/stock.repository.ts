import { Injectable } from '@nestjs/common'
import {promises as fs} from 'fs'
import { IProduct } from 'src/products/Product.interface'

@Injectable()
class StockRepository {

    private readFile
    private writeFile
    private path: string

    constructor(){
        const {readFile, writeFile} = fs
        this.readFile = readFile
        this.writeFile = writeFile
        this.path = __dirname + '/currentstock.json'
    }

    public async getAllItems(): Promise<IProduct[]> {
        return await this.readAllItems()
    }

    public async removeQtyFromProduct(productID: number, qty: number):Promise<void>{
        const allProducts: IProduct[] = await this.readAllItems()
        const productIndex: number = allProducts.findIndex(product => productID == product.id)
        allProducts[productIndex].stock -= qty
        if(allProducts[productIndex].stock < 0){
            throw new Error('Cannot save product with negative stock')
        }
        await this.saveData(allProducts)
        return
    }

    private async readAllItems(): Promise<IProduct[]> {
        const dataString: string = await this.readFile(this.path, 'utf-8')
        return JSON.parse(dataString).items as IProduct[]
    }

    private async saveData(products: IProduct[]): Promise<IProduct[]> {
        await this.writeFile(this.path, JSON.stringify({
            items: products
        }), 'utf-8')
        return products
    }

    
}

export { 
    StockRepository
}
