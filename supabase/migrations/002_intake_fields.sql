-- Add intake-specific columns to project_inputs
alter table project_inputs
  add column if not exists country       text    not null default '',
  add column if not exists business_type text    not null default '',
  add column if not exists stage         text    not null default '',
  add column if not exists timeline      text    not null default '',
  add column if not exists current_step  integer not null default 1,
  add column if not exists is_complete   boolean not null default false;

-- Enforce one intake record per project
alter table project_inputs
  add constraint project_inputs_project_id_key unique (project_id);
