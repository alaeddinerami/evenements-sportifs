import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async signUp(signupData: SignupDto) {
    const { name, password, email } = signupData;
    
    const emailInUse = await this.UserModel.findOne({
      email,
    });

    if (emailInUse){ 
      throw new BadRequestException('email already in use');
    }

    const hashPassword = await bcrypt.hash(password, 10); // more scuretry for the same password
    
    const newUser =await this.UserModel.create({
      name,
      email,
      password: hashPassword,
    });
    console.log(newUser);
    await newUser.save();

    return { 
      message: 'User created successfully', 
      user: newUser.toObject()
    };

  }
}
