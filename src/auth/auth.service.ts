import { Injectable } from '@nestjs/common';
import { RegisterInput } from './dto/register-input';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // creates new user
  async createUser(registerInput: RegisterInput) {

    // Check if user already exists
    const existingUser = await this.prisma.user.count({
      where: {
        email: registerInput.email,
      },
    });

    if (existingUser > 0) {
      throw new Error('User with this email already exists');
    }
    // generate hashed password
    const hashedPassword = await argon.hash(registerInput.password);
    const user = await this.prisma.user.create({
      data: {
        email: registerInput.email,
        hashedPassword: hashedPassword,
      },
    });

    const { accessToken } = await this.createToken(user.id, user.email);

    return {
      accessToken,
      user,
    };
  }

  // creates JWT token
  async createToken(userId: number, email: string) {
    // generate an access token with email, useriD and a secret
    const accessToken = this.jwtService.sign(
      {
        userId,
        email,
      },
      {
        expiresIn: '2 days',
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      },
    );

    return {
      accessToken,
    };
  }

 

 
}
