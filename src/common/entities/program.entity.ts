import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity(`programs`)
export class Program {
  @PrimaryGeneratedColumn({ type: `bigint`, name: `id` })
  id!: string;

  @CreateDateColumn({
    type: `timestamptz`,
    name: `created_at`,
  })
  createdAt!: Date;

  @Index({ unique: true })
  @Column({
    type: `text`,
    nullable: true,
    name: `program_id`,
  })
  programId?: string;

  @Column({ type: `text`, nullable: true, name: `name` })
  name?: string;

  @Column({ type: `text`, nullable: true, name: `logo` })
  logo?: string;

  @Column({ type: `text`, nullable: true, name: `email` })
  email?: string;

  @UpdateDateColumn({
    type: `timestamptz`,
    nullable: true,
    name: `updated_at`,
  })
  updatedAt?: Date;

  @Column({ type: `text`, nullable: true, name: `icon` })
  icon?: string;

  @Column({
    type: `text`,
    nullable: true,
    name: `api_key`,
  })
  apiKey?: string;

  @Column({ type: `text`, nullable: true, name: `loyalty_offers_id` })
  loyaltyOffersId?: string;

  @Column({ type: `text`, nullable: true, name: `search_name` })
  searchName?: string;

  @Column({
    type: `text`,
    nullable: true,
    name: `onboarding_flow`,
  })
  onboardingFlow?: string;

  @Column({
    type: `numeric`,
    precision: 10,
    scale: 2,
    nullable: true,
    name: `redemption_minimum`,
  })
  redemptionMinimum?: string;
}
