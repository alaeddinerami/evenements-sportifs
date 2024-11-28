import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { log } from 'console';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private jwtServece: JwtService,
  ) {}

  async signUp(signupData: SignupDto) {
    const { name, password, email } = signupData;

    const emailInUse = await this.UserModel.findOne({
      email,
    });

    if (emailInUse) {
      throw new BadRequestException('email already in use');
    }

    const hashPassword = await bcrypt.hash(password, 10); // more scuretry for the same password

    const newUser = await this.UserModel.create({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();
    const token = await this.generateUserTokens(newUser._id);
    // console.log(token);

    return {
      message: 'User created successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    };

  }
  async login(loginData: LoginDto) {
    const { email, password } = loginData;
    const user = await this.UserModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('wrong loginData');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('wrong loginData');
    }
    const token = await this.generateUserTokens(user._id)
    return {token};
  }

  async generateUserTokens(userId) {
    const accessToken = this.jwtServece.sign({ userId }, { expiresIn: '14h' });
    
    return  accessToken ;
  }

}
