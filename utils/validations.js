import Joi from 'joi'

// Validação para a inserção de novos contatos
export const contatoValidation = Joi.object({
  nome: Joi.string().max(150).required(),
  sobrenome: Joi.string().max(150),
  email: Joi.string().email().required(),
  telefone: Joi.string().max(20).required(),
  observacoes: Joi.string().max(200),
  favorito: Joi.boolean()
})

// Validação para a atualização de contatos
export const contatoUpdateValidation = Joi.object({
  nome: Joi.string().max(150),
  sobrenome: Joi.string().max(150),
  email: Joi.string().email(),
  telefone: Joi.string().max(20),
  observacoes: Joi.string().max(200),
  favorito: Joi.boolean()
})

// Validação para a inserção de novos usuários
export const usuarioValidation = Joi.object({
  nome: Joi.string().max(150).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().max(15).required()
})
