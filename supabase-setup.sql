-- Run once in Supabase SQL Editor. All items belong to the signed-in account.
create table if not exists public.closet_items (
 id uuid primary key,
 owner_id uuid not null references auth.users(id) on delete cascade,
 person text not null check (person in ('wife','husband')),
 name text not null check (char_length(name) between 1 and 100),
 category text not null,
 subcategory text,
 details text,
 photo_path text,
 created_at timestamptz not null default now()
);
create index if not exists closet_items_owner_idx on public.closet_items(owner_id);
alter table public.closet_items enable row level security;
create policy "owners read closet" on public.closet_items for select to authenticated using (owner_id = (select auth.uid()));
create policy "owners add closet" on public.closet_items for insert to authenticated with check (owner_id = (select auth.uid()));
create policy "owners edit closet" on public.closet_items for update to authenticated using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()));
create policy "owners delete closet" on public.closet_items for delete to authenticated using (owner_id = (select auth.uid()));
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('closet-photos','closet-photos',false,10485760,array['image/jpeg'])
on conflict (id) do update set public=false, file_size_limit=10485760, allowed_mime_types=array['image/jpeg'];
create policy "owners upload closet photos" on storage.objects for insert to authenticated with check (bucket_id='closet-photos' and (storage.foldername(name))[1]=(select auth.uid())::text);
create policy "owners read closet photos" on storage.objects for select to authenticated using (bucket_id='closet-photos' and (storage.foldername(name))[1]=(select auth.uid())::text);
create policy "owners remove closet photos" on storage.objects for delete to authenticated using (bucket_id='closet-photos' and (storage.foldername(name))[1]=(select auth.uid())::text);
