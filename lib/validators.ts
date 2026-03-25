import { z } from 'zod'

export const membroSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter ao menos 3 caracteres'),
  data_nascimento: z.string().optional(),
  telefone: z.string().optional(),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  funcao: z.enum(['Filho de Santo', 'Ogã', 'Ekede', 'Visitante', 'Zelador(a) de Orixá']),
  orixo_cabeca: z.string().optional(),
  data_ingresso: z.string().min(1, 'Data de ingresso obrigatória'),
  ativo: z.boolean().default(true),
  observacoes: z.string().optional(),
})

export const itemEstoqueSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter ao menos 2 caracteres'),
  categoria: z.enum(['Vela', 'Incenso', 'Erva', 'Alimento', 'Roupa Ritual', 'Material de Limpeza', 'Outros']),
  quantidade: z.coerce.number().min(0, 'Quantidade não pode ser negativa'),
  unidade: z.string().min(1, 'Unidade obrigatória'),
  quantidade_minima: z.coerce.number().min(0),
  descricao: z.string().optional(),
})

export type MembroForm = z.infer<typeof membroSchema>
export type ItemEstoqueForm = z.infer<typeof itemEstoqueSchema>
