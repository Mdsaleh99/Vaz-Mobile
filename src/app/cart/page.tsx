const Cart = () => {
    // it is file base routing. to know more check below
    return (
        <div>
            Cart page
        </div>
    );
}
 
export default Cart;

/*

https://nextjs.org/docs/app/building-your-application/routing

https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes

Roles of Folders and Files
Next.js uses a file-system based router where:

Folders are used to define routes. A route is a single path of nested folders, following the file-system hierarchy from the root folder down to a final leaf folder that includes a page.js file. See Defining Routes.
Files are used to create UI that is shown for a route segment.

==========================================================================


1. File-based Routing
In the App Router, the app directory is used to define routes based on its folder structure. Each folder under app corresponds to a route in your application. This is similar to the old pages directory, but with more advanced features.
Example:
If your structure looks like this:
app/
  home/
    page.tsx
  about/
    page.tsx


You’ll get the following routes:

/home → served by home/page.tsx
/about → served by about/page.tsx

Each folder is automatically mapped to a route, and each page.tsx file inside the folder defines the page content for that route.

==========================================================================

2. Special Files in App Router
The App Router introduces several special files that serve different purposes inside the folders:

page.tsx: Defines the UI for that specific route (e.g., /cart).
layout.tsx: Used to define layout components that are shared across multiple pages.
loading.tsx: Displays a loading state while a page is loading (useful for dynamic loading).
error.tsx: Renders when there is an error in the route, providing a custom error page.
template.tsx: Similar to layout.tsx, but specific to dynamically nested routes (rendering unique layouts for specific child routes).
head.tsx: Used to define custom HTML <head> content like titles, meta tags, and scripts.

==========================================================================

3. Layouts and Nested Routes
One of the most powerful features of the App Router is the ability to create nested layouts.

Layouts (layout.tsx) can wrap around multiple pages. If you have shared components like navigation bars, footers, or sidebars, you can define them in a layout.tsx file.
Example:

app/
  dashboard/
    layout.tsx  <-- This layout wraps all the dashboard pages
    page.tsx    <-- This is the content for /dashboard
    settings/
      page.tsx  <-- This is the content for /dashboard/settings

dashboard/layout.tsx will wrap both /dashboard and /dashboard/settings, meaning you can have a persistent layout across these pages without reloading.
This makes building pages with shared layouts much easier and more efficient.

==========================================================================

4. Dynamic Routes
You can create dynamic routes using square brackets [ ] in folder names. This allows you to create routes that vary based on parameters like IDs or slugs.

Example:

app/
  blog/
    [slug]/
      page.tsx  <-- Dynamic route for blog posts

This will generate dynamic URLs like /blog/my-first-post, /blog/nextjs-tutorial, etc., where [slug] is a dynamic parameter that you can capture and use inside the component.


Changing page.tsx
Effect: If you rename page.tsx to something else (e.g., customPage.tsx), Next.js will not recognize that file as the main page for that route.

Outcome: The route associated with that folder will stop working, and you may get a 404 error or a blank page.

==========================================================================

5. Server and Client Components
One of the key features in Next.js 13 is the ability to define server components and client components:

Server Components (default): These components are rendered on the server. They are highly efficient because they don’t send any JavaScript to the client unless needed.

Client Components: These are interactive and require JavaScript on the client-side (like handling events). You mark a file as a client component by adding "use client" at the top of the file.

Example:
// This is a server component (default)
export default function ServerComponent() {
  return <div>Server-rendered content</div>;
}

// To define a client component, add "use client" at the top
"use client";

export default function ClientComponent() {
  return <button onClick={() => alert('Clicked!')}>Click me</button>;
}

You can mix server and client components, allowing for a highly efficient and interactive application.


==========================================================================

6. API Routes in App Router
The App Router supports defining API routes as well, just like the old pages/api system. You create API routes inside the app/api directory.

Example:
app/
  api/
    users/
      route.ts  <-- API endpoint for /api/users

This file (route.ts) will handle server-side logic, such as fetching or posting data.

==========================================================================

7. Data Fetching in App Router
The App Router simplifies data fetching with new features:

getStaticProps and getServerSideProps from the old system are replaced with more flexible patterns using React Server Components and fetch().

In Server Components, you can use fetch() directly in your component to fetch data:

// This is a server component
export default async function MyPage() {
  const data = await fetch('https://api.example.com/data').then(res => res.json());

  return <div>{data.title}</div>;
}

For Client Components, you still fetch data using hooks like useState and useEffect.

==========================================================================

8. Routing and Navigation
For navigation between routes, Next.js uses the Link component for optimized, client-side transitions:

import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <Link href="/about">Go to About Page</Link>
    </div>
  );
}
Next.js also pre-fetches these links automatically to make navigation instant.

*/