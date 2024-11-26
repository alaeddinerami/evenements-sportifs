import { Schema } from "@nestjs/mongoose";
import { IsEmail, IsString } from "class-validator";

@Schema()
export class LoginDto{

    @IsEmail()
    email: string

    @IsString()
    password:string
}