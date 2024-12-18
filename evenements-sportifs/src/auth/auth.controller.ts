import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { log } from 'console';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupData: SignupDto) {
    try {
      return this.authService.signUp(signupData);
    } catch (error) {
      throw new BadRequestException('Failed to Signup');
    }
  }

  @Post('login')
  async login(@Body() loginData: LoginDto) {
    try {
      return this.authService.login(loginData);
    } catch (error) {
      throw new BadRequestException('Failed to Signup');
    }
  }
}
