import type { UmkmRow } from "./umkm.type";

export interface ProductRow {
  id: number;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  nama: string;
  asal_daerah: string;
  deskripsi: string | null;
  filosofi: string | null;
  umkm_id: number;
  images: string[];
  ringkasan: string;
  is_active: boolean;
}

export interface ProductWithUmkm extends ProductRow {
  umkm: UmkmRow;
}

export interface ProductInsert {
  id?: number;
  created_at?: string;
  updated_at?: string | null;
  nama: string;
  asal_daerah: string;
  deskripsi?: string | null;
  filosofi?: string | null;
  umkm_id: number;
  images: string[];
  ringkasan: string;
  is_active?: boolean;
}

export interface ProductUpdate {
  id?: number;
  created_at?: string;
  updated_at?: string | null;
  nama?: string;
  asal_daerah?: string;
  deskripsi?: string | null;
  filosofi?: string | null;
  umkm_id?: number;
  images?: string[];
  ringkasan?: string;
  is_active?: boolean;
}
