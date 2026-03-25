import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { itemEstoqueSchema } from '@/lib/validators'

export async function GET() {
  const { data, error } = await supabase
    .from('estoque')
    .select('*')
    .order('nome')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = await req.json()
  const result = itemEstoqueSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 422 })
  }

  const { data, error } = await supabase
    .from('estoque')
    .insert([result.data])
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data, { status: 201 })
}

export async function PATCH(req: Request) {
  const { id, ...body } = await req.json()
  if (!id) return NextResponse.json({ error: 'id obrigatório' }, { status: 400 })

  const { data, error } = await supabase
    .from('estoque')
    .update({ ...body, atualizado_em: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}
