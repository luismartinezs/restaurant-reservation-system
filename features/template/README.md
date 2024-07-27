# Feature template

This folder holds files related to a DB entity

The components contain several links expecting pages:

- /scaffold/${KEY}/
  - /list
  - /new
  - /:uid
  - /:uid/edit

## How to use

- Duplicate and rename folder
- Update content of `constants.ts` file
- Update components as needed, in particular:
  - Card.tsx depending on the DB fields
  - Form.tsx depending on the DB fields

## Note

this is just a duplicate of an existing feature, not really a template
