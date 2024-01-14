import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { RegistrationDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly registrationService: UserService) {}

  @Post('register')
  async register(@Body() registrationDto: RegistrationDto): Promise<void> {
    const userDetails =
      await this.registrationService.registerUser(registrationDto);
    return userDetails;
  }
}
