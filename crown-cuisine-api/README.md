# Crown Cuisine Backend API

A robust backend API for the Crown Cuisine restaurant application that handles customer and restaurant manager authentication, restaurant management, menu management, reservations, offers, and reviews.

## Features

- Authentication with OTP verification via Twilio
- User management (customers and restaurant managers)
- Restaurant profile management
- Menu and menu item management
- Table reservations system
- Special offers and promotions
- Restaurant reviews and ratings
- Favorites management

## Tech Stack

- Node.js and Express.js for REST API
- MongoDB with Mongoose for database
- JWT for authentication
- Twilio API for OTP verification
- CORS for cross-origin support

## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- MongoDB (local or Atlas)
- Twilio account for OTP verification

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd crown-cuisine/core
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following environment variables:
```
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
MONGO_URI=mongodb://localhost:27017/crown-cuisine
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=30d
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

4. Start the development server
```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register/customer` - Register a new customer
- `POST /api/auth/register/manager` - Register a new restaurant manager
- `POST /api/auth/login` - Login a user
- `POST /api/auth/otp/send` - Send OTP to a phone number
- `POST /api/auth/otp/verify` - Verify OTP
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Restaurant Endpoints

- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get restaurant by ID
- `POST /api/restaurants` - Create a restaurant (manager only)
- `PUT /api/restaurants/manager/restaurant` - Update a restaurant (manager only)
- `PUT /api/restaurants/manager/tables` - Manage restaurant tables (manager only)
- `POST /api/restaurants/favorites` - Add a restaurant to favorites (customer only)
- `DELETE /api/restaurants/favorites/:restaurantId` - Remove a restaurant from favorites (customer only)
- `GET /api/restaurants/customer/favorites` - Get favorite restaurants (customer only)

### Menu Endpoints

- `GET /api/menu/categories/:restaurantId` - Get menu categories for a restaurant
- `GET /api/menu/items/:categoryId` - Get menu items for a category
- `GET /api/menu/popular/:restaurantId` - Get popular menu items for a restaurant
- `GET /api/menu/complete/:restaurantId` - Get complete menu for a restaurant
- `POST /api/menu/categories` - Create a menu category (manager only)
- `PUT /api/menu/categories/:id` - Update a menu category (manager only)
- `DELETE /api/menu/categories/:id` - Delete a menu category (manager only)
- `POST /api/menu/items` - Create a menu item (manager only)
- `PUT /api/menu/items/:id` - Update a menu item (manager only)
- `DELETE /api/menu/items/:id` - Delete a menu item (manager only)

### Reservation Endpoints

- `POST /api/reservations` - Create a reservation (customer only)
- `GET /api/reservations/user/reservations` - Get customer's reservations (customer only)
- `PUT /api/reservations/cancel/:id` - Cancel a reservation (customer only)
- `GET /api/reservations/restaurant/reservations` - Get restaurant's reservations (manager only)
- `PUT /api/reservations/status/:id` - Update reservation status (manager only)
- `GET /api/reservations/tables/available` - Get available tables for a restaurant
- `GET /api/reservations/:id` - Get reservation details

### Offer Endpoints

- `GET /api/offers/active/:restaurantId` - Get active offers for a restaurant
- `POST /api/offers` - Create an offer (manager only)
- `GET /api/offers/manager/offers` - Get offers for a restaurant (manager only)
- `PUT /api/offers/:id` - Update an offer (manager only)
- `DELETE /api/offers/:id` - Delete an offer (manager only)
- `POST /api/offers/save` - Save an offer (customer only)
- `DELETE /api/offers/save/:offerId` - Remove an offer from saved offers (customer only)
- `GET /api/offers/user/saved` - Get user's saved offers (customer only)
- `GET /api/offers/user/expiring` - Get user's expiring offers (customer only)

### Review Endpoints

- `POST /api/reviews` - Create a review (customer only)
- `PUT /api/reviews/:id` - Update a review (customer only)
- `DELETE /api/reviews/:id` - Delete a review (customer only)
- `GET /api/reviews/user/reviews` - Get user's reviews (customer only)
- `POST /api/reviews/reply/:id` - Reply to a review (manager only)
- `GET /api/reviews/restaurant/:restaurantId` - Get reviews for a restaurant
- `GET /api/reviews/stats/:restaurantId` - Get review stats for a restaurant
- `POST /api/reviews/like/:id` - Like a review

## License

ISC 