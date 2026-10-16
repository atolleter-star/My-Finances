export interface FinancialAccount {
	id: string;
	institutionName: string;
	accountName: string;
	currentBalance: number;
	accountType: 'cash' | 'investment' | 'credit';
	creditLimit?: number;
	paymentDueDate?: string;
}
