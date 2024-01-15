// import { Injectable } from '@nestjs/common';
import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto, RegistrationDto } from './dto/user.dto';
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

  async findUserByIdentifier(identifier: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: [{ email: identifier }, { phone_no: identifier }],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // async loginUser(loginDto: LoginDto): Promise<any> {
  //   const { identifier, password } = loginDto;

  //   const user = await this.findUserByIdentifier(identifier);
  //   // const user = await this.userRepository.findOne({
  //   //   where: [{ email: identifier }, { phone_no: identifier }],
  //   // });

  //   if (!user) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }

  //   const isPasswordValid = await bcrypt.compare(password, user.password);

  //   if (!isPasswordValid) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }
  //   const { password: _, ...userDetails } = user;
  //   return userDetails;
  // }

  async loginUser(loginDto: LoginDto): Promise<{ email: string; firstName: string; lastName: string; phone_no: string; role: string }> {
    const { identifier, password } = loginDto;

    // Find the user by email or phone number
    const user = await this.userRepository.findOne({
      where: [{ email: identifier }, { phone_no: identifier }],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if the provided password matches the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Return the user details without the password
    const { password: _, ...userDetails } = user;
    return userDetails;
  }
}
