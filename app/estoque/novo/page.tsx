import StockForm from '@/components/StockForm'
import { ChevronLeft, PackagePlus } from 'lucide-react'
import Link from 'next/link'

export default function NovoItemPage() {
  return (
    <div>
      <div className="page-header">
        <Link href="/estoque" className="flex items-center gap-1 text-sm text-terreiro-500 hover:text-terreiro-700 mb-4">
          <ChevronLeft className="w-4 h-4" /> Voltar para estoque
        </Link>
        <div className="flex items-center gap-2">
          <PackagePlus className="w-5 h-5 text-terreiro-500" />
          <h1 className="page-title">Adicionar item ao estoque</h1>
        </div>
        <p className="page-subtitle">Registre um novo material, vela, erva ou item ritual</p>
      </div>
      <StockForm />
    </div>
  )
}
