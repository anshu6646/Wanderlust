# Wanderlust - Travel Listing Platform

A full-stack travel listing platform where users can browse, create and review travel stays. It supports authentication, cloud image uploads and interactive maps, and follows the MVC architecture.

## Features

- User signup, login and logout with Passport.js
- Create, view, edit and delete travel listings
- Ownership-based access control: only the owner can edit or delete a listing, and only the author can delete a review
- Ratings and reviews on listings
- Image uploads stored on Cloudinary
- Interactive map for each listing using Leaflet.js, with location search powered by the OpenStreetMap Nominatim API
- Listings organised into 9 categories
- Server-side validation with Joi
- Centralized error handling with a custom `ExpressError` class and async wrapper
- Cascading deletion: removing a listing also deletes its reviews

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose (geospatial Point coordinates for each listing)
- **Authentication:** Passport.js
- **Validation:** Joi
- **Frontend:** EJS templates, HTML, CSS, Bootstrap, Leaflet.js
- **Image storage:** Cloudinary
- **Maps and geocoding:** Leaflet.js, OpenStreetMap Nominatim API

## Project Structure

```text
Wanderlust/
├── controllers/     # Route handler logic
├── models/          # Mongoose schemas (Listing, Review, User)
├── routes/          # Express routers
├── views/           # EJS templates
├── public/          # Static files (CSS, JS)
├── utils/           # ExpressError and async wrapper
├── init/            # Sample data for seeding the database
├── app.js           # Application entry point
├── middleware.js    # Auth, ownership and validation middleware
├── schema.js        # Joi validation schemas
└── cloudConfig.js   # Cloudinary configuration
```

## Run Locally

### Requirements
- [Node.js](https://nodejs.org/en/download)
- A MongoDB database (local or MongoDB Atlas)
- A free [Cloudinary](https://cloudinary.com) account

### Setup

```shell
git clone https://github.com/anshu6646/Wanderlust.git
cd Wanderlust
npm install
```

Create a `.env` file in the root folder:

```env
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
```

(Optional) Seed the database with sample listings:

```shell
node init/index.js
```

Start the server:

```shell
node app.js
```

Open `http://localhost:8080/listings` in your browser.
