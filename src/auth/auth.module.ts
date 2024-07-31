import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { User, UserSchema } from 'src/users/schema/user.schema';
import { jwtConstants } from 'src/strategy/constants';
import { UsersService } from 'src/users/users.service';
import { LocalStrategy } from 'src/strategy/local.strategy';
import { HashService } from 'src/users/hash.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '60d',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy, HashService],
})
export class AuthModule {}
