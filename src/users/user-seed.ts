import { faker } from '@faker-js/faker';
import { User } from './entities/user.entity.js';

export function createFakeUsers(count: number): User[] {
  return Array.from({ length: count }, () => {
    const user = new User();

    user.firstName = faker.person.firstName();
    user.lastName = faker.person.lastName();
    user.email = faker.internet.email();
    user.status = faker.helpers.arrayElement([
      'ACTIVE',
      'INACTIVE',
    ]);

    return user;
  });
}