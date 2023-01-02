import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { Users } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async createUser(username: string, password: string): Promise<Users> {
    const user = { username, password };
    return await this.usersRepository.save(user).catch((err) => {
      throw new HttpException(
        {
          message: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  async findOneByUsername(
    username: string,
    throwError = true,
  ): Promise<Users | undefined> {
    const user = await this.usersRepository.findOneBy({ username });
    if (!user) {
      if (throwError) {
        throw new HttpException('Person not found', HttpStatus.NOT_FOUND);
      } else {
        return null;
      }
    }
    return user;
  }

  async findOneById(id: number): Promise<Users | undefined> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('Person not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async addRoleAdmin(user: Users): Promise<Users> {
    return this.usersRepository.save(user);
  }

  async updateOne(id: number, props: Partial<UserDto>) {
    return this.usersRepository.save({
      id,
      ...props,
    });
  }

  async remove(id: number) {
    return this.usersRepository.delete({ id });
  }
}
