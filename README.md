# Simple Olshop Project

This project is a simple online shop application built with **Next.js**, **TypeScript**, **TailwindCSS**, and **Jest** for testing. The application features essential e-commerce functionalities, including user authentication, product management, and an effective routing system.

You can check out the deployment here:  
[Netlify Deployment](https://spiffy-malasada-33dc97.netlify.app/)  
**Username**: John  
**Email**: john@mail.com  
**Password**: changeme

## Features

### 1. User Authentication

- **Register**: Users can sign up by providing their credentials.
- **Login**: Registered users can log in to access restricted features like the cart and checkout.
- **Logout**: Users can log out to terminate their session.

### 2. Product Management

- **Add Product to Cart**: Users can browse products and add them to their shopping cart.
- **Delete Product from Cart**: Users can remove unwanted products from the cart.
- **Checkout**: Once ready, users can proceed to checkout and complete the shopping process.

### 3. Pages

- **Home**: The main landing page showcasing featured products.
- **Product**: A page displaying individual products with the option to add them to the cart.
- **Go to Cart**: A page where users can view products added to their cart, remove items, and proceed to checkout.

### 4. Routing and Navigation

The project uses **Next.js routing** to manage navigation between pages. Unlike traditional React applications, Next.js utilizes a file-based routing system where each file in the `pages` directory automatically corresponds to a route in the app.

- **File-based Routing**: In Next.js, the routing is determined by the file structure within the `pages` folder:

  - `pages/index.tsx` is the root or homepage (`/`).
  - `pages/cart.tsx` corresponds to the `/cart` route.
  - Dynamic routes, such as `pages/product/[id].tsx`, handle routes like `/product/1`, `/product/abc`, etc.

- **Dynamic Routing**: For dynamic routes, such as product details, Next.js uses square brackets (`[ ]`) to define dynamic parameters. For instance, `pages/product/[id].tsx` will match routes like `/product/1`, `/product/abc`, and so on.

- **Linking Between Pages**: Next.js provides the `<Link>` component for client-side navigation between pages. It is used to link to different routes, without reloading the page, improving performance and user experience.

- **Protected Routes**: Next.js allows you to create protected routes by controlling access to certain pages based on authentication. If a user is not logged in and attempts to access restricted pages like the cart or checkout, they will be redirected to the login page. This can be managed using custom hooks or higher-order components (HOCs).

## Technologies Used

- **Next.js**: A React framework for building server-side rendered (SSR) applications.
- **TypeScript**: A superset of JavaScript that adds static typing.
- **TailwindCSS**: A utility-first CSS framework for rapid UI development.
- **Jest**: A testing framework for running unit and integration tests.

## Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/revou-fsse-oct24/milestone-2-anggreinipra.git
   cd olshop-test-next
   ```

2. Install the dependencies using npm or yarn:

   ```
   npm install
   # or
   yarn install

   ```

3. Start the development server:

   ```
   npm run dev
   # or
   yarn dev
   The application will be available at http://localhost:3000 (default port for Next.js).

   ```

## Challenges Encountered

1. Jest Configuration <br>
   While I was building the application, I attempted to integrate Jest for testing. However, I faced difficulties configuring Jest to work with Next.js. Despite following the documentation and various online resources, I was unable to run the tests successfully. To move forward, I cloned my mentor’s repository, which had Jest properly configured. Unfortunately, after running it, I still encountered issues with getting the tests to execute as expected.

2. Routing and Navigation<br>
   Implementing a seamless routing and navigation system in Next.js presented its own set of challenges. Setting up protected routes, where only authenticated users can access certain pages, such as the Cart or Checkout, required careful handling. Ensuring that routes behave correctly based on the user's authentication state took some time and debugging.

3. Migration from React to Next.js<br>
   Initially, the project was built with React, but I decided to migrate it to Next.js to take advantage of server-side rendering (SSR) and improve performance. This migration process required a lot of changes, particularly with routing and data fetching methods. However, after putting in the necessary effort, I was able to successfully transition the app from React to Next.js, and everything is now working as expected.

## Conclusion

Building this simple online shop application has been an exciting experience. The journey involved challenges such as configuring Jest, handling routing, and migrating the app from React to Next.js. Despite the struggles with testing and configuration, I was able to build a fully functional online shop with Next.js, and the process helped me learn valuable lessons along the way. I look forward to enhancing my skills further and implementing more advanced features in future projects.

---

### License

Used for submission Assignment Project Milestone 2, RevoU FSSE Program.

---

© 2025 olshop-test-next. All Rights Reserved.
Created by @anggreinipra
