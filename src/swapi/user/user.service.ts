import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private _usersRepository: Repository<Users>,
  ) {}

  async getAllUsers(page, limit) {
    return paginate<Users>(this._usersRepository, { page, limit }).then(
      (paginated) => ({
        ...paginated,
        items: paginated.items.map(({ id, username, roles }) => ({
          id,
          username,
          roles,
        })),
      }),
    );
  }

  async createUser(username: string, password: string): Promise<Users> {
    const user = { username, password };
    return await this._usersRepository.save(user).catch((err) => {
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
    const user = await this._usersRepository.findOneBy({ username });
    if (!user) {
      if (throwError) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      } else {
        return null;
      }
    }
    return user;
  }

  async findOneById(id: number): Promise<Users | undefined> {
    const user = await this._usersRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('Person not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async addRoleAdmin(user: Users): Promise<Users> {
    return this._usersRepository.save(user);
  }

  async updateOne(
    id: number,
    props: Partial<CreateUserDto & { refreshToken: string }>,
  ) {
    const password = props.password
      ? await this.hashData(props.password)
      : undefined;
    await this._usersRepository.save({
      ...props,
      id,
      password,
    });
    return { id };
  }

  async remove(id: number) {
    return this._usersRepository.delete({ id });
  }

  async hashData(data: string) {
    return hash(data, await genSalt());
  }
}
