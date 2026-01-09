-- =============================
-- Parcelscribe Supabase RLS Policies
-- =============================

-- Enable RLS
ALTER TABLE packets ENABLE ROW LEVEL SECURITY;
ALTER TABLE packet_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Packets policies
CREATE POLICY "Users can manage their own packets" ON packets
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Packet files policies
CREATE POLICY "Users can manage their own packet files" ON packet_files
  FOR SELECT, INSERT, DELETE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Payments policies
CREATE POLICY "Users can read their own payments" ON payments
  FOR SELECT
  USING (auth.uid() = user_id);
-- (Insert/update/delete for payments handled server-side only)
