'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { membroSchema, type MembroForm } from '@/lib/validators'
import { Save, X } from 'lucide-react'

const FUNCOES = ['Filho de Santo', 'Ogã', 'Ekede', 'Visitante', 'Zelador(a) de Orixá'] as const
const ORIXAS = ['Exu', 'Ogum', 'Oxóssi', 'Xangô', 'Oxalá', 'Iemanjá', 'Oxum', 'Iansã', 'Omolu', 'Nanã', 'Oxumaré', 'Ossanhe', 'Logunedé', 'Outro']

const defaultForm: MembroForm = {
  nome: '', data_nascimento: '', telefone: '', email: '',
  funcao: 'Visitante', orixo_cabeca: '',
  data_ingresso: new Date().toISOString().split('T')[0],
  ativo: true, observacoes: '',
}

export default function MemberForm({ membro }: { membro?: Partial<MembroForm> }) {
  const router = useRouter()
  const [form, setForm] = useState<MembroForm>({ ...defaultForm, ...membro })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'erro'>('idle')

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setForm(prev => ({ ...prev, [name]: val }))
    if (errors[name]) setErrors(prev => { const n = { ...prev }; delete n[name]; return n })
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = membroSchema.safeParse(form)
    if (!result.success) {
      const errs: Record<string, string> = {}
      result.error.errors.forEach(e => { errs[e.path[0]] = e.message })
      setErrors(errs)
      return
    }
    setStatus('loading')
    try {
      const res = await fetch('/api/membros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })
      if (!res.ok) throw new Error()
      router.push('/membros')
      router.refresh()
    } catch {
      setStatus('erro')
    }
  }

  return (
    <form onSubmit={submit} className="card p-6 max-w-2xl">
      <div className="grid md:grid-cols-2 gap-5">

        {/* Nome */}
        <div className="md:col-span-2">
          <label className="label">Nome completo *</label>
          <input name="nome" value={form.nome} onChange={handle}
            placeholder="Ex: Maria de Iemanjá" className="input" />
          {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
        </div>

        {/* Nascimento */}
        <div>
          <label className="label">Data de nascimento</label>
          <input type="date" name="data_nascimento" value={form.data_nascimento ?? ''} onChange={handle} className="input" />
        </div>

        {/* Ingresso */}
        <div>
          <label className="label">Data de ingresso *</label>
          <input type="date" name="data_ingresso" value={form.data_ingresso} onChange={handle} className="input" />
          {errors.data_ingresso && <p className="text-red-500 text-xs mt-1">{errors.data_ingresso}</p>}
        </div>

        {/* Telefone */}
        <div>
          <label className="label">Telefone</label>
          <input name="telefone" value={form.telefone ?? ''} onChange={handle}
            placeholder="(21) 99999-9999" className="input" />
        </div>

        {/* Email */}
        <div>
          <label className="label">Email</label>
          <input type="email" name="email" value={form.email ?? ''} onChange={handle}
            placeholder="email@exemplo.com" className="input" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Função */}
        <div>
          <label className="label">Função no Terreiro *</label>
          <select name="funcao" value={form.funcao} onChange={handle} className="input">
            {FUNCOES.map(f => <option key={f}>{f}</option>)}
          </select>
        </div>

        {/* Orixá */}
        <div>
          <label className="label">Orixá de cabeça</label>
          <select name="orixo_cabeca" value={form.orixo_cabeca ?? ''} onChange={handle} className="input">
            <option value="">— Selecione —</option>
            {ORIXAS.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>

        {/* Ativo */}
        <div className="md:col-span-2 flex items-center gap-3">
          <input type="checkbox" id="ativo" name="ativo"
            checked={form.ativo} onChange={handle}
            className="w-4 h-4 accent-terreiro-600 rounded" />
          <label htmlFor="ativo" className="text-sm font-medium text-terreiro-800 cursor-pointer">
            Membro ativo na comunidade
          </label>
        </div>

        {/* Observações */}
        <div className="md:col-span-2">
          <label className="label">Observações</label>
          <textarea name="observacoes" value={form.observacoes ?? ''} onChange={handle}
            rows={3} placeholder="Informações adicionais sobre o membro..."
            className="input resize-none" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-6 pt-5 border-t border-terreiro-100">
        <button type="submit" disabled={status === 'loading'} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          {status === 'loading' ? 'Salvando...' : 'Cadastrar membro'}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-secondary flex items-center gap-2">
          <X className="w-4 h-4" /> Cancelar
        </button>
        {status === 'erro' && (
          <p className="text-red-500 text-sm">Erro ao salvar. Verifique a conexão.</p>
        )}
      </div>
    </form>
  )
}
