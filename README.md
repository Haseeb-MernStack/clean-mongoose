# clean-mongoose

Tiny TypeScript utility to clean Mongoose documents and plain objects for safe API responses.

## Features

- Convert `_id` -> `id`
- Remove `__v`
- Optionally remove `password` fields and underscore-prefixed fields
- Works with arrays, nested objects, populated docs
- Zero dependencies, TypeScript types included

## Install

```bash
npm install @haseeb/clean-mongoose
# or
yarn add @haseeb/clean-mongoose
```
