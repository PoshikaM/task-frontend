# Task Manager Frontend

This is the **frontend** application for the Task Manager project built with **Next.js (App Router)** and **Tailwind CSS**.

The app allows users to:

- View tasks fetched from the backend API
- Add new tasks
- Toggle task completion status
- Delete tasks

---

## Technologies Used

- Next.js (App Router)
- React (Functional Components with Hooks)
- Tailwind CSS for styling
- Fetch API for client-server communication

---

## Prerequisites

- Node.js (v14 or later recommended)
- Backend API running and accessible (see backend README)
- `.env.local` file configured with backend URL

---

## Setup and Run Locally

1. **Clone this repository**

    ```bash
    git clone <your-frontend-repo-url>
    cd task-frontend
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Configure environment variables**

    Create a .env.local file in the root folder and add:

    ```bash
    NEXT_PUBLIC_API_URL=http://localhost:5000
    ```

    Replace http://localhost:5000 with your backend API URL when deploying.

4. **Run the development server**

    ```bash
    npm run dev
    ```

    Open your browser at http://localhost:3000
 to see the app.

## **Deployment**

For production deployment:

- Update .env.local with your deployed backend API URL.

- Build the app:

    ```bash
    npm run build
    ```

- Start production server:

    ```bash
    npm start
    ```

Or deploy easily on platforms like Vercel which supports Next.js out of the box.