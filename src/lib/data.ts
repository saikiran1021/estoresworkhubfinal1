import type { User, Role } from './definitions';

// This is a mock in-memory database.
// In a real application, you would use a database like PostgreSQL, MySQL, etc.

let users: User[] = [
  { id: '1', name: 'Admin', surname: 'User', phone: '1234567890', email: 'admin@estores.com', password: 'admin123', role: 'Admin', last_login: null },
  { id: '2', name: 'Employee', surname: 'User', phone: '0987654321', email: 'employee@estores.com', password: 'password123', role: 'Employee', last_login: null },
  { id: '3', name: 'College', surname: 'Rep', phone: '1112223333', email: 'college@estores.com', password: 'password123', role: 'College', last_login: null },
  { id: '4', name: 'Industry', surname: 'Partner', phone: '4445556666', email: 'industry@estores.com', password: 'password123', role: 'Industry', last_login: null },
  { id: '5', name: 'Jane', surname: 'Smith', phone: '5555555555', email: 'jane.smith@example.com', password: 'password123', role: 'Employee', last_login: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
  { id: '6', name: 'John', surname: 'Doe', phone: '1231231234', email: 'john.doe@example.com', password: 'password123', role: 'Employee', last_login: new Date(Date.now() - 1000 * 60 * 45).toISOString() },
];

export const findUserByEmailAndRole = async (email: string, role: Role): Promise<User | undefined> => {
  return users.find(user => user.email === email && user.role === role);
};

export const findUserById = async (userId: string): Promise<User | undefined> => {
    return users.find(user => user.id === userId);
}

export const addUser = async (user: Omit<User, 'id' | 'last_login'>): Promise<User> => {
  const newUser: User = {
    ...user,
    id: (users.length + 1).toString(),
    last_login: null,
  };
  users.push(newUser);
  return newUser;
};

export const updateUserLoginTimestamp = async (userId: string): Promise<User | undefined> => {
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex > -1) {
        users[userIndex].last_login = new Date().toISOString();
        return users[userIndex];
    }
    return undefined;
};

export const getAllUsers = async (): Promise<User[]> => {
    return [...users];
}

export const deleteUserById = async(userId: string): Promise<boolean> => {
    const initialLength = users.length;
    users = users.filter(user => user.id !== userId);
    return users.length < initialLength;
}

export const validAdminEmails = [
    'admin@estores.com',
    'admin1@estores.com',
    'admin2@estores.com',
    'admin3@estores.com',
    'admin4@estores.com',
];
