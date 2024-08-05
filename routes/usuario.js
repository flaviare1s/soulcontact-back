import { Usuario } from "../models/usuario.js"
import { Router } from "express"
import { usuarioValidation } from "../utils/validations.js"

export const usuariosRouter = Router()

usuariosRouter.post('/usuarios', async (req, res) => {
  const { error, value } = usuarioValidation.validate(req.body, { abortEarly: false })

  if (error) {
    res.status(400).json({message: 'Dados inválidos', error: error.details})
    return
  }

  const { nome, email, senha } = value

  try {
    const novoUsuario = new Usuario({nome, email, senha})
    await novoUsuario.save()
    res.json({message: 'Usário criado com sucesso!'})
  } catch (err) {
    console.log(err)
    res.status(500).json({message: 'Um erro ocorreu ao criar o usuário'})
  }
})

usuariosRouter.get('/usuarios', async (req, res) => {
  const lista = await Usuario.find()
  res.json(lista)
})

usuariosRouter.get('/usuarios/:id', async (req, res) => {
  const usuario = await Usuario.findById(req.params.id) 

  if (usuario) {
    res.json(usuario)
  } else {  
    res.status(404).json({message: 'Usário não encontrado'})
  }
})

usuariosRouter.put('/usuarios/:id', async (req, res) => {
  const { error, value } = usuarioValidation.validate(req.body, { abortEarly: false })

  if (error) {
    res.status(400).json({message: 'Dados inválidos', error: error.details})
    return
  }

  const { nome, email, senha } = value

  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, {nome, email, senha})  

    if (usuario) {
      res.json({message: 'Usário atualizado com sucesso!'})
    } else {
      res.status(404).json({message: 'Usário não encontrado'})
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({message: 'Um erro ocorreu ao atualizar o usuário', error: err})
  }
})

usuariosRouter.delete('/usuarios/:id', async (req, res) => {
  const deletado = await Usuario.findByIdAndDelete(req.params.id)
  if (deletado) {
    res.json({message: 'Usário excluído com sucesso!'})
  } else {
    res.status(404).json({message: 'Usário não encontrado'})
  }
})
