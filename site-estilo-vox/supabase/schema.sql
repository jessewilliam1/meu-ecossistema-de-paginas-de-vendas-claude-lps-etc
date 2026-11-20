-- Rode no Supabase: SQL Editor > New query > Run
create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null unique,
  phone text not null,
  consent_at timestamptz not null,
  utm_source text, utm_medium text, utm_campaign text, utm_content text, referrer text,
  last_seen_at timestamptz not null default now()
);

create table if not exists public.downloads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  material_id text not null,
  material_title text not null,
  category text,
  kind text not null check (kind in ('download','waitlist')),
  utm_source text, utm_medium text, utm_campaign text
);
create index if not exists downloads_lead_idx on public.downloads(lead_id);
create index if not exists downloads_material_idx on public.downloads(material_id);

-- Ninguém acessa as tabelas pelo navegador: só o servidor (service_role).
alter table public.leads enable row level security;
alter table public.downloads enable row level security;

create or replace function public.register_download(
  p_name text, p_email text, p_phone text, p_consent boolean,
  p_material_id text, p_material_title text, p_category text, p_kind text,
  p_utm_source text default null, p_utm_medium text default null,
  p_utm_campaign text default null, p_utm_content text default null, p_referrer text default null
) returns uuid language plpgsql security definer set search_path = public as $$
declare v uuid;
begin
  if not p_consent then raise exception 'consent required'; end if;
  insert into leads (name,email,phone,consent_at,utm_source,utm_medium,utm_campaign,utm_content,referrer)
  values (p_name, lower(p_email), p_phone, now(), p_utm_source, p_utm_medium, p_utm_campaign, p_utm_content, p_referrer)
  on conflict (email) do update set name = excluded.name, phone = excluded.phone, last_seen_at = now()
  returning id into v;
  insert into downloads (lead_id,material_id,material_title,category,kind,utm_source,utm_medium,utm_campaign)
  values (v, p_material_id, p_material_title, p_category, p_kind, p_utm_source, p_utm_medium, p_utm_campaign);
  return v;
end $$;
revoke all on function public.register_download from public, anon, authenticated;
grant execute on function public.register_download to service_role;

-- Visão para vender: quem é o lead e o que ele pegou
create or replace view public.lead_interests with (security_invoker = true) as
select l.id, l.name, l.email, l.phone, l.utm_source, l.created_at,
       count(d.id) as total_acessos,
       array_agg(distinct d.material_title) as materiais,
       max(d.created_at) as ultimo_acesso
from leads l join downloads d on d.lead_id = l.id
group by l.id order by ultimo_acesso desc;
