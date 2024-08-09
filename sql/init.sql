-- this sql creates all the tables and policies for the database

create schema public;

-- RESTAURANTS
create table public.restaurants (
  id bigint generated always as identity primary key,
  name varchar(255) not null,
  location varchar(255) not null,
  cuisine_type varchar(255) not null,
  seating_capacity int not null
);

alter table
  public.restaurants enable row level security;

alter policy "Enable read access for all users" on "public"."restaurants" to public using (true);

alter policy "Enable update for users based on email" on "public"."restaurants" to public using (
  (
    (
      (
        SELECT
          auth.jwt() AS jwt
      ) ->> 'email' :: text
    ) = 'luismartinezwebdev@gmail.com' :: text
  )
);

-- RESERVATIONS
create table public.reservations (
  id bigint generated always as identity primary key,
  restaurant_id bigint not null references public.restaurants on delete cascade,
  user_id uuid not null references auth.users on delete cascade,
  start timestampz,
);

CREATE INDEX ON "public"."reservations" USING btree ("restaurant_id");

CREATE INDEX ON "public"."reservations" USING btree ("user_id");

alter policy "Enable read access for all users" on "public"."reservations" to public using (true);

alter policy "Enable insert for authenticated users only" on "public"."reservations" to authenticated with check (true);

alter policy "Enable update / delete for users based on user_id" on "public"."reservations" to public using (
  (
    (
      SELECT
        auth.uid() AS uid
    ) = user_id
  )
);

-- RATINGS
create table public.ratings (
  id bigint generated always as identity primary key,
  restaurant_id bigint not null references public.restaurants on delete cascade,
  user_id uuid not null references auth.users on delete cascade,
  rating int2 check (
    rating between 1
    and 5
  )
);

CREATE INDEX ON "public"."ratings" USING btree ("restaurant_id");

CREATE INDEX ON "public"."ratings" USING btree ("user_id");

alter policy "Enable read access for all users" on "public"."ratings" to public using (true);

-- not yet used
-- create type role as enum('manager', 'user');
-- create table public.roles (
--   id bigint generated always as identity primary key,
--   name role
-- );
-- VIEWS
create view public.reservations_restaurants with (security_invoker = on) as
select
  reservations.id as reservation_id,
  reservations.start,
  reservations.people,
  reservations.user_id,
  restaurants.id as restaurant_id,
  restaurants.name as restaurant_name,
  restaurants.location,
  restaurants.cuisine_type
from
  reservations
  left join restaurants on reservations.restaurant_id = restaurants.id;