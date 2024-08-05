import * as bcrypt from 'bcryptjs';
import { HttpStatus } from '../utils/mapStatusHTTP';
import UserModel from '../database/models/users.model';
import JwtScret from '../utils/jwt';

type Login = {
  status: HttpStatus,
  data: object,
};

type User = {
  status: HttpStatus,
  data: UserModel | null,
};

export default class UserService {
  static async login(email: string, password: string): Promise<Login> {
    const data = await UserModel.findOne({ where: { email } });

    if (!data || !bcrypt.compareSync(password, data?.dataValues.password)) {
      return { status: 'unauthorized', data: { message: 'Invalid email or password' } };
    }
    const payload = {
      id: data.dataValues.id,
      email: data.dataValues.email,
    };

    const token = JwtScret.sign(payload);

    return { status: 'successful', data: { token } };
  }

  static async user(email: string): Promise<User> {
    const data = await UserModel.findOne({ where: { email } });

    return { status: 'successful', data };
  }
}
