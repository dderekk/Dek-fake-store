Fake Store
==========

This project is an e-commerce application that allows users to browse products, add them to a cart, and place orders. It features user authentication, profile management, and an intuitive user interface.

Table of Contents
-----------------

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Code Structure](#code-structure)
- [Contributing](#contributing)

Introduction
------------

Fake Store is a fully functional e-commerce application built using React Native for the front end and Node.js for the back end. It allows users to browse products, manage their shopping cart, and place orders. The app also includes user authentication and profile management features.

Features
--------

- User authentication (sign up, sign in, and sign out)
- Profile management (update profile information)
- Product browsing by categories
- Add products to the shopping cart
- View and manage items in the shopping cart
- Place orders and view order history
- Responsive design for both Android and iOS

Installation
------------

To run this project, you need to have Node.js and npm installed along with the following libraries:

- React Native
- Redux
- Expo
- Node.js (for the backend)
- Express.js
- MongoDB (or any other database of your choice)

You can install the required libraries using npm:

\`\`\`bash
npm install
\`\`\`

Usage
-----

To use this project, follow these steps:

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/your-username/fake-store.git
   \`\`\`

2. Navigate to the project directory:
   \`\`\`bash
   cd fake-store
   \`\`\`

3. Install dependencies for both the client and server:
   \`\`\`bash
   cd client
   npm install
   cd ../server
   npm install
   \`\`\`

4. Start the backend server:
   \`\`\`bash
   npm start
   \`\`\`

5. Start the React Native application:
   \`\`\`bash
   cd client
   expo start
   \`\`\`

Code Structure
--------------

- \`client/\`: Contains the React Native front end code.
  - \`components/\`: Reusable UI components.
  - \`screens/\`: Application screens (SignIn, SignUp, Profile, ProductCategories, ProductDetails, Cart, MyOrders).
  - \`redux/\`: Redux setup for state management.
- \`server/\`: Contains the Node.js backend code.
  - \`controllers/\`: Request handlers for different routes.
  - \`models/\`: Database schemas and models.
  - \`routes/\`: API routes.
  - \`config/\`: Configuration files (e.g., database connection).

### Client Side

#### SignUpScreen.js

This screen is responsible for:
- Handling user sign up.
- Validating input fields (name, email, password).
- Displaying error messages for invalid inputs.
- Sending user data to the backend for registration.

#### ProductCategoriesScreen.js

This screen is responsible for:
- Displaying product categories.
- Navigating to the products list of a selected category.

### Server Side

#### orderController.js

This file is responsible for:
- Handling order creation.
- Fetching user orders.
- Updating order status (paid, delivered).

Contributing
------------

Contributions are welcome! If you have any improvements or suggestions, please open an issue or create a pull request.


This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
