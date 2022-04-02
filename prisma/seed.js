const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getTimes().map((time) => {
      return db.time.create({ data: time });
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
