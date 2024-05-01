export interface RepositoryUser {
  uuid: string;
  name: string;
  email: string;
  password: string;
}

const users: RepositoryUser[] = [
  {
    uuid: 'a31025f2-4f57-4e20-b6ec-a623eb3c288e',
    name: 'Demo user',
    email: 'demo@localhost.dev',
    password: 'P4ssw0rd!',
  },
];

export function addUser(user: RepositoryUser): void {
  users.push(user);
  console.log('Users after addUser:');
  console.log(users);
}

export function findUsers(): RepositoryUser[] {
  console.log('Users when findUsers:');
  console.log(users);
  return users;
}

export function findUserByEmail(email: string): RepositoryUser | undefined {
  console.log('Users when findUserByEmail:');
  console.log(users);
  return users.find(u => u.email === email);
}

export function findUserByUuid(uuid: string): RepositoryUser | undefined {
  console.log('Users when findUserByUuid:');
  console.log(users);
  return users.find(u => u.uuid === uuid);
}
