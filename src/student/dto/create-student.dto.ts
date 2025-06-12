import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, isString, IsString } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({
    description: 'name of student',
    example: 'john',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'email of student',
    example: 'johndoe@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'password of student',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
