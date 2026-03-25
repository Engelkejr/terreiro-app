'use client'
import { useState, useMemo } from 'react'
import { Membro } from '@/lib/types'
import { Search, Filter, UserCheck, UserX } from 'lucide-react'
import Link from 'next/link'

const FUNCOES = ['Todos', 'Filho de Santo', 'Ogã', 'Ekede', 'Visitante', 'Zelador(a) de Orixá']

const funcaoBadge: Record<string, string> = {
  'Filho de Santo':    'badge-amber',
  'Ogã':               'badge-blue',
  'Ekede':             'badge-purple',
  'Visitante':         'badge-green',
  'Zelador(a) de Orixá': 'badge-amber',
}

export default function MemberTable({ membros }: { membros: Membro[] }) {
  const [search, setSearch] = useState('')
  const [funcaoFiltro, setFuncaoFiltro] = useState('Todos')
  const [statusFiltro, setStatusFiltro] = useState<'todos' | 'ativos' | 'inativos'>('todos')

  const filtered = useMemo(() => {
    return membros.filter(m => {
      const matchSearch = m.nome.toLowerCase().includes(search.toLowerCase()) ||
        (m.telefone ?? '').includes(search)
      const matchFuncao = funcaoFiltro === 'Todos' || m.funcao === funcaoFiltro
      const matchStatus = statusFiltro === 'todos'
        ? true
        : statusFiltro === 'ativos' ? m.ativo : !m.ativo
      return matchSearch && matchFuncao && matchStatus
    })
  }, [membros, search, funcaoFiltro, statusFiltro])

  return (
    <div>
      {/* Filters bar */}
      <div className="card p-4 mb-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-terreiro-300" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por nome ou telefone..."
            className="input pl-9"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-terreiro-400" />
          <select value={funcaoFiltro} onChange={e => setFuncaoFiltro(e.target.value)} className="input w-auto">
            {FUNCOES.map(f => <option key={f}>{f}</option>)}
          </select>
        </div>

        <div className="flex rounded-lg border border-terreiro-200 overflow-hidden">
          {(['todos','ativos','inativos'] as const).map(s => (
            <button key={s} onClick={() => setStatusFiltro(s)}
              className={`px-3 py-2 text-xs font-medium capitalize transition-colors ${
                statusFiltro === s
                  ? 'bg-terreiro-600 text-white'
                  : 'bg-white text-terreiro-500 hover:bg-terreiro-50'
              }`}>
              {s}
            </button>
          ))}
        </div>

        <span className="text-xs text-terreiro-400 ml-auto">
          {filtered.length} de {membros.length} membros
        </span>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="card p-12 text-center text-terreiro-400">
          <UserX className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="font-medium">Nenhum membro encontrado</p>
          <p className="text-sm mt-1">Tente ajustar os filtros ou <Link href="/membros/novo" className="text-terreiro-600 underline">cadastre um novo membro</Link>.</p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead className="bg-terreiro-50 border-b border-terreiro-100">
              <tr>
                <th className="table-th">Nome</th>
                <th className="table-th hidden md:table-cell">Função</th>
                <th className="table-th hidden md:table-cell">Orixá</th>
                <th className="table-th hidden lg:table-cell">Ingresso</th>
                <th className="table-th">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(m => (
                <tr key={m.id} className="table-row">
                  <td className="table-td">
                    <div className="font-medium text-terreiro-900">{m.nome}</div>
                    {m.telefone && <div className="text-xs text-terreiro-400">{m.telefone}</div>}
                  </td>
                  <td className="table-td hidden md:table-cell">
                    <span className={`badge ${funcaoBadge[m.funcao] ?? 'badge-amber'}`}>
                      {m.funcao}
                    </span>
                  </td>
                  <td className="table-td hidden md:table-cell text-terreiro-500">
                    {m.orixo_cabeca ?? '—'}
                  </td>
                  <td className="table-td hidden lg:table-cell text-terreiro-500">
                    {m.data_ingresso ? new Date(m.data_ingresso).toLocaleDateString('pt-BR') : '—'}
                  </td>
                  <td className="table-td">
                    <span className={`badge ${m.ativo ? 'badge-green' : 'badge-red'}`}>
                      {m.ativo
                        ? <><UserCheck className="w-3 h-3" /> Ativo</>
                        : <><UserX className="w-3 h-3" /> Inativo</>}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
