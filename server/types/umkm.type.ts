export interface UmkmRow {
  id: number;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  nama: string;
  no_hp: string | null;
  instagram: string | null;
  lokasi: string | null;
  deskripsi: string | null;
}

export interface UmkmInsert {
  id?: number;
  created_at?: string;
  updated_at?: string | null;
  nama: string;
  no_hp?: string | null;
  instagram?: string | null;
  lokasi?: string | null;
  deskripsi?: string | null;
}

export interface UmkmUpdate {
  id?: number;
  created_at?: string;
  updated_at?: string | null;
  nama?: string;
  no_hp?: string | null;
  instagram?: string | null;
  lokasi?: string | null;
  deskripsi?: string | null;
}
