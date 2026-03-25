import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import MemberTable from '@/components/MemberTable'
import { Users, Plus } from 'lucide-react'

async function getMembros() {
  const { data, error } = await supabase
    .from('membros')
    .select('*')
    .order('nome')
  if (error) throw error
  return data ?? []
}

export default async function MembrosPage() {
  const membros = await getMembros()

  return (
    <div>
      <div className="page-header flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-terreiro-500" />
            <h1 className="page-title">Membros</h1>
          </div>
          <p className="page-subtitle">Gerencie os membros da comunidade do terreiro</p>
        </div>
        <Link href="/membros/novo" className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Novo membro
        </Link>
      </div>

      <MemberTable membros={membros} />
    </div>
  )
}
