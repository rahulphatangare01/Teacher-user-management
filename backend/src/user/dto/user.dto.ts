export class RegistrationDto {
  firstName: string;
  lastName: string;
  phone_no: string;
  email: string;
  role: string;
  password: string;
}

export class LoginDto {
  identifier: string;
  password: string;
}
