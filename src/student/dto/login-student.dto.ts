import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginStudentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'email of student',
    example: 'johndoe@gmail.com',
  })
  email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'password of student',
    example: '8787',
  })
  password: string;
}
