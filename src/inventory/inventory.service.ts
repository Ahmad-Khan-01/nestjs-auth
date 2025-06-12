import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
  ) {}

  async create(createInventoryDto: CreateInventoryDto) {
    const { name } = createInventoryDto;

    const existingProduct = await this.inventoryRepository.findOne({
      where: { name },
    });

    if (existingProduct) {
      throw new BadRequestException({
        message: 'Product already exists in the inventory',
      });
    }

    const newProduct = this.inventoryRepository.create(createInventoryDto);
    return await this.inventoryRepository.save(newProduct);
  }

  async findAll() {
    return await this.inventoryRepository.find();
  }

  async findOne(id: number) {
    const product = await this.inventoryRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(id: number, updateInventoryDto: UpdateInventoryDto) {
    const product = await this.inventoryRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const updatedProduct = Object.assign(product, updateInventoryDto);
    return await this.inventoryRepository.save(updatedProduct);
  }

  async remove(id: number) {
    const product = await this.inventoryRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    await this.inventoryRepository.delete(id);
    return { message: `Product with ID ${id} has been removed` };
  }
}
