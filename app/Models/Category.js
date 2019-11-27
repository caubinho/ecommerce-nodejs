'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
  /**
   * relacionamento entre Categoria e Imagem destaque
   * /
   **/

  image(){
    return this.belongsTo('App/Models/Image')
  }

   /**
   * relacionamento entre Categoria e Produtos
   * /
   **/

   products(){
     return this.belongsToMany('App/Models/Product')
   }

}

module.exports = Category
