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