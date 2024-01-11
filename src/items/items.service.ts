import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemInput, UpdateItemInput } from './dto/inputs';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemsService {

  constructor(@InjectRepository(Item) private readonly itemsRepository: Repository<Item>) { }

  async create(createItemInput: CreateItemInput): Promise<Item> {
    const newItem = this.itemsRepository.create(createItemInput); // Acá se está creando, pero todavía no se impactó en la BD!
    return await this.itemsRepository.save(newItem); // Acá sí se guarda en BD. Esto se hace en 2 pasos pq antes podemos actualizar info del "newItem"
  }

  async findAll(): Promise<Item[]> {
    return await this.itemsRepository.find();
  }

  async findOne(id: string): Promise<Item> {
    const item = await this.itemsRepository.findOneBy({ id });
    if (!item) throw new NotFoundException(`Item with ID: ${id} not found!`);
    return item;
  }

  async update(id: string, updateItemInput: UpdateItemInput): Promise<Item> {
    const item = await this.itemsRepository.preload(updateItemInput); // ! Uso del "preload"
    if (!item) throw new NotFoundException(`Item with ID: ${id} not found!`);
    return this.itemsRepository.save(item);
  }

  async remove(id: string): Promise<Item> {
    // TODO: Soft delete y verificar integridad referencial
    const item = await this.findOne(id);
    await this.itemsRepository.remove(item);
    return { ...item, id };
  }

}
