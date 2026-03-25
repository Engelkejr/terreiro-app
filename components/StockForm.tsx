'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { itemEstoqueSchema, type ItemEstoqueForm } from '@/lib/validators'
import { Save, X } from 'lucide-react'

const CATEGORIAS = ['Vela','Incenso','Erva','Alimento','Roupa Ritual','Material de Limpeza','Outros'] as const
const UNIDADES = ['unidade(s)', 'kg', 'g', 'litro(s)', 'ml', 'pacote(s)', 'caixa(s)', 'maço(s)']

const defaultForm: ItemEstoqueForm = {
  nome: '', categoria: 'Vela', quantidade: 0,
  unidade: 'unidade(s)', quantidade_minima: 5, descricao: '',
}

export default function StockForm({ item }: { item?: Partial<ItemEstoqueForm> }) {
  const router = useRouter()
  const [form, setForm] = useState<ItemEstoqueForm>({ ...defaultForm, ...item })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'erro'>('idle')

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => { const n = { ...prev }; delete n[name]; return n })
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = itemEstoqueSchema.safeParse(form)
    if (!result.success) {
      const errs: Record<string, string> = {}
      result.error.errors.forEach(e => { errs[e.path[0]] = e.message })
      setErrors(errs)
      return
    }
    setStatus('loading')
    try {
      const res = await fetch('/api/estoque', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })
      if (!res.ok) throw new Error()
      router.push('/estoque')
      router.refresh()
    } catch {
      setStatus('erro')
    }
  }

  return (
    <form onSubmit={submit} className="card p-6 max-w-2xl">
      <div className="grid md:grid-cols-2 gap-5">

        <div className="md:col-span-2">
          <label className="label">Nome do item *</label>
          <input name="nome" value={form.nome} onChange={handle}
            placeholder="Ex: Vela branca 7 dias" className="input" />
          {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
        </div>

        <div>
          <label className="label">Categoria *</label>
          <select name="categoria" value={form.categoria} onChange={handle} className="input">
            {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="label">Unidade de medida *</label>
          <select name="unidade" value={form.unidade} onChange={handle} className="input">
            {UNIDADES.map(u => <option key={u}>{u}</option>)}
          </select>
        </div>

        <div>
          <label className="label">Quantidade atual *</label>
          <input type="number" name="quantidade" value={form.quantidade} onChange={handle}
            min="0" className="input" />
          {errors.quantidade && <p className="text-red-500 text-xs mt-1">{errors.quantidade}</p>}
        </div>

        <div>
          <label className="label">Quantidade mínima (alerta)</label>
          <input type="number" name="quantidade_minima" value={form.quantidade_minima}
            onChange={handle} min="0" className="input" />
          <p className="text-xs text-terreiro-400 mt-1">Abaixo disso aparece alerta no dashboard.</p>
        </div>

        <div className="md:col-span-2">
          <label className="label">Descrição</label>
          <textarea name="descricao" value={form.descricao ?? ''} onChange={handle}
            rows={2} placeholder="Informações adicionais sobre o item..."
            className="input resize-none" />
        </div>
      </div>

      <div className="flex items-center gap-3 mt-6 pt-5 border-t border-terreiro-100">
        <button type="submit" disabled={status === 'loading'} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          {status === 'loading' ? 'Salvando...' : 'Salvar item'}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-secondary flex items-center gap-2">
          <X className="w-4 h-4" /> Cancelar
        </button>
        {status === 'erro' && <p className="text-red-500 text-sm">Erro ao salvar.</p>}
      </div>
    </form>
  )
}
