// app/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// ดึงค่ามาพักไว้ก่อน
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const urlBall = process.env.NEXT_PUBLIC_SUPABASE_URLBALL;
const keyBall = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEYBALL;

// ตรวจสอบความพร้อมของกุญแจ
if (!url || !key) {
  console.warn("⚠️ คีย์มาตรฐาน (ชุดเพื่อน) หายไปจาก .env.local");
}

if (!urlBall || !keyBall) {
  console.warn("⚠️ คีย์ BALL (ชุดนาย) หายไปจาก .env.local");
}

// สร้าง Client แบบเช็กเงื่อนไข (เพื่อไม่ให้หน้าเว็บล่มตอน Evaluate)
export const supabase = (url && key) 
  ? createClient(url, key) 
  : null as any;

export const supabaseBall = (urlBall && keyBall) 
  ? createClient(urlBall, keyBall) 
  : null as any;