import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding SQLite ...`);

  // 1. Create a Manager
  const passwordHash = await bcrypt.hash('password123', 10);
  const manager = await prisma.user.create({
    data: {
      email: 'manager@tenantease.com',
      passwordHash,
      role: 'MANAGER',
      isVerified: true,
      profile: {
        create: {
          firstName: 'Alex',
          lastName: 'Landlord',
          phone: '+1234567890',
        },
      },
    },
  });
  console.log(`Created manager with id: ${manager.id}`);

  // 2. Create a Tenant
  const tenant = await prisma.user.create({
    data: {
      email: 'tenant@tenantease.com',
      passwordHash,
      role: 'TENANT',
      isVerified: true,
      profile: {
        create: {
          firstName: 'Jane',
          lastName: 'Doe',
          phone: '+0987654321',
        },
      },
    },
  });
  console.log(`Created tenant with id: ${tenant.id}`);

  // 3. Create a Property for the Manager
  const property = await prisma.property.create({
    data: {
      managerId: manager.id,
      name: 'Sunset Apartments',
      address: '123 Sunset Blvd',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90028',
      status: 'ACTIVE',
      units: {
        create: [
          {
            unitNumber: '101',
            bedrooms: 2,
            bathrooms: 1.5,
            rentAmount: 2500.00,
            status: 'OCCUPIED',
          },
          {
            unitNumber: '102',
            bedrooms: 1,
            bathrooms: 1,
            rentAmount: 1800.00,
            status: 'VACANT',
          }
        ]
      }
    },
    include: {
      units: true,
    }
  });
  console.log(`Created property with id: ${property.id}`);

  // 4. Create a Lease for the Tenant in Unit 101
  const unit101 = property.units.find(u => u.unitNumber === '101');
  if (unit101) {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1); // 1 year lease

    const lease = await prisma.lease.create({
      data: {
        unitId: unit101.id,
        tenantId: tenant.id,
        startDate,
        endDate,
        rentAmount: 2500.00,
        depositAmount: 2500.00,
        status: 'ACTIVE',
      }
    });
    console.log(`Created lease with id: ${lease.id}`);

    // 5. Create a Payment Record
    const payment = await prisma.payment.create({
      data: {
        leaseId: lease.id,
        tenantId: tenant.id,
        amount: 2500.00,
        status: 'COMPLETED',
        dueDate: new Date(),
        paidDate: new Date(),
        paymentMethod: 'STRIPE',
      }
    });
    console.log(`Created payment with id: ${payment.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
