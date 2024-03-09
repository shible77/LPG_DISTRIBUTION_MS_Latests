# LPG Distribution Management System

Welcome to the LPG Distribution Management System! This system is designed to help you manage various aspects of your LPG distribution business, including contacts, employee information, sales and purchase records, product details, stock management, accounts, and reporting. The project is structured with separate folders for the frontend, backend, an additional backend folder (backend1), and a folder to store MySql files (database).

## Table of Contents

- [Project Structure](#project-structure)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Folder Details](#folder-details)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

- **frontend**: Contains the code for the user interface.
- **backend**: Primary backend codebase.
- **backend1**: Additional backend codebase.
- **database**: Stores MySql file.

## Features

1. **Contact Management**: Keep track of essential contact numbers related to your LPG distribution business.

2. **Employee Information**: Manage details about your employees efficiently.

3. **Sales and Purchase Management**: Record and monitor sales and purchase information.

4. **Product Information**: Keep a comprehensive list of products and their details.

5. **Stock Management**: Track and manage your stock effectively.

6. **Accounts Management**: Handle financial transactions and accounts.

7. **Reports**: Generate reports for different aspects of your business.

8. **Income and Expense Tracking**: Monitor income and expenses to maintain financial stability.

## Setup Instructions

1. Clone the repository: `git clone https://github.com/shible77/LPG_DISTRIBUTION_MS_Latests.git`

2. Navigate to the project directory: `cd LPG_Distribution_Management_System`

3. Install dependencies for the frontend, backend and backend1.

   ```bash
   # For frontend
   cd frontend
   npm install

   # For backend
   cd ../backend
   npm install

   #for backend1
   cd ../backend1
   npm install
   ```
4. Set up the database:
   - Open Xampp.
   - Start the Xampp server and MySQL.
   - Click the admin button beside the MySQL start button. This will take you to the phpMyAdmin page.
   - On the phpMyAdmin page, click on the database tab. This will take you to the database management page.
   - Create a new database with the name lpg_distribution. (Note: You can choose a different name, but ensure consistency with your project configuration.)
   - After creating the database, navigate to the top of the page and click on "Import."
   - On the Import page, click on the "Choose File" button to select the SQL file (lpg_distribution.sql) from the database folder of your project directory.
   - Once the file is selected, click the "Import" button at the lower part of the page.
   - Congratulations! Your database is now ready for use.
5. Now, start the application.
   - Open the project folder in VS Code.
   - Create 3 instances of powershell in the terminal of VS Code.
   - In the first powershell instance, write the following command: 
   ```bash
   # For backend
   cd backend
   npm start 
   ```
   - In the second powershell instance, write the following command:
   ```bash
   # For backend1
   cd backend1
   npm start
   ```
   - IN the third and the last powershell instance, write the following command:
   ```bash
   # For frontend
   cd frontend
   npm start
   ```
   - Then, it will open the login page of this web application in your default browser.
   - You can login the application using the following log in credentials:
   1.email:
   ```bash
   shible0805@gmail.com
   ``` 
   2.password:
   ```bash
   shible7
   ```
   - Your are logged in. Now, You can access all the features provided by our LPG Distribution Management System.
   
## Usage

1. Access the frontend through the provided URL after starting the frontend server.

2. Use the system to manage contacts, employee information, sales and purchases, products, stock, accounts, and generate reports.

## Folder Details
- **frontend**: Contains the user interface code.
- **backend**: Main backend codebase.
- **backend1**: Additional backend codebase.
- **database**: MySql file for setting up and managing the database.

## Contributing
Contributions are welcome! Feel free to submit issues and pull requests.

## License
This project is licensed under the [MIT License](LICENSE).

Good luck with LPG Distribution Management System!

