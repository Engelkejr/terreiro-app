'use client'
import { useState, useMemo } from 'react'
import { ItemEstoque } from '@/lib/types'
import { Search, AlertTriangle, CheckCircle, Package } from 'lucide-react'
import Link from 'next/link'

const CATEGORIAS = ['Todas', 'Vela', 'Incenso', 'Erva', 'Alimento', 'Roupa Ritual', 'Material de Limpeza', 'Outros']

const categoriaBadge: Record<string, string> = {
  'Vela': 'badge-amber', 'Incenso': 'badge-purple', 'Erva': 'badge-green',
  'Alimento': 'badge-blue', 'Roupa Ritual': 'badge-pink',
  'Material de Limpeza': 'badge-blue', 'Outros': 'badge-amber',
}

function StockBar({ atual, minimo }: { atual: number; minimo: number }) {
  const max = Math.max(atual, minimo * 2, 1)
  const pct = Math.min((atual / max) * 100, 100)
  const critico = atual <= minimo
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-terreiro-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${critico ? 'bg-red-400' : 'bg-green-400'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={`text-xs font-medium tabular-nums ${critico ? 'text-red-600' : 'text-terreiro-600'}`}>
        {atual}
      </span>
    </div>
  )
}

export default function StockTable({ itens }: { itens: ItemEstoque[] }) {
  const [search, setSearch] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas')
  const [alertaFiltro, setAlertaFiltro] = useState(false)

  const filtered = useMemo(() => {
    return itens.filter(i => {
      const matchSearch = i.nome.toLowerCase().includes(search.toLowerCase())
      const matchCat = categoriaFiltro === 'Todas' || i.categoria === categoriaFiltro
      const matchAlerta = !alertaFiltro || i.quantidade <= i.quantidade_minima
      return matchSearch && matchCat && matchAlerta
    })
  }, [itens, search, categoriaFiltro, alertaFiltro])

  const criticos = itens.filter(i => i.quantidade <= i.quantidade_minima).length

  return (
    <div>
      {criticos > 0 && (
        <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
          <p className="text-sm text-amber-800 font-medium">
            {criticos} {criticos === 1 ? 'item está' : 'itens estão'} abaixo do estoque mínimo.
          </p>
          <button onClick={() => setAlertaFiltro(true)}
            className="ml-auto text-xs text-amber-700 underline">Ver itens críticos</button>
        </div>
      )}

      <div className="card p-4 mb-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-terreiro-300" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar item..." className="input pl-9" />
        </div>
        <select value={categoriaFiltro} onChange={e => setCategoriaFiltro(e.target.value)} className="input w-auto">
          {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
        </select>
        <button onClick={() => setAlertaFiltro(v => !v)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
            alertaFiltro ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-white border-terreiro-200 text-terreiro-500'
          }`}>
          <AlertTriangle className="w-3.5 h-3.5" />
          Somente críticos
        </button>
        <span className="text-xs text-terreiro-400 ml-auto">
          {filtered.length} de {itens.length} itens
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="card p-12 text-center text-terreiro-400">
          <Package className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">Nenhum item encontrado</p>
          <p className="text-sm mt-1">
            <Link href="/estoque/novo" className="text-terreiro-600 underline">Adicione um item ao estoque</Link>
          </p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead className="bg-terreiro-50 border-b border-terreiro-100">
              <tr>
                <th className="table-th">Item</th>
                <th className="table-th hidden md:table-cell">Categoria</th>
                <th className="table-th">Quantidade</th>
                <th className="table-th hidden lg:table-cell">Mínimo</th>
                <th className="table-th">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(i => {
                const critico = i.quantidade <= i.quantidade_minima
                return (
                  <tr key={i.id} className="table-row">
                    <td className="table-td">
                      <div className="font-medium text-terreiro-900">{i.nome}</div>
                      {i.descricao && <div className="text-xs text-terreiro-400 truncate max-w-xs">{i.descricao}</div>}
                    </td>
                    <td className="table-td hidden md:table-cell">
                      <span className={`badge ${categoriaBadge[i.categoria] ?? 'badge-amber'}`}>
                        {i.categoria}
                      </span>
                    </td>
                    <td className="table-td min-w-[120px]">
                      <StockBar atual={i.quantidade} minimo={i.quantidade_minima} />
                      <div className="text-xs text-terreiro-400 mt-0.5">{i.unidade}</div>
                    </td>
                    <td className="table-td hidden lg:table-cell text-terreiro-500">
                      {i.quantidade_minima} {i.unidade}
                    </td>
                    <td className="table-td">
                      {critico
                        ? <span className="badge badge-red flex items-center gap-1"><AlertTriangle className="w-3 h-3" />Crítico</span>
                        : <span className="badge badge-green flex items-center gap-1"><CheckCircle className="w-3 h-3" />OK</span>
                      }
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
