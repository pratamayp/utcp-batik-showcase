/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LogRow {
  id: number;
  created_at: string;
  type: string;
  path: string | null;
  session_id: string | null;
  metadata: any | null;
}

export interface LogInsert {
  id?: number;
  created_at?: string;
  type: string;
  path?: string | null;
  session_id?: string | null;
  metadata?: any | null;
}

export interface LogUpdate {
  id?: number;
  created_at?: string;
  type?: string;
  path?: string | null;
  session_id?: string | null;
  metadata?: any | null;
}
