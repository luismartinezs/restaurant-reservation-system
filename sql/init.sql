create schema public;

create table public.restaurants (
  id bigint generated always as identity primary key,
  name varchar(255) not null,
  location varchar(255) not null,
  cuisine_type varchar(255) not null,
  seating_capacity int not null
);

create table public.reservations (
  id bigint generated always as identity primary key,
  restaurant_id bigint not null references public.restaurants on delete cascade,
  user_id uuid not null references auth.users on delete cascade,
  start timestampz,
);

create table public.ratings (
  id bigint generated always as identity primary key,
  restaurant_id bigint not null references public.restaurants on delete cascade,
  user_id uuid not null references auth.users on delete cascade,
  rating int2 check (
    rating between 1
    and 5
  )
);

create type role as enum('manager', 'user');

create table public.roles (
  id bigint generated always as identity primary key,
  name role
);