import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')

  // ถ้าเป็นบอทหรือใครก็ตามที่เข้าทาง .vercel.app
  if (hostname?.includes('.vercel.app')) {
    // สั่งยิงทิ้งด้วยรหัส 403 (Forbidden) ทันที! ไม่ต้องเด้งไปไหนแล้ว
    // วิธีนี้กินแรง Vercel น้อยที่สุด และบอก Googlebot ว่า "เว็บนี้ตายแล้ว เลิกสแกนซะ!"
    return new NextResponse('Access Denied: Dead End.', { status: 403 })
  }

  return NextResponse.next()
}