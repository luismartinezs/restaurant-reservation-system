# Restaurant reservation system

## Project requirements

- User roles
  - User
    - Create account
    - Login
    - View list of available restaurants
    - Filter by datetime, name, location, cuisine type, and average rating
    - Create reservation
    - View, update and delete (only) their reservations
    - Can rate restaurant but only if they have completed reservations for a given restaurant
  - Admin
    - Admin role is set directly in DB by developer
    - CRUD restaurants
    - View reservations
    - View all users
      - For each user see reservations
        - For each reservation see details / summary, with emphasis on reservation time
- DB entities
  - Restaurant
    - Name
    - Location
    - Cuisine type
    - Average rating
    - Seating capacity
    - Availability status
  - Reservation
    - start datetime
    - end datetime
    - user
    - restaurant
  - User
    - role
- Optional: landing page

## Questions

- Should restaurants have opening hours? Or should we assume restaurant is always open to reservations?
  - No, assume restaurants are always open
- Do restaurants need to be toggled on / off to hide from available restaurants temporarily?
  - No, restaurants are always available
- Is there a restaurant user role that can manage their own reservations or do anything else?
  - No, only user and manager roles as described. In this MVP restaurants contact manager and manager takes care of things
- Should reservations have status? I.e. pending, cancelled, fulfilled, etc
  - No, status is derived: pending = start date is in the future, cancelled = deleted by user (just delete from DB, so it's not displayed anymore), fulfilled = end date is in the past
- Do restaurants have other contact details such as phone number?
  - No, only location
- How is location inputted? Does it need to be verified as a real address, for example, by checking with google maps API or some other third party service? Or it can be any arbitrary thing?
  - Location is an aribtrary string, no checks
- Do restaurants have menu? Description? Images? Is that visible in the app?
  - No
- Can user enter testimonial or review for restaurant? Or only rating? Is the rating shown as 1 to 5 stars, or in a different format?
  - Only rating from 1 ot 5, stars are ok
- Is there any limitation in the values that restaurants can have for cuisine type or seating capacity?
  - Seating capacity can be any number. Cuisine is a fixed list of values (e.g. Italian, Chinese, etc)
- Can users edit their already created bookings?
  - No, only delete
- Can users delete bookings which are currenlty taking place?
  - Yes
- Can users see deleted bookings?
  - No, deleted bookings no longer exist in DB

## Tech stack

- React / Next.js
- Mantine
- SQLite
- Clerk auth
- Yup (validation)

## DB structure

- users
  - role: user | manager
  - uid: string
  - email: string
  - name?: string
- restaurants
  - uid: string
  - name: string
  - location: string
  - cuisine_type: string
  - seating_capacity: number
- reservations
  - uid: string
  - start: datetime
  - end: datetime
  - user_uid: string
  - restaurant_uid: string
- ratings
  - uid: string
  - user_uid: string
  - restaurant_uid: string
  - rating: number (1 to 5)

## Pages

- /restaurants = /
- /restaurants/:uid
- /restaurants/:uid/edit (manager)
- /restaurants/new (manager)
- /reservations
- /reservations/:uid
- /users (manager)
- /users/:uid (manager)
- /users/new (manager)
- /login
- /register
- /account

## Notes

- Calculating average rating in real time because we also have to fetch NxM times for reservations so the total number of queries is NxM + NxP which does not change complexity -- O(Nx2M)

## If I had more time I would

- It might be interesting to cache the number of reservations per restaurant (maybe), otherwise for the listing, we're looking at N*M queries, alternatively, use pagination and fetch only for 10 restaurants at a time (same can be done for calculation of average rating), once this is done it would make sense to compute average ratings in advance and store them in the DB in the restaurants table

## Dev tasks

- [ ] Project setup (scaffold project with all tech stack)
  - [ ] mantine
  - [ ] supabase
  - [ ] commitlint
  - [ ] precommit hooks (husky)
    - [ ] check unused imports
    - [ ] lint
  - [ ] Scaffold readme sections
- [ ] Init DB tables
- [ ] User auth:
  - [ ] /register: Guest can register (create user)
  - [ ] /login: User can login
  - [ ] /account: User can see account page
  - [ ] User can logout
- [ ] Scaffold minimal CRUD pages for:
  - [ ] Restaurant (as feature)
    - [ ] types
    - [ ] API
    - [ ] hooks
    - [ ] pages
      - [ ] List
      - [ ] View
      - [ ] Create
      - [ ] Edit
      - [ ] Delete
  - [ ] Reservation (as feature)
    - [ ] types
    - [ ] API
    - [ ] hooks
    - [ ] pages
      - [ ] List
      - [ ] View
      - [ ] Create
      - [ ] Edit
      - [ ] Delete
  - [ ] Rating (as feature)
    - [ ] types
    - [ ] API
    - [ ] hooks
    - [ ] pages
      - [ ] List
      - [ ] View
      - [ ] Create
      - [ ] Edit
      - [ ] Delete
  - [ ] User (as feature)
    - [ ] types
    - [ ] API
    - [ ] hooks
    - [ ] pages
      - [ ] List
      - [ ] View
      - [ ] Create
      - [ ] Edit
      - [ ] Delete
- [ ] Create actual app pages
  - [ ] /restaurants
  - [ ] /restaurants/:uid
  - [ ] /restaurants/:uid/edit (manager)
  - [ ] /restaurants/new (manager)
  - [ ] /reservations
  - [ ] /reservations/:uid
  - [ ] /users (manager)
  - [ ] /users/:uid (manager)
  - [ ] /users/new (manager)
- [ ] Manual testing
- [ ] README cleanup
- [ ] Marketing landing page