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
| `email` | text | — | Stored alongside user_id for duplicate checks |
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
>   email          text not null,
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

Run the following SQL in the Supabase SQL Editor:

```sql
-- Allow anyone to check whether an email is already registered.
-- Only the id column is exposed, no sensitive data.
CREATE POLICY "Allow email existence check"
ON registrations
FOR SELECT
USING (true);

-- Users can insert only their own registration row.
CREATE POLICY "Users can insert their own registration"
ON registrations
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can read only their own registration row.
CREATE POLICY "Users can read their own registration"
ON registrations
FOR SELECT
USING (auth.uid() = user_id);
```

> **Note:** Two SELECT policies coexist — Supabase merges them with OR, so a
> logged-in user can see their own row, and an anonymous visitor can query
> for email existence (id only). This is intentional and safe.

## 5. Copy credentials into `.env`

In the Supabase dashboard go to **Project Settings → API**. Copy the values into a `.env` file at the project root:

```
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

> The `.env` file is git-ignored. Never commit it. See `.env.example` for the required keys.
