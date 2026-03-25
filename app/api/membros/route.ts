import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { membroSchema } from '@/lib/validators'

export async function GET() {
  const { data, error } = await supabase
    .from('membros')
    .select('*')
    .order('nome')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = await req.json()
  const result = membroSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 422 })
  }

  const { data, error } = await supabase
    .from('membros')
    .insert([result.data])
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data, { status: 201 })
}
