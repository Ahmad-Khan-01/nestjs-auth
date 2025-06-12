import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from './roles.enum';
import { Roles } from '../auth/roles.decorator';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Student } from './entities/student.entity';
@Controller('student')
@ApiTags('Student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'User created Successfully',
    type: Student,
  })
  @ApiBadRequestResponse({
    description: 'User not created',
  })
  async create(@Body() createStudentDto: CreateStudentDto) {
    await this.studentService.create(createStudentDto);
    return { message: 'student registered successfully' };
  }
  @Get('admin-area')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiForbiddenResponse({
    description: 'only admin can access',
  })
  @ApiAcceptedResponse({
    description: 'Users Fetched Successfully',
  })
  async findAll() {
    const students = await this.studentService.findAll();
    return {
      success: true,
      students,
      message: 'Users fetched successfully',
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
