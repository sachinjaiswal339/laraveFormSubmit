# Laravel Project Setup

## Overview

This test involves building a Laravel application with a user creation form inside a Bootstrap 5 modal. The form is submitted via JavaScript without reloading the page, and client-side and server-side validations are implemented. Here’s a brief breakdown:

## Prerequisites

1. **PHP** (version 8.2 or higher)
2. **Composer** (for managing PHP dependencies)
3. **MySQL** (or any other compatible database)
4. **Node**

## Setup Instructions

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/sachinjaiswal339/laraveFormSubmit.git
cd laraveFormSubmit
```

### 2. Install PHP Dependencies

Install the PHP dependencies using Composer:

```bash
composer install
```

### 3. Install PHP Dependencies

Install the node dependencies using Composer:

```bash
npm install
```

### Configure Environment Variables

1. **Create the .env File**:

Copy the example environment file to create a new .env file:

```bash
cp .env.example .env
```

2 **Set Up Database Configuration**:

Open the .env file and configure your database settings:

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
```

Make sure to replace your_database_name, your_database_username, and your_database_password with your actual database credentials.

**Generate Application Key**:
Generate a new application key for the Laravel project:

```bash
php artisan key:generate
```

**Run Migrations**:
Run the database migrations to set up the necessary tables:

```bash
php artisan migrate
```

**Run Seeder**:
Run the seeder to set up the necessary data in token:

```bash
php artisan db:seed --class=RoleSeeder

```

**Start PHP Server**:
Open a new terminal and start the PHP development server:

```bash
php artisan serve
```

**Start node dev**:
Open a new terminal and start the node development server:

```bash
npm run dev
```

The application will be accessible at http://127.0.0.1:8000 (or another port specified in the output).
