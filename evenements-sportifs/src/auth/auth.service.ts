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
import { RefreshToken } from './entities/refresh-token.entity';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(RefreshToken.name)
    private RefreshTokenModel: Model<RefreshToken>,
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
    console.log(newUser);
    await newUser.save();

    return {
      message: 'User created successfully',
      user: newUser,
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
    return this.generateUserTokens(user._id);
  }

  async generateUserTokens(userId) {
    const accessToken = this.jwtServece.sign({ userId }, { expiresIn: '1h' });
    const refreshToken = uuidv4();
    await this.storeRefreshToken(refreshToken,userId)
    return { accessToken, refreshToken };
  }
  async storeRefreshToken(token: string, userId) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);
    await this.RefreshTokenModel.create({ token, userId, expiryDate });
  }
}
