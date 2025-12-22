import { UtilityService } from '@/common/providers/utility.service';
// [x] Loop through members
// [x] Get transactions by member
// [x] Sum them all, for iniital #
// Save that in a prop on the user

import { Member, Program, Promotion, Transaction } from '@/common/entities';
import { DatabaseService } from '@/common/providers/database.service';
import { Injectable } from '@nestjs/common';

// Later -- further process GMV
// -- adjust by program
// -- adjust by redemption

// Unlikely to be > 1 million programs
const PROGRAM_PROMOTION_LIMIT = 1000000;

@Injectable()
export class MetricsService {
  constructor(
    protected database: DatabaseService,
    protected utility: UtilityService,
  ) {}
  protected programs: Program[];
  protected promotions: Promotion[];

  constructMemberMetricEntities(
    member: Member,
    totalGmvValue: number,
    qualifiedGmvValue: number,
    rewardsValue: number,
  ) {
    const metrics = [
      { type: `total_gmv`, value: totalGmvValue },
      { type: `qualified_gmv`, value: qualifiedGmvValue },
      { type: `rewards`, value: rewardsValue },
    ];

    return metrics.map(({ type, value }) => ({
      member,
      type,
      value,
      uniqueMemberMetricId: `${member.wellfoldId}__${type}`,
    }));
  }

  async calculateGmvAndRewards(member: Member) {
    const transactions = await this.getTransactions(member);
    return {
      totalGmv: await this.getTotalGmv(transactions),
      qualifiedGmv: await this.getQualifiedGmv(member, transactions),
      rewards: await this.getRewards(member, transactions),
    };
  }

  async getTransactions(member: Member) {
    const transactionsOlive = await this.database.getByProperty(
      Transaction,
      `oliveMemberId`,
      member.externalUuid,
    );
    const transactionsLoyalize = await this.database.getByProperty(
      Transaction,
      `loyalizeShopperId`,
      member.wellfoldId,
    );
    return [...transactionsOlive, ...transactionsLoyalize];
  }

  async getQualifiedGmv(member: Member, transactions: Transaction[]) {
    if (!this.programs) {
      this.programs = await this.database.getMany(
        Program,
        PROGRAM_PROMOTION_LIMIT,
        0,
        {},
        true,
      );
    }
    if (!this.promotions) {
      this.promotions = await this.database.getMany(
        Promotion,
        PROGRAM_PROMOTION_LIMIT,
        0,
        {},
        true,
      );
    }

    const memberMerchantCategoryCodeList =
      this.getMemberMerchantCategoryCodeList(member);

    return transactions.reduce((sum: number, transaction) => {
      if (
        memberMerchantCategoryCodeList.includes(
          transaction.merchantCategoryCode,
        )
      ) {
        return (
          sum +
            this.utility.convertRoundedAmountIntoAmount(
              Number(transaction.roundedAmount),
            ) || 0
        );
      }
      return sum;
    }, 0);
  }

  async getTotalGmv(transactions: Transaction[]) {
    return transactions.reduce((sum: number, transaction) => {
      if (transaction.isRedemption) return sum;
      return (
        sum +
        (this.utility.convertRoundedAmountIntoAmount(
          Number(transaction.roundedAmount),
        ) || 0)
      );
    }, 0);
  }

  getRewards(member: Member, transactions: Transaction[]): number {
    const mccSet = new Set(this.getMemberMerchantCategoryCodeList(member));

    const MONTHLY_LIMIT = 10;
    const RATE = 0.02;

    const monthlyTotals: Record<string, number> = {};

    for (const tx of transactions) {
      if (tx.isRedemption) continue;
      if (!mccSet.has(tx.merchantCategoryCode)) continue;

      const d = tx.created;
      const month = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(
        2,
        `0`,
      )}`;

      const reward =
        this.utility.convertRoundedAmountIntoAmount(Number(tx.roundedAmount)) *
        RATE;

      const current = monthlyTotals[month] ?? 0;
      monthlyTotals[month] = Math.min(MONTHLY_LIMIT, current + reward);
    }

    return Object.values(monthlyTotals).reduce((sum, value) => sum + value, 0);
  }

  getMemberMerchantCategoryCodeList(member: Member) {
    // Get promotions associated w/ user's program
    const memberPromotions = this.promotions.filter(
      (promotion) => promotion.programId === member.programId,
    );

    return memberPromotions.reduce((list: number[], promotion) => {
      const promotionMccCodes = promotion.mccCodes ?? [];
      promotionMccCodes.forEach((code: number) => {
        if (!list.includes(code)) {
          list.push(code);
        }
      });
      return list;
    }, []);
  }
}
