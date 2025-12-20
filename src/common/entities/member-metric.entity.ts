import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member } from './member.entity';

@Entity(`member_metrics`)
export class MemberMetric {
  @PrimaryGeneratedColumn({ type: `bigint`, name: `id` })
  numericId: string;

  @Index()
  @ManyToOne(() => Member, (member) => member.metrics, {
    nullable: true,
  })
  @JoinColumn({
    name: `wellfold_user_id`,
    referencedColumnName: `wellfoldId`,
  })
  member?: Member;

  @Index()
  @Column({ type: `text`, nullable: true })
  type: string;

  @Column({
    type: `numeric`,
    precision: 10,
    scale: 2,
    nullable: true,
  })
  value?: string;
}
