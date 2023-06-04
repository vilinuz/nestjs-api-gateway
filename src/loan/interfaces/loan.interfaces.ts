import {Education, MaritalStatus} from '../constants';

export interface Loan {
    id: string;
    date: Date;
    isDefault: boolean;
    job: string;
    age: number;
    maritalStatus: MaritalStatus;
    education: Education;
    balance?: number;
    currency?: string;
}

export interface Loans {
    loans: Loan[];
}

export interface LoanById {
    id: string;
}

export interface DefaultedLoanByYear {
    year: number;
    currency?: string;
}

export interface LoanDistributionByDateRange {
    startDate: Date;
    endDate: Date;
}

export interface LoansDistribution {
    defaultedLoansCount: number;
    goodLoansCount: number;
    allLoansCount: number;
}

export interface CustomFilter {
    filterType: string;
    value: string;
}

export interface LoanService {
    findLoanById(id: LoanById): Promise<Loan>;

    findLoansWithCustomFilter(filter: CustomFilter): Promise<Loans>;

    findLoansDistributionByDateRange(filter: LoanDistributionByDateRange): Promise<LoansDistribution>;

    findLoansByYear(filter: DefaultedLoanByYear): Promise<Loans>;
}
