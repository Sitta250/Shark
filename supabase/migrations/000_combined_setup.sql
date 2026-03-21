-- ═══════════════════════════════════════════════════════════════
-- Shark — combined setup (safe to run on a fresh Supabase project)
-- Run this once in Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- ─── updated_at trigger function ────────────────────────────────
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ─── Profiles ───────────────────────────────────────────────────
create table if not exists profiles (
  id          uuid        primary key references auth.users(id) on delete cascade,
  email       text        not null,
  full_name   text,
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists profiles_updated_at on profiles;
create trigger profiles_updated_at
  before update on profiles
  for each row execute function update_updated_at();

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Backfill: create profiles for any users who signed up before this migration
insert into public.profiles (id, email)
select id, email from auth.users
on conflict (id) do nothing;

-- ─── Projects ───────────────────────────────────────────────────
create table if not exists projects (
  id               uuid        primary key default gen_random_uuid(),
  user_id          uuid        not null references profiles(id) on delete cascade,
  name             text        not null,
  description      text        not null default '',
  country          text        not null default '',
  target_customer  text        not null default '',
  stage            text        not null default 'idea'
                               check (stage in ('idea','validation','building','launched','scaling')),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

drop trigger if exists projects_updated_at on projects;
create trigger projects_updated_at
  before update on projects
  for each row execute function update_updated_at();

-- ─── Project Inputs ─────────────────────────────────────────────
create table if not exists project_inputs (
  id               uuid        primary key default gen_random_uuid(),
  project_id       uuid        not null references projects(id) on delete cascade,
  idea             text        not null default '',
  problem          text        not null default '',
  target_customer  text        not null default '',
  country          text        not null default '',
  business_type    text        not null default '',
  stage            text        not null default '',
  budget           text        not null default '',
  timeline         text        not null default '',
  goal             text        not null default '',
  raw_json         jsonb,
  current_step     integer     not null default 1,
  is_complete      boolean     not null default false,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  constraint project_inputs_project_id_key unique (project_id)
);

drop trigger if exists project_inputs_updated_at on project_inputs;
create trigger project_inputs_updated_at
  before update on project_inputs
  for each row execute function update_updated_at();

-- ─── Reports ────────────────────────────────────────────────────
create table if not exists reports (
  id          uuid        primary key default gen_random_uuid(),
  project_id  uuid        not null references projects(id) on delete cascade,
  status      text        not null default 'pending'
                          check (status in ('pending','completed','failed')),
  sections    jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists reports_updated_at on reports;
create trigger reports_updated_at
  before update on reports
  for each row execute function update_updated_at();

-- ─── Tasks ──────────────────────────────────────────────────────
create table if not exists tasks (
  id          uuid        primary key default gen_random_uuid(),
  project_id  uuid        not null references projects(id) on delete cascade,
  title       text        not null,
  description text        not null default '',
  status      text        not null default 'todo'
                          check (status in ('todo','in_progress','done')),
  due_date    date,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists tasks_updated_at on tasks;
create trigger tasks_updated_at
  before update on tasks
  for each row execute function update_updated_at();

-- ─── Milestones ─────────────────────────────────────────────────
create table if not exists milestones (
  id          uuid        primary key default gen_random_uuid(),
  project_id  uuid        not null references projects(id) on delete cascade,
  title       text        not null,
  target_date date,
  status      text        not null default 'planned'
                          check (status in ('planned','achieved','missed')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists milestones_updated_at on milestones;
create trigger milestones_updated_at
  before update on milestones
  for each row execute function update_updated_at();

-- ─── Assumptions ────────────────────────────────────────────────
create table if not exists assumptions (
  id          uuid        primary key default gen_random_uuid(),
  project_id  uuid        not null references projects(id) on delete cascade,
  description text        not null,
  status      text        not null default 'untested'
                          check (status in ('untested','validated','invalid')),
  notes       text        not null default '',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists assumptions_updated_at on assumptions;
create trigger assumptions_updated_at
  before update on assumptions
  for each row execute function update_updated_at();

-- ─── Row Level Security ─────────────────────────────────────────
alter table profiles       enable row level security;
alter table projects       enable row level security;
alter table project_inputs enable row level security;
alter table reports        enable row level security;
alter table tasks          enable row level security;
alter table milestones     enable row level security;
alter table assumptions    enable row level security;

-- Drop existing policies before recreating (idempotent)
do $$ begin
  drop policy if exists "profiles_select_own"    on profiles;
  drop policy if exists "profiles_update_own"    on profiles;
  drop policy if exists "projects_select_own"    on projects;
  drop policy if exists "projects_insert_own"    on projects;
  drop policy if exists "projects_update_own"    on projects;
  drop policy if exists "projects_delete_own"    on projects;
  drop policy if exists "project_inputs_select"  on project_inputs;
  drop policy if exists "project_inputs_insert"  on project_inputs;
  drop policy if exists "project_inputs_update"  on project_inputs;
  drop policy if exists "project_inputs_delete"  on project_inputs;
  drop policy if exists "reports_select"         on reports;
  drop policy if exists "reports_insert"         on reports;
  drop policy if exists "reports_update"         on reports;
  drop policy if exists "tasks_select"           on tasks;
  drop policy if exists "tasks_insert"           on tasks;
  drop policy if exists "tasks_update"           on tasks;
  drop policy if exists "tasks_delete"           on tasks;
  drop policy if exists "milestones_select"      on milestones;
  drop policy if exists "milestones_insert"      on milestones;
  drop policy if exists "milestones_update"      on milestones;
  drop policy if exists "milestones_delete"      on milestones;
  drop policy if exists "assumptions_select"     on assumptions;
  drop policy if exists "assumptions_insert"     on assumptions;
  drop policy if exists "assumptions_update"     on assumptions;
  drop policy if exists "assumptions_delete"     on assumptions;
end $$;

-- profiles
create policy "profiles_select_own" on profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on profiles for update using (auth.uid() = id);

-- projects
create policy "projects_select_own" on projects for select using (auth.uid() = user_id);
create policy "projects_insert_own" on projects for insert with check (auth.uid() = user_id);
create policy "projects_update_own" on projects for update using (auth.uid() = user_id);
create policy "projects_delete_own" on projects for delete using (auth.uid() = user_id);

-- project_inputs (scoped through projects)
create policy "project_inputs_select" on project_inputs for select using (
  exists (select 1 from projects where projects.id = project_inputs.project_id and projects.user_id = auth.uid())
);
create policy "project_inputs_insert" on project_inputs for insert with check (
  exists (select 1 from projects where projects.id = project_inputs.project_id and projects.user_id = auth.uid())
);
create policy "project_inputs_update" on project_inputs for update using (
  exists (select 1 from projects where projects.id = project_inputs.project_id and projects.user_id = auth.uid())
);
create policy "project_inputs_delete" on project_inputs for delete using (
  exists (select 1 from projects where projects.id = project_inputs.project_id and projects.user_id = auth.uid())
);

-- reports
create policy "reports_select" on reports for select using (
  exists (select 1 from projects where projects.id = reports.project_id and projects.user_id = auth.uid())
);
create policy "reports_insert" on reports for insert with check (
  exists (select 1 from projects where projects.id = reports.project_id and projects.user_id = auth.uid())
);
create policy "reports_update" on reports for update using (
  exists (select 1 from projects where projects.id = reports.project_id and projects.user_id = auth.uid())
);

-- tasks
create policy "tasks_select" on tasks for select using (
  exists (select 1 from projects where projects.id = tasks.project_id and projects.user_id = auth.uid())
);
create policy "tasks_insert" on tasks for insert with check (
  exists (select 1 from projects where projects.id = tasks.project_id and projects.user_id = auth.uid())
);
create policy "tasks_update" on tasks for update using (
  exists (select 1 from projects where projects.id = tasks.project_id and projects.user_id = auth.uid())
);
create policy "tasks_delete" on tasks for delete using (
  exists (select 1 from projects where projects.id = tasks.project_id and projects.user_id = auth.uid())
);

-- milestones
create policy "milestones_select" on milestones for select using (
  exists (select 1 from projects where projects.id = milestones.project_id and projects.user_id = auth.uid())
);
create policy "milestones_insert" on milestones for insert with check (
  exists (select 1 from projects where projects.id = milestones.project_id and projects.user_id = auth.uid())
);
create policy "milestones_update" on milestones for update using (
  exists (select 1 from projects where projects.id = milestones.project_id and projects.user_id = auth.uid())
);
create policy "milestones_delete" on milestones for delete using (
  exists (select 1 from projects where projects.id = milestones.project_id and projects.user_id = auth.uid())
);

-- assumptions
create policy "assumptions_select" on assumptions for select using (
  exists (select 1 from projects where projects.id = assumptions.project_id and projects.user_id = auth.uid())
);
create policy "assumptions_insert" on assumptions for insert with check (
  exists (select 1 from projects where projects.id = assumptions.project_id and projects.user_id = auth.uid())
);
create policy "assumptions_update" on assumptions for update using (
  exists (select 1 from projects where projects.id = assumptions.project_id and projects.user_id = auth.uid())
);
create policy "assumptions_delete" on assumptions for delete using (
  exists (select 1 from projects where projects.id = assumptions.project_id and projects.user_id = auth.uid())
);
