import * as jwt from 'jsonwebtoken';

type TokenPayload = {
  id: number,
  email: string,
};

export default class JwtScret {
  private static secret = process.env.JWT_SECRET || 'jwt_secret';

  static sign(payload: TokenPayload): string {
    const token = jwt.sign(payload, this.secret);
    return token;
  }

  static verify(token: string): jwt.JwtPayload | string {
    return jwt.verify(token, this.secret);
  }
}
