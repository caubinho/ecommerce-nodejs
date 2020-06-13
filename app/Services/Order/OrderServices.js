'use strict'

const Database = use(Database)

class OrderService {

  constructor(model, trx = false){
    this.model = model
    this.trx = trx

  }

  async syncItems(items){

    if(!Array.isArray(items)){
      return false
    }


    await this.model.items().delete(this.trx)

    return this.model.items().createMany(items, this.trx)
  }

  async updateItems(items){

    let currentItems = await this.model
      .items()
      .whereIn('id', items.map(item => item.id))
      .fetch()

      //deleta os itens que o user não quer mais
      await this.model
      .items()
      .whereNotIn('id', items.map(item => item.id))
      .delete(this.trx)

      //atualiza os valores e quantidades
      await Promise.all(currentItems.rows.map(async item =>{
        item.find(items.filter(n => n.id === item.id))

        await item.save(this.trx)
      }))
  }

  //verificador se o cupom não esta associado a produtos e clientes especifico
  async canApplyDiscount(coupon){
    const couponProducts = await Database.from('coupon_products')
      .where('coupon_id', coupon_id)
      .pluck('product_id')

      const couponClients = await Database.from('coupon_user')
        .where('coupon_id', coupon_id)
        .pluck('user_id')

        if(Array.isArray(couponProducts) && couponProducts-length < 1 && Array.isArray(couponClients) && couponClients < 1){

          /**
           * Caso nao esteja associado a cliente ou produto especifico, é de uso livre
           */

           return true
        }
  }



}

module.exports = OrderService
