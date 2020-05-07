import { Entity, PrimaryGeneratedColumn, PrimaryColumn, JoinColumn, OneToOne, Column } from 'typeorm';
import { Car } from './Car';
import { Min, Max } from 'class-validator';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn()
  userID: number;

  @OneToOne(() => Car, car => car.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  carId: string;

  @Column({ default: 0, nullable: false })
  numberOfTrips: number;

  @Column({ nullable: true })
  @Min(0.0)
  @Max(5.0)
  mark: number;
}
