import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User | void> {
    return this.usersRepository.save(createUserDto).catch((err) => {
      if (err.message.includes('duplicate key value')) {
        throw new ConflictException('User with this email already exists');
      }
      throw err;
    });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number | string): Promise<User> {
    return this.usersRepository.findOneOrFail(
      typeof id === 'string' ? { email: id } : { id },
    );
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersRepository
      .update({ id }, updateUserDto)
      .then((result) => result.raw);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete({ id });
  }
}
