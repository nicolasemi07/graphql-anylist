import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  fullName: string;

  @Column({ unique: true }) // !Esto crea un índice en la columna y hace que las búsquedas sean más veloces
  @Field(() => String)
  email: string;

  @Column()
  // @Field(() => String) // !Como nunca voy a querer hacer una búsqueda ni mostrarlo, esto no se pone (para mantener oculta la columna)
  password: string;

  @Column({
    type: 'text',
    array: true,
    default: ['user']
  })
  @Field(() => [String])
  roles: string[];

  @Column({
    type: 'boolean',
    default: true
  })
  @Field(() => Boolean)
  isActive: boolean;

}
