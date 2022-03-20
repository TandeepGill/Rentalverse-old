# Rentalverse

Deployed Site: https://www.getrentalverse.com/

Rentalverse is a full stack web application designed and developed to help individuals and small real estate investment firms manage their rental properties. This is a unique individual project that I created from the ground up. The inspiration for this project came from my knowledge gained in my previous work experiences. I will be continuously working on this project to build out more complex features. A demo account has been set up, just visit the site and click sign in.

# Data to Input for Demo Purposes

To make things easier, here's some data below to input in order to demo the web application. However, please feel free to use your own data if you'd like instead. You can get images of properties from the following website: https://www.istockphoto.com/search/2/image?family=creative&phrase=home%20exterior

Right click on an image, click 'Copy Image Address', and paste into the form's Image field.

Property Data:

- Type: Single-Family
- Address Line 1: 4701 Prospect Road
- Address Line 2: Irvine, CA 92614
- Bedroom: 5
- Bathroom: 4
- Sqft: 3600
- Image: https://media.istockphoto.com/photos/brown-two-story-all-american-home-picture-id1158713117?k=20&m=1158713117&s=612x612&w=0&h=s_aoDM4KNoixI9qBLmJOBPMccoWsC11zxuBGGgFRiKY=

Tenant Data:

- First Name: Bill
- Last Name: Jax
- Price: 4100

# Features

A user can:

- Add a property (incl. type, address, bedrooms, bathrooms, sqft, and image)
- Add a tenant and lease details associated with a property (incl. name, price, start date, end date)
- Filter properties by type (All, Single-Family, Townhouse, Condo)
- Filter tenants (All, Current, Previous) and view the associated property, current or previous
- Edit a lease and update the rent amount and update the start and end dates to reflect a new lease period
- End a lease when a tenant moves out and marks the tenant as a previous tenant
- Delete a property and all associated data (incl. tenant and lease data) if the user no longer owns the property
- Visit a user profile page and see details about total properties, as well as occupied and vacant properties
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

1. Setup the postgreSQL database by running the following in the command line -- `createdb rentalverse`
2. Clone this repo to your local environment -- `git clone < git repository >`
3. Change directory into the cloned repo with `cd`
4. run `npm install` into your command line
5. run `npm run seed` into your command line
6. run `npm run start:dev` into your command line

Sync and seed your database by running `npm run seed`. In the project directory run `npm run start:dev` and visit http://localhost:8080/ in your web browser to view the project.

# What's Next?

I need to update the database schema to allow for more features to be added. Features such as a user's ability to track maintenance requests and monthly rent payments. The front end styling needs to be improved, along with accessibility. I will be working through these different features and tracking upcoming features in the Nice-To-Have section below.

# Nice-To-Have Features (not an inclusive list)

- Allow a user to input maintenance requests by property and track progress as maintenance is carried out; i.e. Pending, In Progress, Completed
- Allow a user to keep track of rent payments and when they were made
- Add validations and prompts on the front end to visually inform a user when an event occurs
- Allow a user to to edit their account information; i.e. avatar, email, password etc.

# Sample Images/GIFs

## GIFs

### Add a New Property
![AddNewProperty](https://user-images.githubusercontent.com/77635364/159149315-05fb49fd-d31e-4555-a31e-5ccf101e65b3.gif)

### Add a New Tenant
![AddNewTenant](https://user-images.githubusercontent.com/77635364/159149329-af17377d-3ec7-4b61-97fb-c848e39a19cf.gif)

### Edit a Lease and Delete a Property
![EditLeaseAndDeleteProperty](https://user-images.githubusercontent.com/77635364/159149341-911b84f5-6746-48f2-9c2c-bd8b17e68343.gif)

### Filter Properties and Tenants
![FilterPropertiesAndTenants](https://user-images.githubusercontent.com/77635364/159149367-a80a5e96-e923-4e54-8a40-ef4609ad611a.gif)

## Mobile Device Images

<table style="width: 100%;">
  <tr>
    <td style="text-align: center;">Log In</td>
    <td style="text-align: center;">Menu</td>
    <td style="text-align: center;">All Properties</td>
  </tr>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/77635364/159151533-7f901ea9-38cd-40b8-8e4f-9b5d99f7cebd.jpg" alt="Log In" width="300"/></td>
    <td><img src="https://user-images.githubusercontent.com/77635364/159151535-6ce8c1b7-8403-4cef-97dd-46756f783e83.jpg" alt="Menu" width="300"/></td>
    <td><img src="https://user-images.githubusercontent.com/77635364/159151537-13e6cd47-4252-47d6-a143-edbbe08f344e.jpg" alt="All Properties" width="300"/></td>
  </tr>
  <tr>
    <td style="text-align: center;">Single Property</td>
    <td style="text-align: center;">Single Lease</td>
    <td style="text-align: center;">Lease Form</td>
  </tr>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/77635364/159151538-0331c962-7499-44ba-b29f-1c2b686d4f4c.jpg" alt="Single Property" width="300"/></td>
    <td><img src="https://user-images.githubusercontent.com/77635364/159151540-c2c56d19-609c-4e65-bff4-b63c17406ff7.jpg" alt="Single Lease" width="300"/></td>
    <td><img src="https://user-images.githubusercontent.com/77635364/159151542-5a2ea78e-bf7a-474e-aeb3-c17cf25da7d2.jpg" alt="Lease Details Form" width="300"/></td>
  </tr>
  <tr>
    <td style="text-align: center;">Add New Property</td>
    <td style="text-align: center;">All Tenants</td>
  </tr>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/77635364/159151545-f3c11706-5d99-45d9-8008-e72ac70ba43f.jpg" alt="Add New Property Form" width="300"/></td>
    <td><img src="https://user-images.githubusercontent.com/77635364/159151548-628f2e51-b0a0-4ce2-b887-4c6cc881112f.jpg" alt="All Tenants" width="300"/>     </td>
  </tr>
</table>
