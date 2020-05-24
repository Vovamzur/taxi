import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Driver } from './Driver';

@Entity()
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  brand: string;

  @Column()
  number: string;

  @Column()
  color: string;

  @Column({ type: 'date', nullable: true })
  year: number;

  @OneToOne(type => Driver, driver => driver.id)
  driverID: string;
}
