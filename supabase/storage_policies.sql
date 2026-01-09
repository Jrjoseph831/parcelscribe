-- =============================
-- Parcelscribe Supabase Storage Policies
-- =============================
-- Assumes buckets: claim_uploads, claim_packets (private)

-- Allow users to access only their own files in these buckets
CREATE POLICY "Users can access their own uploads" ON storage.objects
  FOR ALL
  USING (
    bucket_id IN ('claim_uploads', 'claim_packets')
    AND split_part(name, '/', 1) = auth.uid()::text
  );
