# **Laravel and React Boilerplate with TailwindCSS**

## **About This Project**

This project is a boilerplate for setting up a web application, thoughtfully integrated with Laravel, React, and TailwindCSS for a utility-first CSS styling approach. It aims to provide a resilient foundation for building robust and scalable web applications, significantly streamlining the development process.

### **Developed By**
- **Aslam** 
  - [LinkedIn](https://in.linkedin.com/in/aslamise)
  
### **Organization**
- **Bpract Software Solutions LLP**
  - [Website](https://bpract.com)
  

## **Prerequisites**

- PHP 8.1
- Composer
- Node.js

Before starting the installation, ensure your environment meets the prerequisites listed above.

## **Getting Started**

### **1. Downloading the Project**
   - Clone the repository using the following GIT command:
     ```bash
     git clone [repository_url]
     ```

### **2. Database Configuration**
   - Create a new database for the application.
   - Copy the `.env.example` file, renaming the copied file to `.env`.
   - Open the `.env` file and update the database credentials (`DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`).



### **1. Downloading the Project**
   - Download the project from the repository, or you can clone it using the following GIT command:
     ```bash
     git clone [repository_url]
     ```

### **2. Configuring Environment Variables**
   - Copy the `.env.example` file and rename the copied file to `.env`.
   - Open the `.env` file and configure the database credentials.

### **3. Project Dependencies Installation**
   - Open a terminal and navigate to the project's root directory.
   - Install the PHP dependencies by running:
     ```bash
     composer install
     ```

### **4. Application Key Generation**
   - Generate an application key to secure user sessions and encrypted data by executing:
     ```bash
     php artisan key:generate --ansi
     ```

### **5. Database Migrations and Seeding**
   - Run migrations and seed the database with the necessary data by executing:
     ```bash
     php artisan migrate --seed
     ```

### **6. Starting the Local Server**
   - Start the local development server by executing:
     ```bash
     php artisan serve
     ```

### **7. Setting up the React Environment**
   - Open a new terminal window and navigate to the react folder within the project directory.

### **8. Configuring React Environment Variables**
   - Copy the `react/.env.example` file and rename the copied file to `.env`.
   - Adjust the `VITE_API_BASE_URL` parameter within the `.env` file.

### **9. Installing Node Dependencies**
   - Install the necessary Node.js packages and dependencies by running:
     ```bash
     npm install
     ```

### **10. Starting the Vite Server**
   - Start the Vite development server for React by executing:
     ```bash
     npm run dev
     ```

## **Conclusion**
You should now have the boilerplate running locally in your development environment, ready for further customization and development. Navigate to the application in your web browser to start using it.
