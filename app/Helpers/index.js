'use strict'

const crypto = use('crypto')
const Helpers = use('Helpers')

/**
 * Generate randon string
 *
 * @param {int} length - O tamanho da string que quer gerar
 * @return { string } uma string randomica do tamanho length
 */

 const str_random = async ( length = 40) => {

  let string = ''

  let len = string.length

  if(len < length){

    let size = length - len
    let bytes = await crypto.randomBytes(size)

    let buffer = Buffer.from(bytes)

    string += buffer
      .toString('base64')
      .replace(/[^a-zA-Z0-9]/g, '')
      .substr(0, size)

  }

  return string

 }

 /**
  * Move um unico arquivo para um caminho especificado, se nenhum for especificado
  * @param { FileJar } file o arquivo a ser gerenciado
  * @param { string } path o caminho para onde arqivo deve ser movido
  */

  const manage_single_upload = async (file, path = null) => {
    path = path ? path: Helpers.publicPath('uploads')

    //gera um nome aleatorio
    const random_name = await str_random(30)

    let filename = `${new Date().getTime()}-${random_name}.${file.subtype}`

    //renomeia o arquivo e move ele para o path

    await file.move(path, {
      name: filename
    })

    return file

  }

 module.exports = {
   str_random
 }
