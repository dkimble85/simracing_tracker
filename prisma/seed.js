const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  const danny = await prisma.user.create({
    data: {
      username: 'danny',
      // Hash for password - twixrox
      passwordHash: '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u',
    },
  });

  await Promise.all(
    getTimes().map((time) => {
      const data = { userId: danny.id, ...time };
      return prisma.trackTimes.create({ data });
    })
  );
}

seed();

function getTimes() {
  return [
    {
      game: 'iRacing',
      time: `0:59:231`,
      track: 'Lime Rock Park',
      vehicle: 'Mazda MX-5',
    },
    {
      game: 'ACC',
      time: `1:15:231`,
      track: 'Monza',
      vehicle: 'Lamborghini Huracan GT3 ',
    },
    {
      game: 'GT7',
      time: '1:15:011',
      track: 'Brands Hatch',
      vehicle: 'RCZ',
    },
    {
      game: 'iRacing',
      time: `0:59:200`,
      track: 'Tsukuba',
      vehicle: 'Hyundai Elantra TCR',
    },
    {
      game: 'iRacing',
      time: `1:32:661`,
      track: 'Silverstone International',
      vehicle: 'Hyundai Elantra TCR',
    },
  ];
}
