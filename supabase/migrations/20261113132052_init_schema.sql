-- PROFILES (one per user, holds credits)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  credits integer not null default 50,
  created_at timestamptz not null default now()
);

-- Auto-create a profile when someone signs up
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data->>'display_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- PROJECTS
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null default 'Untitled project',
  idea text,
  style text,
  language text,
  accent text,
  music_mood text,
  target_duration integer not null default 60,
  status text not null default 'draft',
  final_video_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- SCENES
create table public.scenes (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  scene_number integer not null,
  duration_seconds integer not null default 5,
  visual_description text,
  camera_notes text,
  dialogue jsonb not null default '[]',
  sound_effects jsonb not null default '[]',
  music_cue text,
  created_at timestamptz not null default now(),
  unique (project_id, scene_number)
);

-- ASSETS (files stored in Supabase Storage)
create table public.assets (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  scene_id uuid references public.scenes(id) on delete set null,
  kind text not null check (kind in
    ('reference_image','voice_line','video_clip','music','sfx','final_video')),
  url text not null,
  duration_seconds numeric,
  meta jsonb not null default '{}',
  created_at timestamptz not null default now()
);

-- VOICES (catalog of available voices)
create table public.voices (
  id uuid primary key default gen_random_uuid(),
  display_name text not null,
  language text not null,
  accent text,
  gender text,
  age_group text check (age_group in ('child','adult','elder')),
  provider text not null,
  provider_voice_id text not null,
  sample_url text,
  active boolean not null default true
);

-- JOBS (pipeline progress)
create table public.jobs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  stage text not null default 'script',
  status text not null default 'queued',
  progress integer not null default 0,
  error text,
  external_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- VOICE FEEDBACK (builds your quality data over time)
create table public.voice_feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  voice_id uuid references public.voices(id) on delete set null,
  rating smallint not null check (rating in (-1, 1)),
  comment text,
  created_at timestamptz not null default now()
);

-- SECURITY: turn on Row Level Security everywhere
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.scenes enable row level security;
alter table public.assets enable row level security;
alter table public.voices enable row level security;
alter table public.jobs enable row level security;
alter table public.voice_feedback enable row level security;

-- Users read their own profile (credits are changed only by server code)
create policy "own profile read" on public.profiles
  for select using (id = auth.uid());

-- Users fully manage their own projects
create policy "own projects" on public.projects
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Scenes and assets follow project ownership
create policy "own scenes" on public.scenes
  for all using (exists (select 1 from public.projects p
    where p.id = scenes.project_id and p.user_id = auth.uid()))
  with check (exists (select 1 from public.projects p
    where p.id = scenes.project_id and p.user_id = auth.uid()));

create policy "own assets read" on public.assets
  for select using (exists (select 1 from public.projects p
    where p.id = assets.project_id and p.user_id = auth.uid()));

-- Jobs: users can only read; Edge Functions write using the service role
create policy "own jobs read" on public.jobs
  for select using (exists (select 1 from public.projects p
    where p.id = jobs.project_id and p.user_id = auth.uid()));

-- Voices: any signed-in user can browse active voices
create policy "voices read" on public.voices
  for select to authenticated using (active);

-- Feedback: users manage their own
create policy "own feedback" on public.voice_feedback
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());