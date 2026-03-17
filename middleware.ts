import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const hostname = request.headers.get('host')

  // ถ้าใครเข้าผ่าน .vercel.app ให้เด้งกลับไปที่โดเมนจริงทันที
  if (hostname?.includes('.vercel.app')) {
    return NextResponse.redirect(`https://www.wallcraftthailand.com${url.pathname}`, 301)
  }

  return NextResponse.next()
}