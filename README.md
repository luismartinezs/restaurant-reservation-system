# Restaurant reservation system

- [Restaurant reservation system](#restaurant-reservation-system)
  - [Tech stack](#tech-stack)
  - [Instructions for developers](#instructions-for-developers)
    - [Pre-requisites to run this project](#pre-requisites-to-run-this-project)
    - [Deploy locally as a dev](#deploy-locally-as-a-dev)
    - [Emulate database](#emulate-database)
    - [Code generation](#code-generation)
    - [Testing](#testing)
      - [Create auth.json for e2e tests](#create-authjson-for-e2e-tests)
    - [Pre-commit hooks](#pre-commit-hooks)
    - [Deployment pipelines](#deployment-pipelines)
    - [Storyblok setup](#storyblok-setup)
  - [Project requirements](#project-requirements)
  - [Questions about business logic](#questions-about-business-logic)
  - [Database structure](#database-structure)
  - [Pages](#pages)
  - [Data groups](#data-groups)
  - [App state](#app-state)
  - [Dev tasks](#dev-tasks)
  - [Known bugs / missing features (marked with \*)](#known-bugs--missing-features-marked-with-)
  - [If I had more time I would](#if-i-had-more-time-i-would)
  - [Troubleshooting](#troubleshooting)
  - [Timings](#timings)
  - [Notes](#notes)
  - [References](#references)
  - [Coding practices](#coding-practices)
    - [Folder structure](#folder-structure)

## Tech stack

- React / Next.js
- Mantine
- Supabase Database
- Supabase auth
- Cloudinary
- ~~Zustand~~ (app state solution not used, used on query params instead)

## Instructions for developers

### Pre-requisites to run this project

You need at least `node 21` and `npm` installed in your computer.

I recommend installing and using `pnpm` too to run the project scripts

I recommmend using `nvm` to manage node versions locally

### Deploy locally as a dev

```bash
# Install the project dependencies
npm install
# Run development server
npm dev
# Build and deploy app locally
npm build && npm start
# You can also run the above commands with pnpm or yarn, e.g.:
pnpm install
pnpm dev
pnpm build && pnpm start
```

### Emulate database

There's not database emulation. As this is just a prototype, the same database is used locally and in the live environment. In a real site a separate database would be needed for development and testing, and a locally emulated database should be spinned.

### Code generation

- ~~Run `pnpm plop` to scaffold new components or pages~~ (no code generation used in this project)

### Testing

- Run `pnpm vitest` to run unit tests
- Run `pnpm e2e` to run end-to-end tests (no e2e tests setup currently except for a sanity test)

#### Create auth.json for e2e tests

- Serve project locally with `pnpm dev`
- Run `npx playwright codegen http://localhost:3000 --save-storage=e2e/auth.json`
- Sign in to the app

### Pre-commit hooks

- `pnpm lint` without errors
- ~~All tests must pass~~ disabling tests because it takes too long to run
- Commit message must follow `commitlint` specs

### Deployment pipelines

- Unit and e2e tests run fore every attempt to push to or merge pull request to main branch (non blocking)

### Storyblok setup

Storyblok allows to create restaurant landing pages using the Storyblok CMS. An editor does not need to code anything, they can create landing pages for existing restaurants from the Storylok UI. Editors should ask the project owner to be added to the Storyblok space.

You will need to add the storyblok api token to the `.env.local` file. Ask the project owner for it.

To see the preview of the landing page in the Storyblok UI when working in localhost, you need to setup a proxy:

- You need to use mkcert to create a certificate: https://github.com/FiloSottile/mkcert
  - Install mkcert
  - add localhost to the certificate: `mkcert localhost`
- Run a proxy server
  - `pnpm add -g local-ssl-proxy`
  - `local-ssl-proxy --source 3010 --target 3000 --cert localhost.pem --key localhost-key.pem`

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
- /account -> Currently logged in user page
- /account/reservations -> List of all reservations for one specific user
- /account/reservations/:uid -> One reservation for the currently logged in user

## App state

- App client state is handled with url search params
  - Active filters for restaurants listing
  - Selected reservation date and start time
  - Number of guests

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
- [x] User auth:
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
- [x] Create actual app pages
  - [x] /restaurants
    - [x] reaturant item
    - [x] filters / search
  - [x] /restaurants/:uid
    - [x] reservation widget
      - [-] if reservation successful, show success
      - [-] if there is no enough space, show error
      - [-] show a list of available reservation times in detail page which are near the currently selected date time for selected ppl, in intervals of 30 min
  - [-] /restaurants/:uid/edit (manager)
  - [-] /restaurants/new (manager)
  - [x] /reservations
  - [x] /reservations/:uid
    - [x] form loading state
    - [x] form server error state
    - [x] validation with zod
    - [x] limit selectable dates (no past, up to 2 months in future)
  - [-] /users (manager)
  - [-] /users/:uid (manager)
  - [-] /users/new (manager)
- [x] page transitions
  - [x] speed up page transition to /restaurants (preload data or use suspense boundary)
  - [x] same with restaurants/:uid
  - [x] same with reservations and reservations/:uid
- [x] init DB with plenty data for reservations + ratings so more realistic use case can be visualized
- [x] add landing page similar to https://www.chope.co/phuket-restaurants
- [x] images
  - [x] add ai generated images for restaurants
    - [x] create images with ai
    - [x] add images to DB and display in UI
- [x] Cleanup login page
  - [x] Add signin with google
- [x] icing cake
  - [x] add simple logo
  - [x] add search bar to home
  - [x] add preselected reservation times in restaurant listing and detail, and do not show unavaiable times
  - [x] README cleanup
  - [x] fix theme popup
  - [x] after logging in, return to page where user was located (or / by default)
- [x] Manual testing / search for bugs (do not fix em though)
- [ ] Ratings
  - [ ] user can see their ratings /account/ratings
  - [ ] user can rate a restaurant if they have a reservation in the past for said restaurant
    - [ ] from the restaurant detail page
    - [ ] from the /account/reservations page
- [x] User can do a reservation
- [x] Supabase: security and RLS
- [x] clean up code
  - [x] review folder structure adherence to best practices
  - [-] order imports following best practices
- [ ] setup storyblok CMS to create restaurants landings (this is another one week project)
  - [ ] blocks
    - [ ] all detail pages look similar, this is good reference: https://www.opentable.co.th/zuma-japanese-restaurant-ny
    - [x] metadata
    - [x] hero with image, 2 versions: full bleed image and image + separate text block (mobile friendly)
    - [x] images widget
    - [x] title and paragraph
    - [x] normal booking widget
    - [x] persistent booking sidebar (might require alternate page version)
    - [x] food menu
    - [x] social media share buttons
    - [-] promotions section
    - [x] secondary menu with custom links like this: https://www.opentable.co.th/zuma-japanese-restaurant-ny
    - [ ] sidebar persistent booking widget
    - [ ] sidebar info widget with name, rating, pricing, cuisine, number of reservations, location
    - [ ] sidebar contact and location widget
    - [ ] FAQ section

## Known bugs / missing features (marked with *)

- [x] when changing cuisine and location simultaneously, query params not correctly setup
- [x] search bar allows select date / time before today
- [ ] restaurant detail
  - [x] restaurant time not being updated on btn click
  - [x] time buttons not sequenced as expected
  - [x] when user does reservation, they get error always
  - [x] btn to create booking says "edit booking"
  - [ ] *if user booked this restaurant in the past, there should be option to rate, and if they already rated, they can see their own rating and edit it
- [ ] account/reservations
  - [x] delete should be cancel
  - [x] user cannot cancel or edit reservations in past
  - [ ] *there should be btn to rate restaurant for past reservations
  - [ ] *"book again" button to book same restaurant again
  - [ ] *link to restaurant page
- [ ] *missing reservation time in home page cards
- [ ] *lack of pagination in restaurant list
- [ ] quite slow page transitions
- [ ] *missing canonical tags (but it's prototype demo so doesn't matter)
- [ ] *there should be a "your ratings" page where user can see all ratings they've given

## If I had more time I would

- [ ] It might be interesting to cache the number of reservations per restaurant (maybe), otherwise for the listing, we're looking at N*M queries, alternatively, use pagination and fetch only for 10 restaurants at a time (same can be done for calculation of average rating), once this is done it would make sense to compute average ratings in advance and store them in the DB in the restaurants table
- [ ] add confirmation modal to delete actions
- [ ] clean up booking flow by adding loading state and display booking response (either error, or full restaurant, or success)
- [ ] show list of available reservation times for each restaurant in listing and detail pages
- [ ] add pages for admin to manage restaurants and users: add, edit and delete restaurants, and update users. right now this is done manually from the DB
- [ ] make dates consistently work with the current user location (geolocation)
- [ ] use windowing or pagination on search results
- [ ] Client fetching all reservations to display availability is not privacy-friendly, this logic should take place entirely server side and the client should only show aggregate data, for a prototype it's okay through
- [ ] add capability for users to rate restaurants
- [ ] Highlight active link in secondary navigation
- [ ] Make sticky Book Widget show all the way to the bottom of the page

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

## References

- https://eatigo.com
- https://www.opentable.co.th/
- https://www.chope.co/
- https://www.tripadvisor.com/Restaurants-g1215781-Phuket_Town_Phuket.html

## Coding practices

### Folder structure

- Feature based: each feature has its own folder with all related files.
  - Do not be overly strict with this, if moving a piece of code to the features folder makes the code more complicated, or it doesn't seem to make sense, don't do it