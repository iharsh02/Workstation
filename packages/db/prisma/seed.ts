import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await hash('password123', 10);

  const user = await prisma.user.upsert({
    where: { username: 'exampleuser' },
    update: {},
    create: {
      username: 'exampleuser',
      hashedPassword,
    },
  });

  console.log({ user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
