export type FinancialAccountType = 'checking' | 'investment' | 'credit';

export interface FinancialAccount {
  accountId: string;
  institutionName: string;
  accountName: string;
  accountType: FinancialAccountType;
  currentBalance: number;
  creditLimit?: number;
  availableCredit?: number;
  paymentDueDate?: string;
  minimumPaymentDue?: number;
}