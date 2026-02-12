-- Library Tapes Creative Studio - Database Setup
-- Run this SQL in your Supabase Dashboard (SQL Editor)

-- Create projects table
create table projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  client_name text not null,
  project_name text not null,
  booking_date date not null,
  time_slot text not null,
  notes text default '',
  created_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table projects enable row level security;

-- RLS Policies: Users can only access their own projects

create policy "Users can view own projects"
  on projects for select
  using (auth.uid() = user_id);

create policy "Users can insert own projects"
  on projects for insert
  with check (auth.uid() = user_id);

create policy "Users can update own projects"
  on projects for update
  using (auth.uid() = user_id);

create policy "Users can delete own projects"
  on projects for delete
  using (auth.uid() = user_id);
