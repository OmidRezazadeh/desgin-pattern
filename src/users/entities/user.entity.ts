import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { getUserState } from '../user-states/user-state.factory.js';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: 'ACTIVE',
  })
  status: 'ACTIVE' | 'INACTIVE';

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  activate(): void {
    getUserState(this.status).activate(this);
  }

  deactivate(): void {
    getUserState(this.status).deactivate(this);
  }
}
