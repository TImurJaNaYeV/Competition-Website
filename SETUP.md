# Supabase Setup Guide

Follow these steps to configure the Supabase backend before running the app.

## 1. Create a Supabase project

Go to https://supabase.com and create a free project. Choose a region close to your users.

## 2. Create the `registrations` table

In the Supabase dashboard, open the **Table Editor** and create a new table called `registrations` with the following columns:

| Column | Type | Default | Notes |
|---|---|---|---|
| `id` | uuid | `gen_random_uuid()` | Primary key |
| `user_id` | uuid | — | References `auth.users.id` |
| `first_name` | text | — | |
| `last_name` | text | — | |
| `age` | int2 | — | |
| `grade` | int2 | — | Values: 9, 10, 11, or 12 |
| `country` | text | — | |
| `school_name` | text | — | |
| `payment_status` | text | `'pending'` | Values: `pending`, `paid` |
| `created_at` | timestamptz | `now()` | |

> **Tip:** You can also run this SQL in the Supabase SQL Editor:
> ```sql
> create table registrations (
>   id             uuid primary key default gen_random_uuid(),
>   user_id        uuid references auth.users(id),
>   first_name     text not null,
>   last_name      text not null,
>   age            int2 not null,
>   grade          int2 not null,
>   country        text not null,
>   school_name    text not null,
>   payment_status text not null default 'pending',
>   created_at     timestamptz default now()
> );
> ```

## 3. Enable Row Level Security (RLS)

In the Table Editor, click the `registrations` table → **Auth** tab → toggle **Enable RLS** on.

## 4. Add RLS policies

Add two policies so users can only access their own row:

**INSERT policy**
- Policy name: `Users can insert their own registration`
- Operation: INSERT
- Check expression: `auth.uid() = user_id`

**SELECT policy**
- Policy name: `Users can read their own registration`
- Operation: SELECT
- Using expression: `auth.uid() = user_id`

> **Tip:** SQL equivalent:
> ```sql
> create policy "Users can insert their own registration"
>   on registrations for insert
>   with check (auth.uid() = user_id);
>
> create policy "Users can read their own registration"
>   on registrations for select
>   using (auth.uid() = user_id);
> ```

## 5. Copy credentials into `.env`

In the Supabase dashboard go to **Project Settings → API**. Copy the values into a `.env` file at the project root:

```
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

> The `.env` file is git-ignored. Never commit it. See `.env.example` for the required keys.
