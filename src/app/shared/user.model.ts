import { Car } from './car.model';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthday: Date;
  login: string;
  password: string;
  phone: string;
  createdAt: Date;
  lastLogin: Date;
  token?: string;
  cars: Array<Car>;
}
