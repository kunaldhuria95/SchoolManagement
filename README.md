# School Management System

A full-stack **School Management System** built with Next.js and Node.js + Express. This project allows users to add, view, and search schools efficiently, with responsive UI, pagination, and skeleton loaders. MySQL is used for data storage and Cloudinary for image uploads. It is production-ready and can be deployed using Vercel or any Node.js server.

---

## Features

* Add, edit, and manage schools (name, address, city, image)
* Search schools by name using query parameters
* Pagination for large datasets
* Responsive design with skeleton loaders
* Production-ready build optimized with Next.js

---

## Tech Stack

* Frontend: Next.js, React, Tailwind CSS, Shadcn/UI
* Backend: Node.js, Express
* Database: MySQL
* File Storage: Cloudinary
* Data Fetching: React Query (TanStack Query)

---

## Setup and Run

Clone the repository and navigate into it:

```bash
git clone https://github.com/kunaldhuria95/SchoolManagement.git
cd SchoolManagement
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the root folder with the following content:

```env
DATABASE_HOST
DATABASE_USER
DATABASE_PASSWORD
DATABASE_NAME
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

> Note: For production, you can create a `.env.production` file with the same variables or different production credentials. Next.js will use `.env.production` automatically when running `npm run build` + `npm start`.

Setup the MySQL database:

```sql
CREATE DATABASE myschool;
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app. You can start editing pages in the `app/` directory, and changes will auto-update.

To run in production, build the project:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

Optional: Use PM2 to run in the background:

```bash
npm install -g pm2
pm2 start npm --name "school-management" -- start
```

---

## Folder Structure

```
app/
  show-schools/        # Page to view and search schools
  add-school/          # Page to add new schools
components/            # UI components (Card, Input, Pagination)
pages/api/             # API routes for CRUD operations
```

---

## Learn More

* [Next.js Documentation](https://nextjs.org/docs)
* [React Documentation](https://reactjs.org/docs/getting-started.html)
* [Tailwind CSS Documentation](https://tailwindcss.com/docs)
* [React Query Documentation](https://tanstack.com/query/latest)

---

## License

MIT License
