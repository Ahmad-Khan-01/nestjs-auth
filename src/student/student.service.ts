import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const { name, email, password } = createStudentDto;
    const existingUser = await this.studentRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException({ message: 'User Already Exists' });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newStudent = this.studentRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    return await this.studentRepository.save(newStudent);
  }
  async findByEmail(email: string): Promise<Student | undefined> {
    const user = await this.studentRepository.findOne({ where: { email } });
    return user ?? undefined; // Convert null to undefined
  }

  async findAll() {
    const students = await this.studentRepository.find();
    return students;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
