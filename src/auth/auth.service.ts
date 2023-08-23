import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(loginUserInput: LoginUserInput) {
    const user = await this.usersService.findOne(loginUserInput.username);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return {
      access_token: 'jwt',
      user: result,
    };
  }
}
