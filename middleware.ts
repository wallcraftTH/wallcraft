import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host');
  
  // ถ้าคนเข้าเว็บมาจากชื่อ .vercel.app ให้ไล่ไปที่โดเมนหลักทันที
  if (host && host.includes('vercel.app')) {
    return NextResponse.redirect('https://www.wallcraftthailand.com' + request.nextUrl.pathname, 301);
  }
  
  return NextResponse.next();
}