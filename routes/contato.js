import { Contato } from "../models/contato.js"
import { contatoUpdateValidation, contatoValidation } from "../utils/validations.js"
import { Router } from "express"

export const contatosRouter = Router()

// INSERÇÃO DE CONTATO [POST]
contatosRouter.post('/contatos', async (req, res) => {
  const { error, value } = contatoValidation.validate(req.body, { abortEarly: false })

  if (error) {
    res.status(400).json({message: 'Dados inválidos', error: error.details})
    return
  }

  const { nome, sobrenome, email, telefone, observacoes, favorito } = value

  try {
    const novoContato = new Contato({nome, sobrenome, email, telefone, observacoes, favorito})
    await novoContato.save()
    res.json({message: 'Contato criado com sucesso!'})
  } catch (err) {
    console.log(err)
    res.status(500).json({message: 'Um erro ocorreu ao criar o contato'})
  }
})

// LISTAGEM DE CONTATOS [GET]
contatosRouter.get('/contatos', async (req, res) => {
  const lista = await Contato.find()
  res.json(lista)
})

contatosRouter.get('/contatos/:id', async (req, res) => {
  const contato = await Contato.findById(req.params.id).select('-__v')

  if (contato) {
    res.json(contato)
  } else {
    res.status(404).json({message: 'Contato não encontrado'})
  }
})

// ATUALIZACAO DE CONTATO [PUT]
contatosRouter.put('/contatos/:id', async (req, res) => {
  const { error, value } = contatoUpdateValidation.validate(req.body, { abortEarly: false })

  if (error) {
    res.status(400).json({message: 'Dados inválidos', error: error.details})
    return
  }

  const { nome, sobrenome, email, telefone, observacoes, favorito } = value

  try {
    const contato = await Contato.findByIdAndUpdate(req.params.id, {nome, sobrenome, email, telefone, observacoes, favorito})

    if (contato) {
      res.json({message: 'Contato atualizado com sucesso!'})
    } else {
      res.status(404).json({message: 'Contato não encontrado'})
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({message: 'Um erro ocorreu ao atualizar o contato', error: err})
  }
})

// EXCLUSÃO DE CONTATO [DELETE]
contatosRouter.delete('/contatos/:id', async (req, res) => {

  try {
    const contato =await Contato.findByIdAndDelete(req.params.id)

    if (contato) {
      res.json({message: 'Contato excluído com sucesso!'})
    } else {
      res.status(404).json({message: 'Contato não encontrado'})
    }

  } catch (err) {
    res.status(500).json({message: 'Um erro ocorreu ao excluir o contato', error: err})
  }
})