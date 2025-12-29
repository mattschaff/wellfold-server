// transaction.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  HasExternalUuid,
  HasInternalCreatedUpdated,
  ThirdPartyOrigin,
} from '../types/common.types';
import { Member } from './member.entity';
import { Reward } from './reward.entity';

@Entity(`transactions`)
@Index([`externalUuid`, `thirdPartyOrigin`], { unique: true })
export class Transaction implements HasExternalUuid, HasInternalCreatedUpdated {
  @PrimaryGeneratedColumn({ type: `bigint`, name: `id` })
  id: string;

  /* -----------------------------
   * Relations
   * ----------------------------- */

  @Index()
  @ManyToOne(() => Member, (member) => member.transactions, {
    nullable: true,
  })
  @JoinColumn({
    name: `wellfold_user_numeric_id`,
    referencedColumnName: `numericId`,
  })
  member?: Member;
  /* -----------------------------
   * External identity
   * ----------------------------- */

  @Index()
  @Column({ type: `varchar`, length: 64, name: `external_uuid` })
  externalUuid: string;

  @Index()
  @Column({ type: `varchar`, name: `third_party_origin` })
  thirdPartyOrigin: ThirdPartyOrigin;

  /* -----------------------------
   * Shared / normalized identity
   * ----------------------------- */

  @Index()
  @Column({ type: `text`, nullable: true, name: `olive_member_id` })
  oliveMemberId?: string;

  @Index()
  @Column({ type: `text`, nullable: true, name: `loyalize_shopper_id` })
  loyalizeShopperId: string | null;

  @Index()
  @Column({ type: `varchar`, nullable: true, name: `store_id` })
  storeId: string | null;

  @Column({ type: `varchar`, nullable: true, name: `store_name` })
  storeName: string | null;

  @Index()
  @Column({ type: `uuid`, nullable: true, name: `card_id` })
  cardId: string | null;

  @Index()
  @Column({ type: `uuid`, nullable: true, name: `brand_id` })
  brandId: string | null;

  /* -----------------------------
   * Amounts (normalized)
   * ----------------------------- */

  @Column({ type: `varchar`, length: 3, nullable: true, name: `currency_code` })
  currencyCode: string | null;

  @Column({
    type: `numeric`,
    precision: 18,
    scale: 2,
    nullable: true,
    name: `amount`,
  })
  amount: string | null;

  @Column({
    type: `numeric`,
    precision: 18,
    scale: 2,
    nullable: true,
    name: `reward_amount`,
  })
  rewardAmount: string | null;

  @Column({
    type: `numeric`,
    precision: 18,
    scale: 2,
    nullable: true,
    name: `wellfold_calculated_reward`,
  })
  wellfoldCalculatedReward: string | null;

  @Column({
    type: `numeric`,
    precision: 18,
    scale: 2,
    nullable: true,
    name: `rounded_amount`,
  })
  roundedAmount: string | null;

  @Column({
    type: `numeric`,
    precision: 18,
    scale: 2,
    nullable: true,
    name: `matching_amount`,
  })
  matchingAmount: string | null;

  /* -----------------------------
   * Dates
   * ----------------------------- */

  @Column({ type: `timestamptz`, name: `created` })
  created: Date;

  @Column({ type: `timestamptz`, nullable: true, name: `pending_date` })
  pendingDate: Date | null;

  @Column({ type: `timestamptz`, nullable: true, name: `availability_date` })
  availabilityDate: Date | null;

  @Column({ type: `timestamptz`, nullable: true, name: `settlement_date` })
  settlementDate: Date | null;

  /* -----------------------------
   * Status / metadata
   * ----------------------------- */

  @Index()
  @Column({ type: `varchar`, nullable: true, name: `status` })
  status: string | null;

  @Column({ type: `boolean`, default: false, name: `settled` })
  settled: boolean;

  @Column({ type: `varchar`, nullable: true, name: `order_number` })
  orderNumber: string | null;

  @Column({ type: `varchar`, nullable: true, name: `tier` })
  tier: string | null;

  @Column({ type: `varchar`, nullable: true, name: `admin_comment` })
  adminComment: string | null;

  @Column({ type: `int`, nullable: true, name: `merchant_category_code` })
  merchantCategoryCode: number | null;

  @Column({
    type: `varchar`,
    length: 4,
    nullable: true,
    name: `card_last_4_digits`,
  })
  cardLast4Digits: string | null;

  /* -----------------------------
   * Embedded reward (Olive)
   * ----------------------------- */

  @Column(() => Reward, { prefix: `reward` })
  reward: Reward;

  @Column({ type: `boolean`, nullable: true, name: `is_redemption` })
  isRedemption: boolean;

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
