'use strict';

const {
  db,
  models: { User, Property, Lease },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: 'cody@gmail.com',
      password: '123',
      firstName: 'Cody',
      lastName: 'Banks',
      imageURL: 'https://randomuser.me/api/portraits/men/75.jpg',
    }),
    User.create({
      username: 'murphy@gmail.com',
      password: '123',
      firstName: 'Murphy',
      lastName: 'Brown',
      address: '1810 Hiram Mountain\nNew Maechester, CA 31787-1942',
      imageURL: 'https://randomuser.me/api/portraits/men/50.jpg',
    }),
    User.create({
      username: 'mathilde@gmail.com',
      password: '123',
      firstName: 'Mathilde',
      lastName: 'Schneider',
      address: '1810 Hiram Mountain\nNew Maechester, CA 31787-1942',
      imageURL: 'https://randomuser.me/api/portraits/women/65.jpg',
    }),
    User.create({
      username: 'jaleel@gmail.com',
      password: '123',
      firstName: 'Jaleel',
      lastName: 'Bode',
      address: '632 Hortense Roads Suite 875\nHamillberg, OR 39790-6770',
      imageURL: 'https://randomuser.me/api/portraits/men/55.jpg',
    }),
    User.create({
      username: 'jarrett@gmail.com',
      password: '123',
      firstName: 'Jarrett',
      lastName: 'Kreiger',
      address: '1019 Domenica Lake Suite 191\nNew Freidahaven, WI 14195',
      imageURL: 'https://randomuser.me/api/portraits/men/60.jpg',
    }),
    User.create({
      username: 'asia@gmail.com',
      password: '123',
      firstName: 'Asia',
      lastName: 'Reilly',
      address:
        '39546 Tressa Expressway Apt. 466\nNorth Katharinamouth, VT 45825-3766',
      imageURL: 'https://randomuser.me/api/portraits/women/60.jpg',
    }),
    User.create({
      username: 'helene@gmail.com',
      password: '123',
      firstName: 'Helene',
      lastName: 'Wuckert',
      address: '127 Rosenbaum Squares Suite 658\nYostland, MS 64937-3476',
      imageURL: 'https://randomuser.me/api/portraits/women/70.jpg',
    }),
    User.create({
      username: 'krystina@gmail.com',
      password: '123',
      firstName: 'Krystina',
      lastName: 'Aufderhar',
      address: '654 Gerhold Street Suite 556\nNorth Odieview, WV 15513-8263',
      imageURL: 'https://randomuser.me/api/portraits/women/40.jpg',
    }),
    User.create({
      username: 'Bernard@gmail.com',
      password: '123',
      firstName: 'Bernard',
      lastName: 'Corkery',
      address: '6095 Luna Rue\nPort Raven, MS 58904',
      imageURL: 'https://randomuser.me/api/portraits/men/30.jpg',
    }),
    User.create({
      username: 'destiney@gmail.com',
      password: '123',
      firstName: 'Destiney',
      lastName: 'Franecki',
      address: '602 Dickinson Estate Suite 842\nWest Nobleshire, OK 42744-7204',
      imageURL: 'https://randomuser.me/api/portraits/women/72.jpg',
    }),
  ]);

  // Creating Properties
  const properties = await Promise.all([
    Property.create({
      address: '419 Trantow Skyway\nDollyport, KY 28406',
      bedroom: 4,
      bathroom: 2,
      sqft: 2200,
      imageURL:
        'https://media.istockphoto.com/photos/brand-new-suburban-house-in-sunny-summer-afternoon-picture-id185276186?k=20&m=185276186&s=612x612&w=0&h=eELWrAl22oZVAVyuTTL9BF7aHZ0awxncXQiHOn4ru7Q=',
      type: 'Single-Family',
      userId: 1,
    }),
    Property.create({
      address: '1810 Hiram Mountain\nNew Maechester, CA 31787',
      bedroom: 5,
      bathroom: 4,
      sqft: 3600,
      imageURL:
        'https://media.istockphoto.com/photos/large-perfect-maintenance-free-home-with-covered-porch-picture-id479767334?b=1&k=20&m=479767334&s=170667a&w=0&h=zh4h83NZ-vtVMeGi4KavWE9SkU6ZDr8ksEWE1-bwD2Q=',
      type: 'Single-Family',
      userId: 1,
    }),
    Property.create({
      address: '632 Hortense Roads\nHamillberg, OR 39790',
      bedroom: 2,
      bathroom: 2,
      sqft: 1400,
      imageURL:
        'https://media.istockphoto.com/photos/exterior-view-of-modern-apartment-building-offering-luxury-rental-in-picture-id1322575582?b=1&k=20&m=1322575582&s=170667a&w=0&h=bGCtLpgCEorQuVdW2lbWguNZHcOGPePSwDibgbgyh0U=',
      type: 'Condo',
      userId: 1,
    }),
    Property.create({
      address: '1019 Domenica Lake\nNew Freidahaven, WI 14195',
      bedroom: 3,
      bathroom: 2,
      sqft: 1700,
      imageURL:
        'https://media.istockphoto.com/photos/red-and-gray-row-houses-in-suburbia-picture-id1284635683?b=1&k=20&m=1284635683&s=170667a&w=0&h=S1qKpoVmx8JP0bWjmLYcROtCiJa52rpF0TneWbPt1TI=',
      type: 'Townhouse',
      userId: 1,
    }),
    Property.create({
      address: '39546 Tressa Expressway\nKatharina, VT 45825',
      bedroom: 1,
      bathroom: 1,
      sqft: 1100,
      imageURL:
        'https://media.istockphoto.com/photos/exterior-view-of-modern-apartment-building-picture-id1273552068?b=1&k=20&m=1273552068&s=170667a&w=0&h=WoG5kV_-mTtMerse0mFdODpzq5HBjhlqsF0TqBMHPhg=',
      type: 'Condo',
      userId: 1,
    }),
    Property.create({
      address: '127 Rosenbaum Squares\nYostland, MS 64937',
      bedroom: 5,
      bathroom: 3,
      sqft: 2900,
      imageURL:
        'https://media.istockphoto.com/photos/colonial-style-house-picture-id1284097677?b=1&k=20&m=1284097677&s=170667a&w=0&h=1A7BkHG5OU4WCN7m22OOhvVmU21q4UsYVJPrS1kgcKI=',
      type: 'Single-Family',
      userId: 6,
    }),
    Property.create({
      address: '654 Gerhold Street\nNorth Odieview, WV 15513',
      bedroom: 2,
      bathroom: 1,
      sqft: 1200,
      imageURL:
        'https://media.istockphoto.com/photos/exterior-view-of-modern-apartment-building-picture-id1273552068?b=1&k=20&m=1273552068&s=170667a&w=0&h=WoG5kV_-mTtMerse0mFdODpzq5HBjhlqsF0TqBMHPhg=',
      type: 'Condo',
      userId: 7,
    }),
    Property.create({
      address: '602 Dickinson Estate\nWest Nobleshire, OK 42744',
      bedroom: 4,
      bathroom: 2,
      sqft: 1900,
      imageURL:
        'https://media.istockphoto.com/photos/colorful-townhouses-in-calgary-alberta-canada-picture-id1279204567?b=1&k=20&m=1279204567&s=170667a&w=0&h=ZIvpBDjSKFmUNb7ul0Ssc-ZHbg8onKOPm1ajjrvq-08=',
      type: 'Townhouse',
      userId: 8,
    }),
    Property.create({
      address: '2963 Vincent Ways\nNew Alverta, LA 25139',
      bedroom: 4,
      bathroom: 3,
      sqft: 2200,
      imageURL:
        'https://media.istockphoto.com/photos/new-contemporary-home-picture-id175587524?b=1&k=20&m=175587524&s=170667a&w=0&h=l0woDAaSwONgJ6xF_sFSZ8r9RG_qsT7E4TSVV2W13wU=',
      type: 'Single-Family',
      userId: 9,
    }),
    Property.create({
      address: '5025 Erna Valley Suite 892\nWehnerhaven, GA 65976',
      bedroom: 3,
      bathroom: 3,
      sqft: 2000,
      imageURL:
        'https://media.istockphoto.com/photos/row-of-townhouses-picture-id182218173?b=1&k=20&m=182218173&s=170667a&w=0&h=cRF14_uBNH8C61GbwTGl0NC9FsOz9ZdisCw6uj3kDmo=',
      type: 'Townhouse',
      userId: 10,
    }),
  ]);

  // Creating Leases
  const leases = await Promise.all([
    Lease.create({
      firstName: 'Elyse',
      lastName: 'Landry',
      startDate: '2021-03-23',
      endDate: '2022-03-22',
      price: '3500',
      isCurrentTenant: true,
      propertyId: 1,
      userId: 1,
    }),
    Lease.create({
      firstName: 'Julianna',
      lastName: 'Irwin',
      startDate: '2021-05-15',
      endDate: '2022-05-14',
      price: '1800',
      isCurrentTenant: true,
      propertyId: 2,
      userId: 1,
    }),
    Lease.create({
      firstName: 'Kaitlynn',
      lastName: 'Tanner',
      startDate: '2021-10-04',
      endDate: '2022-10-03',
      price: '2100',
      isCurrentTenant: true,
      propertyId: 3,
      userId: 1,
    }),
    Lease.create({
      firstName: 'Kash',
      lastName: 'Wade',
      startDate: '2021-07-12',
      endDate: '2022-07-11',
      price: '4500',
      isCurrentTenant: true,
      propertyId: 4,
      userId: 1,
    }),
    Lease.create({
      firstName: 'Skye',
      lastName: 'House',
      startDate: '2021-02-06',
      endDate: '2022-02-05',
      price: '2800',
      isCurrentTenant: true,
      propertyId: 5,
      userId: 1,
    }),
    Lease.create({
      firstName: 'Payton',
      lastName: 'Owens',
      startDate: '2021-08-17',
      endDate: '2022-08-16',
      price: '3200',
      isCurrentTenant: true,
      propertyId: 6,
      userId: 6,
    }),
    Lease.create({
      firstName: 'Ashton',
      lastName: 'Pierce',
      startDate: '2021-06-21',
      endDate: '2022-06-20',
      price: '1500',
      isCurrentTenant: true,
      propertyId: 7,
      userId: 7,
    }),
    Lease.create({
      firstName: 'Jacqueline',
      lastName: 'Griffith',
      startDate: '2021-07-07',
      endDate: '2022-07-06',
      price: '2300',
      isCurrentTenant: true,
      propertyId: 8,
      userId: 8,
    }),
    Lease.create({
      firstName: 'Jack',
      lastName: 'Barton',
      startDate: '2021-04-27',
      endDate: '2022-04-26',
      price: '1700',
      isCurrentTenant: true,
      propertyId: 9,
      userId: 9,
    }),
    Lease.create({
      firstName: 'Thomas',
      lastName: 'Santana',
      startDate: '2021-06-25',
      endDate: '2022-06-24',
      price: '2800',
      isCurrentTenant: true,
      propertyId: 10,
      userId: 10,
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
