# Rentalverse

Rentalverse is a full stack web application designed and developed to help individuals and small real estate investment firms manage their rental properties. This is a unique individual project that I created from the ground up. The inspiration for this project came from my knowledge gained in my previous work experiences. I will be continuously working on this project to build out more complex features.

# Features

A user can:

- Add a property (incl. type, address, bedrooms, bathrooms, sqft, and image)
- Add a tenant and lease details associated with a property (incl. name, price, start date, end date)
- Filter properties by type (All, Single-Family, Townhouse, Condo)
- Filter tenants (All, Current, Previous) and view the associated property, current or previous
- Edit a lease and update the rent amount and update the start and end dates to reflect a new lease period
- End a lease when a tenant moves out and marks the tenant as a previous tenant
- Delete a property and all associated data (incl. tenant and lease data) if the user no longer owns the property
- Visit a user profile page and see details about total properties, current tenants and previous tenants
- ...More Features To Come!

# Tech Stack

This web app utilizes the following technologies (not an inclusive list):

- React - class based components
- React Router - declarative routing
- Redux - global state management
- Axios - client side requests
- Tailwind - utility first CSS framework
- Express - server and back end API endpoints
- PostgreSQL - database
- Sequelize - object relational mapper (ORM) for database querying
- Bcrypt and JWT - authentication and authorization

# Set-Up

1. Setup the postgreSQL database by running the following in the command line -- createdb rentalverse
2. Clone this repo to your local environment -- git clone < git repository >
3. cd (change directory) into the repo
4. run 'npm install' into your command line
5. run 'npm run seed' into your command line
6. run 'npm run start:dev' into your command line

Sync and seed your database by running `npm run seed`. In the project directory run `npm run start:dev` and visit http://localhost:8080/ in your web browser to view the project.

# What's Next?

I need to update the database schema to allow for more features to be added, such as the ability of a user to track maintenance requests and monthly rent payments. The front end styling needs to be improved, along with accessibility. I will be working through these different features and tracking upcoming features in the Nice-To-Have section below.

# Nice-To-Have Features (not an inclusive list)

- Allow a user to input maintenance requests by property and track progress as maintenance is carried out; i.e. Pending, In Progress, Completed
- Allow a user to keep track of rent payments and when they were made
- Add validations and prompts on the front end to visually inform a user
- Allow a user to to edit their account information; i.e. avatar, email, password etc.

# Sample Images/GIFs

- Coming Soon!
