# Inventory Management System

A modern, responsive inventory management application built with React and Vite, featuring user authentication, CRUD operations, and a clean Persian/Farsi user interface.

## 🚀 Features

- **User Authentication**: Secure login and signup system with JWT tokens
- **Inventory Management**: Full CRUD operations for products
- **Search & Filter**: Real-time search functionality for products
- **Pagination**: Efficient data pagination for large inventories
- **Responsive Design**: Modern UI that works on all devices
- **Persian/Farsi Support**: RTL language support with custom fonts
- **Form Validation**: Robust form validation using Yup and React Hook Form
- **Toast Notifications**: User-friendly feedback messages
- **Protected Routes**: Secure access to inventory management

## 🛠️ Tech Stack

- **Frontend**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **Routing**: React Router DOM 7.8.0
- **State Management**: React Context API
- **Forms**: React Hook Form 7.62.0
- **Validation**: Yup 1.7.0
- **HTTP Client**: Axios 1.11.0
- **Styling**: CSS Modules
- **Icons & Spinners**: React Spinners 0.17.0
- **Notifications**: React Toastify 11.0.5
- **Linting**: ESLint 9.33.0

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── DeleteModal.jsx
│   ├── EditModal.jsx
│   ├── InventoryHeader.jsx
│   ├── InventoryPagination.jsx
│   ├── InventoryTableRow.jsx
│   └── SecureRoute.jsx
├── context/            # React Context for state management
│   ├── ProductsContext.jsx
│   └── UserContext.jsx
├── pages/              # Application pages
│   ├── Inventory.jsx
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   └── PageNotFound.jsx
├── services/           # API and HTTP services
│   └── httpRequests.js
├── schema/             # Form validation schemas
│   └── loginForm.js
├── constants/          # Application constants
│   └── toastMessages.js
├── assets/             # Images and static assets
├── fonts/              # Custom font files
└── global.css          # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mohammadreza-pouladvand_week19
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔐 Authentication

The application includes a secure authentication system:

- **Login**: Username/password authentication with JWT tokens
- **Signup**: User registration with validation
- **Protected Routes**: Inventory management is only accessible to authenticated users
- **Token Storage**: JWT tokens stored in localStorage for session persistence

## 📦 Inventory Management

### Core Features

- **Add Products**: Create new inventory items with validation
- **Edit Products**: Update existing product information
- **Delete Products**: Remove products with confirmation modal
- **Search Products**: Real-time search by product name
- **Pagination**: Navigate through large product lists efficiently

### Product Operations

- Create, Read, Update, Delete (CRUD) operations
- Form validation for all inputs
- Confirmation dialogs for destructive actions
- Loading states and error handling
- Responsive table layout

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Persian/Farsi Support**: RTL language support with custom fonts
- **Loading States**: Visual feedback during operations
- **Toast Notifications**: User-friendly success/error messages
- **Modal Dialogs**: Clean interaction patterns for forms and confirmations

**Note**: This is a bootcamp project demonstrating modern React development practices, state management, and user interface design.
