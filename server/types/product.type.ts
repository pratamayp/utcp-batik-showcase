/* eslint-disable @typescript-eslint/no-explicit-any */
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
  images: any;
  ringkasan: string;
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
  images: any;
  ringkasan: string;
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
  images?: any;
  ringkasan?: string;
}
