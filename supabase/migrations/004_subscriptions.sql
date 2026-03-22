-- ─── Subscriptions ───────────────────────────────────────────
create table if not exists subscriptions (
  id                      uuid        primary key default gen_random_uuid(),
  user_id                 uuid        not null references profiles(id) on delete cascade unique,
  plan                    text        not null default 'free'
                                      check (plan in ('free','starter','pro')),
  status                  text        not null default 'active'
                                      check (status in ('active','canceled','past_due','trialing')),
  stripe_customer_id      text,
  stripe_subscription_id  text,
  current_period_end      timestamptz,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

create trigger subscriptions_updated_at
  before update on subscriptions
  for each row execute function update_updated_at();

alter table subscriptions enable row level security;

create policy "subscriptions_select_own" on subscriptions
  for select using (auth.uid() = user_id);

-- Service role only for insert/update (webhook handler uses service role)
create policy "subscriptions_insert_service" on subscriptions
  for insert with check (true);

create policy "subscriptions_update_service" on subscriptions
  for update using (true);

-- Auto-create free subscription row when a profile is created
create or replace function handle_new_profile()
returns trigger as $$
begin
  insert into public.subscriptions (user_id, plan, status)
  values (new.id, 'free', 'active')
  on conflict (user_id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_profile_created
  after insert on public.profiles
  for each row execute function handle_new_profile();
