// reward.embedded.ts
import { Column } from 'typeorm';

export class Reward {
  @Column({
    type: `uuid`,
    nullable: true,
    name: `loyalty_program_id`,
  })
  loyaltyProgramId: string | null;

  @Column({
    type: `uuid`,
    nullable: true,
    name: `offer_id`,
  })
  offerId: string | null;

  @Column({
    type: `numeric`,
    precision: 18,
    scale: 2,
    nullable: true,
    name: `cumulative_purchase_count`,
  })
  cumulativePurchaseCount: string | null;

  @Column({
    type: `numeric`,
    precision: 18,
    scale: 2,
    nullable: true,
    name: `cumulative_purchase_amount`,
  })
  cumulativePurchaseAmount: string | null;

  @Column({
    type: `numeric`,
    precision: 18,
    scale: 2,
    nullable: true,
    name: `reward_amount`,
  })
  rewardAmount: string | null;

  @Column({
    type: `varchar`,
    nullable: true,
    name: `status`,
  })
  status: string | null;

  @Column({
    type: `varchar`,
    nullable: true,
    name: `rejection_reason`,
  })
  rejectionReason: string | null;

  @Column({
    type: `numeric`,
    precision: 18,
    scale: 2,
    nullable: true,
    name: `distributed_to_member_amount`,
  })
  distributedToMemberAmount: string | null;

  @Column({
    type: `numeric`,
    precision: 18,
    scale: 2,
    nullable: true,
    name: `owed_to_member_amount`,
  })
  owedToMemberAmount: string | null;

  @Column({
    type: `timestamptz`,
    nullable: true,
    name: `confirmed_date`,
  })
  confirmedDate: Date | null;

  @Column({
    type: `timestamptz`,
    nullable: true,
    name: `confirmed_by_merchant_date`,
  })
  confirmedByMerchantDate: Date | null;

  @Column({
    type: `timestamptz`,
    nullable: true,
    name: `distributed_to_member_distributor_date`,
  })
  distributedToMemberDistributorDate: Date | null;
}
