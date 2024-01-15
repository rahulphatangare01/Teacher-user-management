import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto, RegistrationDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly registrationService: UserService) {}

  @Post('register')
  async register(@Body() registrationDto: RegistrationDto): Promise<void> {
    const userDetails =
      await this.registrationService.registerUser(registrationDto);
    return userDetails;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{
    email: string;
    firstName: string;
    lastName: string;
    phone_no: string;
    role: string;
  }> {
    const userDetails = await this.registrationService.loginUser(loginDto);
    return userDetails;
  }
}
