import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  console.log('🌱 Starting database seed...');

  // Hash password for all test accounts
  const hashedPassword = await bcrypt.hash('Password123!', 10);

  // Create Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ecoride.com' },
    update: {},
    create: {
      email: 'admin@ecoride.com',
      pseudo: 'Admin',
      password: hashedPassword,
      role: 'ADMIN',
      credits: 1000,
    },
  });
  console.log('✅ Admin user created:', admin.pseudo);

  // Create Employee
  const employee = await prisma.user.upsert({
    where: { email: 'employee@ecoride.com' },
    update: {},
    create: {
      email: 'employee@ecoride.com',
      pseudo: 'Employee',
      password: hashedPassword,
      role: 'EMPLOYEE',
      credits: 100,
    },
  });
  console.log('✅ Employee user created:', employee.pseudo);

  // Create Drivers
  const driver1 = await prisma.user.upsert({
    where: { email: 'driver@ecoride.com' },
    update: {},
    create: {
      email: 'driver@ecoride.com',
      pseudo: 'JeanDriver',
      password: hashedPassword,
      role: 'DRIVER',
      credits: 50,
    },
  });

  const driver2 = await prisma.user.upsert({
    where: { email: 'marie.eco@ecoride.com' },
    update: {},
    create: {
      email: 'marie.eco@ecoride.com',
      pseudo: 'MarieEco',
      password: hashedPassword,
      role: 'DRIVER',
      credits: 75,
    },
  });

  const driver3 = await prisma.user.upsert({
    where: { email: 'paul.green@ecoride.com' },
    update: {},
    create: {
      email: 'paul.green@ecoride.com',
      pseudo: 'PaulGreen',
      password: hashedPassword,
      role: 'DRIVER',
      credits: 60,
    },
  });
  console.log('✅ Drivers created:', driver1.pseudo, driver2.pseudo, driver3.pseudo);

  // Create Passengers
  const passenger1 = await prisma.user.upsert({
    where: { email: 'passenger@ecoride.com' },
    update: {},
    create: {
      email: 'passenger@ecoride.com',
      pseudo: 'Passenger1',
      password: hashedPassword,
      role: 'PASSENGER',
      credits: 20,
    },
  });

  const passenger2 = await prisma.user.upsert({
    where: { email: 'lucie.voyage@ecoride.com' },
    update: {},
    create: {
      email: 'lucie.voyage@ecoride.com',
      pseudo: 'LucieVoyage',
      password: hashedPassword,
      role: 'PASSENGER',
      credits: 25,
    },
  });

  const passenger3 = await prisma.user.upsert({
    where: { email: 'tom.travel@ecoride.com' },
    update: {},
    create: {
      email: 'tom.travel@ecoride.com',
      pseudo: 'TomTravel',
      password: hashedPassword,
      role: 'PASSENGER',
      credits: 30,
    },
  });
  console.log('✅ Passengers created:', passenger1.pseudo, passenger2.pseudo, passenger3.pseudo);

  // Create Vehicles
  const vehicle1 = await prisma.vehicle.create({
    data: {
      brand: 'Tesla',
      model: 'Model 3',
      energyType: 'ELECTRIC',
      seats: 4,
      userId: driver1.id,
    },
  });

  const vehicle2 = await prisma.vehicle.create({
    data: {
      brand: 'Toyota',
      model: 'Prius',
      energyType: 'HYBRID',
      seats: 4,
      userId: driver2.id,
    },
  });

  const vehicle3 = await prisma.vehicle.create({
    data: {
      brand: 'Renault',
      model: 'Zoe',
      energyType: 'ELECTRIC',
      seats: 4,
      userId: driver3.id,
    },
  });

  const vehicle4 = await prisma.vehicle.create({
    data: {
      brand: 'Peugeot',
      model: '308',
      energyType: 'HYBRID',
      seats: 5,
      userId: driver1.id,
    },
  });
  console.log('✅ Vehicles created: 4 vehicles');

  // Create Preferences
  await prisma.preference.createMany({
    data: [
      {
        smokingAllowed: false,
        petsAllowed: true,
        musicAllowed: true,
        talkingAllowed: true,
        userId: driver1.id,
      },
      {
        smokingAllowed: false,
        petsAllowed: false,
        musicAllowed: true,
        talkingAllowed: true,
        userId: driver2.id,
      },
      {
        smokingAllowed: false,
        petsAllowed: true,
        musicAllowed: false,
        talkingAllowed: false,
        userId: driver3.id,
      },
    ],
  });
  console.log('✅ Preferences created: 3 preferences');

  // Create Future Carpools
  const carpool1 = await prisma.carpool.create({
    data: {
      departure: 'Paris',
      destination: 'Lyon',
      departureDate: new Date('2026-02-10T08:00:00Z'),
      departureTime: '08:00',
      arrivalTime: '12:00',
      availableSeats: 3,
      pricePerSeat: 25,
      platformPrice: 27,
      status: 'PENDING',
      driverId: driver1.id,
      vehicleId: vehicle1.id,
    },
  });

  await prisma.carpool.createMany({
    data: [
      {
        departure: 'Paris',
        destination: 'Lyon',
        departureDate: new Date('2026-02-12T09:00:00Z'),
        departureTime: '09:00',
        arrivalTime: '13:00',
        availableSeats: 2,
        pricePerSeat: 30,
        platformPrice: 32,
        status: 'PENDING',
        driverId: driver2.id,
        vehicleId: vehicle2.id,
      },
      {
        departure: 'Paris',
        destination: 'Lyon',
        departureDate: new Date('2026-02-15T07:30:00Z'),
        departureTime: '07:30',
        arrivalTime: '11:30',
        availableSeats: 4,
        pricePerSeat: 22,
        platformPrice: 24,
        status: 'PENDING',
        driverId: driver3.id,
        vehicleId: vehicle3.id,
      },
      {
        departure: 'Paris',
        destination: 'Marseille',
        departureDate: new Date('2026-02-11T06:00:00Z'),
        departureTime: '06:00',
        arrivalTime: '14:00',
        availableSeats: 3,
        pricePerSeat: 45,
        platformPrice: 47,
        status: 'PENDING',
        driverId: driver1.id,
        vehicleId: vehicle4.id,
      },
    ],
  });
  console.log('✅ Carpools created: 4+ carpools');

  // Create Bookings
  await prisma.booking.create({
    data: {
      carpoolId: carpool1.id,
      passengerId: passenger1.id,
      seats: 1,
      status: 'CONFIRMED',
      confirmed: false,
    },
  });
  console.log('✅ Bookings created');

  // Create Reviews
  await prisma.review.createMany({
    data: [
      {
        rating: 5,
        comment: 'Excellent conducteur, très ponctuel et véhicule propre !',
        status: 'APPROVED',
        authorId: passenger1.id,
        recipientId: driver1.id,
      },
      {
        rating: 4,
        comment: 'Bon trajet, musique un peu forte mais agréable.',
        status: 'APPROVED',
        authorId: passenger2.id,
        recipientId: driver1.id,
      },
      {
        rating: 3,
        comment: 'Trajet correct mais retard de 15 minutes au départ.',
        status: 'PENDING',
        authorId: passenger2.id,
        recipientId: driver3.id,
      },
    ],
  });
  console.log('✅ Reviews created: 3 reviews');

  console.log('🎉 Database seeding completed!');
  console.log('');
  console.log('📧 Test accounts (password: Password123!):');
  console.log('  - Admin: admin@ecoride.com');
  console.log('  - Employee: employee@ecoride.com');
  console.log('  - Driver: driver@ecoride.com');
  console.log('  - Passenger: passenger@ecoride.com');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
