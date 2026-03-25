import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { Users, Package, AlertTriangle, Heart, ArrowRight, Plus } from 'lucide-react'

async function getStats() {
  const [membros, estoque] = await Promise.all([
    supabase.from('membros').select('id, ativo'),
    supabase.from('estoque').select('id, quantidade, quantidade_minima'),
  ])

  const totalMembros   = membros.data?.length ?? 0
  const membrosAtivos  = membros.data?.filter(m => m.ativo).length ?? 0
  const totalItens     = estoque.data?.length ?? 0
  const itensCriticos  = estoque.data?.filter(i => i.quantidade <= i.quantidade_minima).length ?? 0

  return { totalMembros, membrosAtivos, totalItens, itensCriticos }
}

export default async function DashboardPage() {
  const stats = await getStats()

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="flex items-center gap-3 mb-2">
          <Heart className="w-6 h-6 text-terreiro-500" />
          <h1 className="page-title">Bem-vindo ao Terreiro Gestão</h1>
        </div>
        <p className="page-subtitle">
          Sistema de gestão comunitária gratuito · Projeto de Extensão Universitária
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="stat-card">
          <Users className="w-5 h-5 text-terreiro-400 mb-1" />
          <span className="stat-value">{stats.totalMembros}</span>
          <span className="stat-label">Total de membros</span>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
            <span className="text-xs text-terreiro-400 font-medium">Ativos</span>
          </div>
          <span className="stat-value text-green-700">{stats.membrosAtivos}</span>
          <span className="stat-label">Membros ativos</span>
        </div>
        <div className="stat-card">
          <Package className="w-5 h-5 text-terreiro-400 mb-1" />
          <span className="stat-value">{stats.totalItens}</span>
          <span className="stat-label">Itens em estoque</span>
        </div>
        <div className="stat-card border-amber-200">
          <AlertTriangle className="w-5 h-5 text-amber-400 mb-1" />
          <span className="stat-value text-amber-600">{stats.itensCriticos}</span>
          <span className="stat-label">Itens em alerta</span>
        </div>
      </div>

      {/* Quick actions */}
      <h2 className="text-base font-semibold text-terreiro-700 mb-4">Ações rápidas</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        <div className="card p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-terreiro-900 mb-1">Cadastro de Membros</h3>
              <p className="text-sm text-terreiro-500">Registre filhos de santo, ogãs, ekedes e visitantes da comunidade.</p>
            </div>
            <Users className="w-8 h-8 text-terreiro-200 shrink-0" />
          </div>
          <div className="flex gap-3 mt-4">
            <Link href="/membros/novo" className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" /> Novo membro
            </Link>
            <Link href="/membros" className="btn-secondary flex items-center gap-2">
              Ver todos <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-terreiro-900 mb-1">Estoque de Caridade</h3>
              <p className="text-sm text-terreiro-500">Gerencie velas, ervas, alimentos e materiais rituais da comunidade.</p>
            </div>
            <Package className="w-8 h-8 text-terreiro-200 shrink-0" />
          </div>
          <div className="flex gap-3 mt-4">
            <Link href="/estoque/novo" className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" /> Novo item
            </Link>
            <Link href="/estoque" className="btn-secondary flex items-center gap-2">
              Ver estoque <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* ODS Banner */}
      <div className="card p-6 bg-gradient-to-r from-purple-50 to-terreiro-50 border-purple-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-700 text-white flex items-center justify-center text-lg font-bold shrink-0">
            10
          </div>
          <div>
            <h3 className="font-semibold text-purple-900 mb-1">ODS 10 — Redução das Desigualdades</h3>
            <p className="text-sm text-purple-700 leading-relaxed">
              Este sistema oferece tecnologia de gestão gratuita para comunidades religiosas de matriz africana,
              historicamente marginalizadas do acesso a ferramentas digitais. Ao digitalizar o cadastro e o
              controle de recursos, fortalece a capacidade institucional do terreiro para reivindicar direitos
              culturais e acessar editais públicos.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
