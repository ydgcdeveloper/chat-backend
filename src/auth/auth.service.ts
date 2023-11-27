import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    const valid = await bcrypt.compare(pass, user?.password);
    if (!valid) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      username: user.username,
      firstName: user.firstName,
    };
    const { password, createdAt, updatedAt, joinedDate, ...result } = user;
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: result,
    };
  }

  async whoAmI(tokenBearer) {
    const decoded = JSON.parse(
      JSON.stringify(this.jwtService.decode(tokenBearer)) as string,
    );
    return await this.usersService.findById(decoded.sub);
  }
}
