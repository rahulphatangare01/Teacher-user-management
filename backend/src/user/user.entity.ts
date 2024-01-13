import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: any;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone_no: string;

  @Column()
  email: string;

  @Column()
  role: string;

  @Column()
  password: string;
}
