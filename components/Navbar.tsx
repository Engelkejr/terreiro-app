'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Users, Package, LayoutDashboard, Flame } from 'lucide-react'

const links = [
  { href: '/',         label: 'Dashboard', icon: LayoutDashboard },
  { href: '/membros',  label: 'Membros',   icon: Users },
  { href: '/estoque',  label: 'Estoque',   icon: Package },
]

export default function Navbar() {
  const path = usePathname()

  return (
    <nav className="bg-white border-b border-terreiro-200 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center h-16 gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-terreiro-600 flex items-center justify-center">
              <Flame className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-terreiro-900 text-sm leading-tight">
              Terreiro<br />
              <span className="font-normal text-terreiro-500 text-xs">Gestão</span>
            </span>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-1">
            {links.map(({ href, label, icon: Icon }) => {
              const active = path === href || (href !== '/' && path.startsWith(href))
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-terreiro-100 text-terreiro-800'
                      : 'text-terreiro-500 hover:text-terreiro-800 hover:bg-terreiro-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              )
            })}
          </div>

          {/* ODS badge */}
          <div className="ml-auto">
            <span className="badge badge-purple text-xs">ODS 10</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
