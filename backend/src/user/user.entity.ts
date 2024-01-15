import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('users')
@Unique(['email'])
@Unique(['phone_no'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: any;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  phone_no: string;

  @Column({ unique: true })
  email: string;

  @Column()
  role: string;

  @Column()
  password: string;
}
