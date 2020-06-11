'use strict'

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



}

module.exports = OrderService
