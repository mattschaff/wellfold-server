import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  HasExternalUuid,
  HasInternalCreatedUpdated,
} from '../types/common.types';
import { Member } from './member.entity';

export enum IntegrationStatus {
  COMPLETE = `completed`,
  INCOMPLETE = `incomplete`,
  NOT_QUALIFIED = `not_qualified`,
}

@Entity(`cards`)
export class Card implements HasExternalUuid, HasInternalCreatedUpdated {
  @PrimaryGeneratedColumn({
    type: `bigint`,
  })
  id: string;

  @Index()
  @ManyToOne(() => Member, (member) => member.cards, {
    nullable: true,
  })
  @JoinColumn({
    name: `wellfold_user_numeric_id`,
    referencedColumnName: `numericId`,
  })
  member?: Member;

  @PrimaryColumn({
    type: `text`,
    name: `external_uuid`,
  })
  externalUuid: string;

  /* -----------------------------
   * Card metadata
   * ----------------------------- */

  @Column({
    type: `timestamptz`,
    name: `created`,
  })
  created: Date;

  @Column({
    type: `varchar`,
    length: 4,
    name: `last_4_digits`,
  })
  last4Digits: string;

  @Column({
    type: `varchar`,
    length: 20,
    name: `scheme`,
  })
  scheme: string;

  @Column({
    type: `varchar`,
    length: 2,
    name: `expiry_month`,
  })
  expiryMonth: string;

  @Column({
    type: `varchar`,
    length: 4,
    name: `expiry_year`,
  })
  expiryYear: string;

  @Column({
    type: `boolean`,
    default: true,
    name: `active`,
  })
  active: boolean;

  /* -----------------------------
   * Ownership
   * ----------------------------- */

  @Index()
  @Column({
    type: `text`,
    name: `member_id`,
  })
  memberId: string;

  @Column({
    type: `varchar`,
    length: 100,
    nullable: true,
    name: `nickname`,
  })
  nickname: string | null;

  /* -----------------------------
   * Integration state
   * ----------------------------- */

  @Column({
    type: `enum`,
    enum: IntegrationStatus,
    default: IntegrationStatus.COMPLETE,
    name: `integration_status`,
  })
  integrationStatus: IntegrationStatus;

  /* -----------------------------
   * Internal bookkeeping
   * ----------------------------- */

  @CreateDateColumn({
    type: `timestamptz`,
    name: `created_internally`,
  })
  createdInternally: Date;

  @UpdateDateColumn({
    type: `timestamptz`,
    name: `updated_internally`,
  })
  updatedInternally: Date;
}
