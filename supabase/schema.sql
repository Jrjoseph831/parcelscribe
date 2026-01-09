-- =============================
-- Parcelscribe Supabase Schema
-- =============================

-- Enums
CREATE TYPE carrier_t AS ENUM ('ups', 'fedex');
CREATE TYPE issue_type_t AS ENUM ('damaged', 'lost', 'missing_contents');
CREATE TYPE filer_role_t AS ENUM ('shipper', 'recipient', 'third_party');
CREATE TYPE claim_stage_t AS ENUM ('new_claim', 'denied_need_appeal');
CREATE TYPE packet_status_t AS ENUM ('draft', 'generated', 'paid');
CREATE TYPE file_kind_t AS ENUM (
  'proof_of_value',
  'damage_photo',
  'packaging_photo',
  'proof_of_delivery',
  'other_supporting',
  'packet_pdf'
);
CREATE TYPE payment_status_t AS ENUM ('initiated', 'paid', 'failed', 'refunded');

-- Tables
CREATE TABLE packets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  carrier carrier_t NOT NULL,
  issue_type issue_type_t NOT NULL,
  filer_role filer_role_t NOT NULL,
  claim_stage claim_stage_t NOT NULL DEFAULT 'new_claim',
  tracking_number text NOT NULL,
  ship_date date NOT NULL,
  delivery_date date NULL,
  origin_text text NOT NULL,
  destination_text text NOT NULL,
  service_level text NULL,
  declared_value numeric NULL,
  item_description text NOT NULL,
  item_qty integer NOT NULL CHECK (item_qty >= 1),
  item_value_total numeric NOT NULL CHECK (item_value_total > 0),
  shipping_cost numeric NULL CHECK (shipping_cost IS NULL OR shipping_cost >= 0),
  tax numeric NULL CHECK (tax IS NULL OR tax >= 0),
  requested_amount numeric NOT NULL CHECK (requested_amount > 0),
  is_insured text NULL CHECK (is_insured IS NULL OR is_insured IN ('yes','no','not_sure')),
  user_notes text NULL,
  narrative text NULL,
  status packet_status_t NOT NULL DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE packet_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  packet_id uuid REFERENCES packets(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  kind file_kind_t NOT NULL,
  storage_path text NOT NULL,
  original_name text NULL,
  mime_type text NULL,
  size_bytes bigint NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  packet_id uuid REFERENCES packets(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_checkout_session_id text UNIQUE NOT NULL,
  stripe_payment_intent_id text NULL,
  amount numeric NOT NULL,
  currency text NOT NULL DEFAULT 'usd',
  status payment_status_t NOT NULL DEFAULT 'initiated',
  paid_at timestamptz NULL,
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX idx_packets_user_id ON packets(user_id);
CREATE INDEX idx_packet_files_user_id ON packet_files(user_id);
CREATE INDEX idx_packet_files_packet_id ON packet_files(packet_id);
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_packet_id ON payments(packet_id);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER packets_set_updated_at
BEFORE UPDATE ON packets
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- =============================
-- RLS Policies (see rls.sql)
-- =============================
