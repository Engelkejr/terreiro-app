import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import StockTable from '@/components/StockTable'
import { Package, Plus } from 'lucide-react'

async function getEstoque() {
  const { data, error } = await supabase
    .from('estoque')
    .select('*')
    .order('nome')
  if (error) throw error
  return data ?? []
}

export default async function EstoquePage() {
  const itens = await getEstoque()

  return (
    <div>
      <div className="page-header flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-terreiro-500" />
            <h1 className="page-title">Estoque de Caridade</h1>
          </div>
          <p className="page-subtitle">Controle de materiais, velas, ervas e itens rituais</p>
        </div>
        <Link href="/estoque/novo" className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Novo item
        </Link>
      </div>

      <StockTable itens={itens} />
    </div>
  )
}
