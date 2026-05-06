import type { ProductInsert, ProductRow, ProductUpdate } from "./product.type";
import type { UmkmInsert, UmkmRow, UmkmUpdate } from "./umkm.type";
import type { LogInsert, LogRow, LogUpdate } from "./logs.type";

export type Database = {
  public: {
    Tables: {
      umkm: {
        Row: UmkmRow;
        Insert: UmkmInsert;
        Update: UmkmUpdate;
        Relationships: [];
      };
      products: {
        Row: ProductRow;
        Insert: ProductInsert;
        Update: ProductUpdate;
        Relationships: [
          {
            foreignKeyName: "products_umkm_id_fkey";
            columns: ["umkm_id"];
            isOneToOne: false;
            referencedRelation: "umkm";
            referencedColumns: ["id"];
          },
        ];
      };
      logs: {
        Row: LogRow;
        Insert: LogInsert;
        Update: LogUpdate;
        Relationships: [];
      };
    };
    // Update these 4 lines to match Supabase's native expectations
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
