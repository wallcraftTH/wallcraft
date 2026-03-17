import { MetadataRoute } from 'next'
import { supabaseBall } from '@/app/lib/supabase' // เช็ค Path ตรงนี้ให้ตรงกับใน lib นะครับ

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.wallcraftthailand.com'

  // 1. หน้าหลักๆ (Static Routes)
  const routes = [
    '',
    '/login',
    '/register',
    '/introduction',
    '/search',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1,
  }))

  // 2. ดึงข้อมูลจาก Supabase มาทำหน้า Dynamic
  const { data: products } = await supabaseBall
    .from('products')
    .select('id, collection')

  // --- ทำแผนที่สำหรับหน้า Collections ---
  const uniqueCollections = Array.from(new Set(products?.map(p => p.collection).filter(Boolean)))
  const collectionRoutes = uniqueCollections.map((col) => ({
    url: `${baseUrl}/collections/${col!.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // --- ทำแผนที่สำหรับหน้า Product รายชิ้น ---
  const productRoutes = (products || []).map((p) => ({
    url: `${baseUrl}/product/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...routes, ...collectionRoutes, ...productRoutes]
}