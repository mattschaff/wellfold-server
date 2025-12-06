// reward.embedded.ts
import { Column } from 'typeorm';

export class Reward {
  @Column({ type: `uuid`, nullable: true })
  loyaltyProgramId: string | null;

  @Column({ type: `uuid`, nullable: true })
  offerId: string | null;

  @Column({ type: `numeric`, precision: 18, scale: 2, nullable: true })
  cumulativePurchaseCount: string | null;

  @Column({ type: `numeric`, precision: 18, scale: 2, nullable: true })
  cumulativePurchaseAmount: string | null;

  @Column({ type: `numeric`, precision: 18, scale: 2, nullable: true })
  amount: string | null;

  @Column({ type: `varchar`, nullable: true })
  status: string | null;

  @Column({ type: `varchar`, nullable: true })
  rejectionReason: string | null;

  @Column({ type: `numeric`, precision: 18, scale: 2, nullable: true })
  distributedToMemberAmount: string | null;

  @Column({ type: `numeric`, precision: 18, scale: 2, nullable: true })
  owedToMemberAmount: string | null;

  @Column({ type: `timestamptz`, nullable: true })
  confirmedDate: Date | null;

  @Column({ type: `timestamptz`, nullable: true })
  confirmedByMerchantDate: Date | null;

  @Column({ type: `timestamptz`, nullable: true })
  distributedToMemberDistributorDate: Date | null;
}
