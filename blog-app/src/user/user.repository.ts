import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as crypto from 'crypto-js';
import { UserInput } from './types/user.input';
import { BadRequestException } from '@nestjs/common';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async signup(userInput: UserInput) {
    try {
      // create a row for User table
      const user = new UserEntity();
      user.username = userInput.username;

      // encrypt the password
      user.password = `${crypto.MD5(userInput.password)}`;

      // commit the row
      await user.save();

      // return the current user
      return user;
    } catch {
      return new BadRequestException();
    }
  }

  async signin(userInput: UserInput) {
    const { username, password } = userInput;

    // find the user by user name
    const user = await this.findOne({ username });

    if (!user) {
      return null;
    }

    // check if user exist
    if (!user.validatePassword(password)) {
      return null;
    }

    return user;
  }
}
