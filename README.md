# Restaurant reservation system

- [Restaurant reservation system](#restaurant-reservation-system)
  - [Tech stack](#tech-stack)
  - [Pre-requisites to run this project](#pre-requisites-to-run-this-project)
  - [Deploy locally as a dev](#deploy-locally-as-a-dev)
  - [Emulate database](#emulate-database)
  - [Code generation](#code-generation)
  - [Testing](#testing)
  - [Pre-commit hooks](#pre-commit-hooks)
  - [Project requirements](#project-requirements)
  - [Questions about business logic](#questions-about-business-logic)
  - [Database structure](#database-structure)
  - [Pages](#pages)
  - [Data groups](#data-groups)
  - [App state](#app-state)
  - [Dev tasks](#dev-tasks)
  - [Known bugs](#known-bugs)
  - [If I had more time I would](#if-i-had-more-time-i-would)
  - [Troubleshooting](#troubleshooting)
  - [Timings](#timings)
  - [Notes](#notes)
  - [Coding practices](#coding-practices)
    - [Folder structure](#folder-structure)
    - [Imports](#imports)

## Tech stack

- React / Next.js
- Mantine
- Supabase postgresql
- Supabase auth
- Zustand

## Pre-requisites to run this project

You need at least `node 21` and `npm` installed in your computer.

I recommend installing and using `pnpm` too to run the project scripts

I recommmend using `nvm` to manage node versions locally

## Deploy locally as a dev

```bash
# Install the project dependencies
npm install
# Run development server
npm dev
# Build and deploy app locally
npm build && npm preview
# You can also run the above commands with pnpm or yarn, e.g.:
pnpm install
pnpm dev
pnpm build && pnpm preview
```

## Emulate database

To come

## Code generation

- Run `pnpm plop` to scaffold new components or pages (not yet set up)

## Testing

(no tests yet)

- Run `pnpm test` to run all tests

## Pre-commit hooks

- `pnpm lint` without errors
- All tests must pass
- Commit message must follow `commitlint` specs

## Project requirements

Write an application to manage restaurant reservations:

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

## Questions about business logic

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
- Can users select an end time for the reservation?
  - No, only start time. Assume reservation lasts for 2 hours

## Database structure

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
- /account

## Data groups

Pages define what data needs to be shown together and thus fetched together (it also defines the database structure)

- /restaurants -> List of all restaurants, reservations and ratings
- /restaurants/:uid -> One restaurant, with its reservations and ratings
- /reservations -> List of all reservations for one specific user
- /users -> List of all users, with all reservations for each user
- /users/:uid -> One user, with reservations all for that user

## App state

- Active filters for restaurants listing
- Selected reservation start time (only future time)

## Dev tasks

- [x] Project setup (scaffold project with all tech stack)
  - [x] mantine
  - [x] supabase
  - [x] commitlint
  - [x] precommit hooks (husky)
    - [-] check unused imports
    - [x] lint
  - [x] Scaffold readme sections
- [x] Init DB tables
- [ ] User auth:
  - [x] /login: User can login
  - [x] /account: User can see account page
  - [x] User can logout
- [x] Scaffold minimal CRUD pages for:
  - [x] Restaurant (as feature)
    - [x] types
    - [x] API
    - [-] hooks
    - [x] pages
      - [x] List
      - [x] View
      - [x] Create
      - [x] Edit
      - [x] Delete
  - [x] Reservation (as feature)
    - [x] types
    - [x] API
    - [-] hooks
    - [x] pages
      - [x] List
      - [x] View
      - [x] Create
      - [x] Edit
      - [x] Delete
  - [x] Rating (as feature)
    - [x] types
    - [x] API
    - [-] hooks
    - [x] pages
      - [x] List
      - [x] View
      - [x] Create
      - [x] Edit
      - [x] Delete
  - [x] User (as feature)
    - [x] types
    - [x] API
    - [-] hooks
    - [x] pages
      - [x] List
      - [x] View
      - [x] Create
      - [x] Edit
      - [x] Delete
- [ ] Create actual app pages
  - [x] /restaurants
    - [x] reaturant item
    - [x] filters / search
  - [x] /restaurants/:uid
    - [x] reservation widget
      - [-] if reservation successful, show success
      - [-] if there is no enough space, show error
      - [-] show a list of available reservation times in detail page which are near the currently selected date time for selected ppl, in intervals of 30 min
  - [ ] /restaurants/:uid/edit (manager)
  - [ ] /restaurants/new (manager)
  - [x] /reservations
  - [x] /reservations/:uid
    - [ ] form loading state
    - [ ] form server error state
    - [ ] validation with zod
    - [ ] limit selectable dates (no past, up to 2 months in future)
  - [ ] /users (manager)
  - [ ] /users/:uid (manager)
  - [ ] /users/new (manager)
- [ ] Manual testing
- [ ] README cleanup
- [ ] Marketing landing page

## Known bugs

None yet

## If I had more time I would

- It might be interesting to cache the number of reservations per restaurant (maybe), otherwise for the listing, we're looking at N*M queries, alternatively, use pagination and fetch only for 10 restaurants at a time (same can be done for calculation of average rating), once this is done it would make sense to compute average ratings in advance and store them in the DB in the restaurants table
- add confirmation modal to delete actions
- clean up booking flow by adding loading state and display booking response (either error, or full restaurant, or success)
- show list of available reservation times for each restaurant in listing and detail pages

## Troubleshooting

Nothing so far

## Timings

| Item                                                   | Minutes | Hours |

## Notes

- Calculating average rating in real time because we also have to fetch NxM times for reservations so the total number of queries is NxM + NxP which does not change complexity -- O(Nx2M)
- booking system:
  - restaurant has X tables
  - A reservation sets number of people.
  - give guests 2 hours to eat
  - a restaurant is "full" for a given timeslot if all seats are booked for that given timeslot
  - "full" is function of: total number of seats, number of seats booked, booking time, number of people in booking
  - user must enter: booking time, number of guests, restaurant. System returns availabiltiy
  - user must always select restaurant
  - for booking time and number of guests, there are some defaults
    - booking time: 19h same day if it's before 19h, 19h next day if it's after 19h. So the closest 19h in the future
    - number of guests: 2 (can select up to 8)

## Coding practices

### Folder structure

- Feature based: each feature has its own folder with all related files.
  - Do not be overly strict with this, if moving a piece of code to the features folder makes the code more complicated, or it doesn't seem to make sense, don't do it

### Imports

- Order imports as follows:
  - React imports
  - Next.js imports
  - --- empty line ---
  - Other external libraries (e.g. Mantine, Supabase)
  - --- empty line ---
  - Aliased internal imports
  - --- empty line ---
  - Relative imports