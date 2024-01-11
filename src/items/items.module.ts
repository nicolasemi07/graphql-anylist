import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';

@Module({
  providers: [ItemsResolver, ItemsService],
  imports: [
    // Acá declaramos todas las entidades que van a estar en la BD
    TypeOrmModule.forFeature([
      Item,
    ])
  ]
})
export class ItemsModule { }
