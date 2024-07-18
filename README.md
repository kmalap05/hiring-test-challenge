# Next.js Project Setup

## Introduction

This repository contains a Next.js project setup for hiring-test-challenge.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (v20.0 or higher)
- npm or yarn package manager
- MongoDB (if using a database)

## Getting Started

Follow these steps to get the project up and running on your local machine:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/KedarMalapDev/hiring-test-challenge.git
   cd hiring-test-challenge
   ```

2. **Install dependencies:**

   ```bash
   npm install   # or yarn install
   ```

3. **Set up environment variables:**

   - Create a `.env.local` file in the root directory.
   - Add necessary environment variables (e.g., MongoDB URI, API keys).

     Example `.env.local` file:

     ```
     MONGODB_URI=mongodb://localhost:27017/your-database-name
     PRODUCT_URI=http://hostname/api
     NODE_ENV=development
     ```

4. **Start the development server:**

   ```bash
   npm run dev   # or yarn dev
   ```

5. **Open your browser:**

   Your Next.js application should now be running on `http://localhost:3000`.

## Project Structure

- **`/pages`**: Contains Next.js pages.
- **`/pages/components`**: Reusable React components.
- **`/public/assetss`**: Static assets.
- **`/pages/global.css`**: Global stylesheet.
- **`/lib`**: Utility functions (e.g., MongoDB connection).

## Additional Notes

- Ensure proper `.gitignore` rules are set for sensitive files like `.env.local`.
