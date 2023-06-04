import {Education, MaritalStatus} from '../constants';
import {ApiModelProperty} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

/**
 * @description This is a type definition for a loan. User specific properties are included in User type.
 */
export class LoanDto {
    @ApiModelProperty({
        description: 'The loan id',
        required: true,
        type: 'string',
    })
    readonly id: string;

    @ApiModelProperty({
        description: 'The date when the loan was taken',
        required: true,
        type: 'date',
    })
    readonly date: Date;

    @ApiModelProperty({
        description: 'Specifies if the loan is defaulted',
        required: true,
        type: 'boolean',
    })
    readonly isDefault: boolean;
}

export class GetLoansDistributionDto {
    @ApiModelProperty({
        description: 'The number of defaulted loans',
        required: true,
        type: 'number',
    })
    readonly defaultedLoansCount: number;

    @ApiModelProperty({
        description: 'The number of good loans',
        required: true,
        type: 'number',
    })
    readonly goodLoansCount: number;

    @ApiModelProperty({
        description:
            'Specifies the distribution percentage of defaulted loans vs good loans',
        required: true,
        type: 'number',
    })
    allLoansCount: number;
}

/**
 * @description This is a type definition for a user
 */
export class UserDto {
    @ApiModelProperty({
        description: 'The user age',
        required: true,
        type: 'number',
    })
    readonly age: number;

    @ApiModelProperty({
        description:
            'The user marital status. Possible values: married, single, divorced, widowed',
        required: true,
        type: 'enum',
    })
    readonly maritalStatus: MaritalStatus;

    @ApiModelProperty({
        description: 'The user job',
        required: true,
        type: 'string',
    })
    readonly job: string;

    @ApiModelProperty({
        description:
            'The user education. Possible values: primary, secondary, tertiary, unknown',
        required: true,
        type: 'enum',
    })
    readonly education: Education;
}

export class BalanceDto {
    balance: number;
}

export class BalanceWithCurrencyDto {
    balance: number;

    currency: string;
}

export type LoanWithUserDto = LoanDto & UserDto;
export type GetLoanByIdDto = LoanWithUserDto;
export type GetLoansWithBalanceDto = LoanWithUserDto & BalanceDto;
export type GetLoansWithBalanceAndCurrencyRateDto = LoanWithUserDto &
    BalanceWithCurrencyDto;

export class LoansDto {
    @ApiModelProperty({
        description: 'The loans array',
        required: true,
        type: 'array',
    })
    readonly loans: LoanWithUserDto[] | GetLoanByIdDto[] | GetLoansWithBalanceDto[] | GetLoansWithBalanceAndCurrencyRateDto[];
}

