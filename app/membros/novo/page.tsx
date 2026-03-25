import MemberForm from '@/components/MemberForm'
import { ChevronLeft, UserPlus } from 'lucide-react'
import Link from 'next/link'

export default function NovoMembroPage() {
  return (
    <div>
      <div className="page-header">
        <Link href="/membros" className="flex items-center gap-1 text-sm text-terreiro-500 hover:text-terreiro-700 mb-4">
          <ChevronLeft className="w-4 h-4" /> Voltar para membros
        </Link>
        <div className="flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-terreiro-500" />
          <h1 className="page-title">Cadastrar membro</h1>
        </div>
        <p className="page-subtitle">Preencha os dados do novo membro da comunidade</p>
      </div>

      <MemberForm />
    </div>
  )
}
