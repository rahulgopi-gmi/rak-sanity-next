// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const slug = body?.slug?.current  

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  revalidatePath(`/${slug}`);
  return NextResponse.json({ revalidated: true })
}
