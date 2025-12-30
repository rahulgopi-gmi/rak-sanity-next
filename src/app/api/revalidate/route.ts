// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const slug = body?.slug?.current

  if (slug) {
      revalidateTag(`campaigns:${slug}`, 'max')
  }

  return NextResponse.json({ revalidated: true })
}
