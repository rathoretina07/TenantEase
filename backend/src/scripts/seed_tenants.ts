import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const managerEmail = 'manager@tenantease.com';
  const manager = await prisma.user.findUnique({ where: { email: managerEmail } });

  if (!manager) {
    console.error('Manager not found. Please run the initial seed first.');
    return;
  }

  console.log(`Adding tenants for manager: ${manager.email}`);

  // Create a new property with more units
  const property = await prisma.property.create({
    data: {
      managerId: manager.id,
      name: 'Palm Gardens',
      address: '456 Palm Ave',
      city: 'Miami',
      state: 'FL',
      zipCode: '33101',
      status: 'ACTIVE',
      units: {
        create: [
          { unitNumber: 'A1', bedrooms: 1, bathrooms: 1, rentAmount: 1500, status: 'OCCUPIED' },
          { unitNumber: 'A2', bedrooms: 1, bathrooms: 1, rentAmount: 1500, status: 'OCCUPIED' },
          { unitNumber: 'B1', bedrooms: 2, bathrooms: 2, rentAmount: 2200, status: 'OCCUPIED' },
          { unitNumber: 'B2', bedrooms: 2, bathrooms: 2, rentAmount: 2200, status: 'OCCUPIED' },
          { unitNumber: 'C1', bedrooms: 3, bathrooms: 2.5, rentAmount: 3000, status: 'OCCUPIED' },
          { unitNumber: 'C2', bedrooms: 3, bathrooms: 2.5, rentAmount: 3000, status: 'VACANT' },
          { unitNumber: 'D1', bedrooms: 1, bathrooms: 1, rentAmount: 1400, status: 'MAINTENANCE' },
        ]
      }
    },
    include: { units: true }
  });

  const tenantsData = [
    { email: 'john.smith@example.com', firstName: 'John', lastName: 'Smith', unit: 'A1' },
    { email: 'maria.garcia@example.com', firstName: 'Maria', lastName: 'Garcia', unit: 'A2' },
    { email: 'robert.brown@example.com', firstName: 'Robert', lastName: 'Brown', unit: 'B1' },
    { email: 'linda.wilson@example.com', firstName: 'Linda', lastName: 'Wilson', unit: 'B2' },
    { email: 'michael.lee@example.com', firstName: 'Michael', lastName: 'Lee', unit: 'C1' },
  ];

  const passwordHash = await bcrypt.hash('password123', 10);

  for (const t of tenantsData) {
    const user = await prisma.user.create({
      data: {
        email: t.email,
        passwordHash,
        role: 'TENANT',
        isVerified: true,
        profile: {
          create: {
            firstName: t.firstName,
            lastName: t.lastName,
            phone: `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`,
          }
        }
      }
    });

    const unit = property.units.find(u => u.unitNumber === t.unit);
    if (unit) {
      await prisma.lease.create({
        data: {
          unitId: unit.id,
          tenantId: user.id,
          startDate: new Date('2024-01-01'),
          endDate: new Date('2025-01-01'),
          rentAmount: unit.rentAmount,
          depositAmount: unit.rentAmount,
          status: 'ACTIVE',
        }
      });

      // Add a recent payment
      await prisma.payment.create({
        data: {
          leaseId: (await prisma.lease.findFirst({ where: { tenantId: user.id } }))!.id,
          tenantId: user.id,
          amount: unit.rentAmount,
          status: Math.random() > 0.2 ? 'COMPLETED' : 'OVERDUE',
          dueDate: new Date(),
          paidDate: new Date(),
          paymentMethod: 'BANK_TRANSFER',
        }
      });
    }
  }

  console.log('Seeding of additional tenants completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
