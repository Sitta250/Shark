-- ─── Notes ───────────────────────────────────────────────────
create table if not exists notes (
  id          uuid        primary key default gen_random_uuid(),
  project_id  uuid        not null references projects(id) on delete cascade,
  title       text        not null,
  content     text        not null default '',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger notes_updated_at
  before update on notes
  for each row execute function update_updated_at();

alter table notes enable row level security;

create policy "notes_select" on notes
  for select using (
    exists (select 1 from projects where projects.id = notes.project_id and projects.user_id = auth.uid())
  );
create policy "notes_insert" on notes
  for insert with check (
    exists (select 1 from projects where projects.id = notes.project_id and projects.user_id = auth.uid())
  );
create policy "notes_update" on notes
  for update using (
    exists (select 1 from projects where projects.id = notes.project_id and projects.user_id = auth.uid())
  );
create policy "notes_delete" on notes
  for delete using (
    exists (select 1 from projects where projects.id = notes.project_id and projects.user_id = auth.uid())
  );
