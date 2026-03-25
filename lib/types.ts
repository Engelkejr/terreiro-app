export type FuncaoMembro =
  | 'Filho de Santo'
  | 'Ogã'
  | 'Ekede'
  | 'Visitante'
  | 'Zelador(a) de Orixá'

export interface Membro {
  id?: string
  nome: string
  data_nascimento?: string
  telefone?: string
  email?: string
  funcao: FuncaoMembro
  orixo_cabeca?: string
  data_ingresso: string
  ativo: boolean
  observacoes?: string
  criado_em?: string
}

export type CategoriaEstoque =
  | 'Vela'
  | 'Incenso'
  | 'Erva'
  | 'Alimento'
  | 'Roupa Ritual'
  | 'Material de Limpeza'
  | 'Outros'

export interface ItemEstoque {
  id?: string
  nome: string
  categoria: CategoriaEstoque
  quantidade: number
  unidade: string
  quantidade_minima: number
  descricao?: string
  criado_em?: string
  atualizado_em?: string
}

export interface DashboardStats {
  total_membros: number
  membros_ativos: number
  total_itens_estoque: number
  itens_criticos: number
}
