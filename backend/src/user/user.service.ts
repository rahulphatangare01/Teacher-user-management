// import { Injectable } from '@nestjs/common';
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistrationDto } from './dto/user.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async registerUser(registrationDto: RegistrationDto): Promise<any> {
    const { email, password } = registrationDto;

    const existingUser = await this.userRepository.findOne({
      where: { email: email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      ...registrationDto,
      password: hashPassword,
    });

    await this.userRepository.save(newUser);
    
    const { password: _, ...userDetails } = newUser;
    return userDetails;
  }
}
