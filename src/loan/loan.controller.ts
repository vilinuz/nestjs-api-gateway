import {Controller, Get, Inject, Logger, OnModuleInit, Param, Query} from '@nestjs/common';
import {ApiOperation} from "@nestjs/swagger";
import {LoanService} from "./interfaces/loan.interfaces";
import {ClientGrpc} from "@nestjs/microservices";
import {GetLoanByIdDto, GetLoansDistributionDto, LoansDto} from "./dto/loan.dto";
import {LoanServiceName} from "./constants";

@Controller([ 'api/v1', 'api' ])
export class LoanController implements OnModuleInit {
    private loanService: LoanService;

    constructor(@Inject(LoanServiceName) private readonly client: ClientGrpc) {
    }

    onModuleInit(): any {
        this.loanService = this.client.getService('LoanService');
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get Loan by Id',
        parameters: [
            {
                name: 'year',
                in: 'path',
            },
        ],
    })
    async getLoanById(@Param('id') id: string): Promise<GetLoanByIdDto> {
        return this.loanService.findLoanById({id: id});
    }

    @Get('loans/default')
    @ApiOperation({
        summary: 'Get the default loans by year',
        parameters: [
            {
                name: 'year',
                in: 'query',
            },
        ],
    })
    async getDefaultedLoansByYear(
        @Query('year') year: number,
    ): Promise<LoansDto> {
        return this.loanService.findLoansByYear({year: year});
    }

    @Get('loans/default-exchanged')
    @ApiOperation({
        summary:
            'Get the default loans with balance in foreign currency rate by year',
        parameters: [
            {
                name: 'year',
                in: 'query',
            },
            {
                name: 'currency',
                in: 'query',
                required: false,
            },
        ],
        responses: {
            200: {
                description: 'When loan with given id is found',
            },
            404: {
                description: 'When loan with given id is not found',
            },
        },
    })
    getDefaultedExchangedLoansByYear(
        @Query('year') year: number,
        @Query('currency') currency: string,
    ): Promise<LoansDto> {
        return this.loanService.findLoansByYear(
            {year: year, currency: currency},
        );
    }

    @Get('loans/distribution')
    @ApiOperation({
        summary: 'Get the distribution of default vs non-default loans',
        parameters: [
            {
                name: 'startDate',
                in: 'query',
            },
            {
                name: 'endDate',
                in: 'query',
            },
        ],
    })
    async getDefaultLoansDistribution(
        @Query('startDate') startDate: Date,
        @Query('endDate') endDate: Date,
    ): Promise<GetLoansDistributionDto> {
        Logger.log('startDate', startDate, 'endDate', endDate);
        return this.loanService.findLoansDistributionByDateRange({startDate: startDate, endDate: endDate});
    }

    @Get('loans/filter')
    @ApiOperation({
        summary: 'Get loans by custom filter. Possible filters: byJob, byAge, byEducation, byMaritalStatus',
        parameters: [
            {
                name: 'type',
                in: 'query',
            },
            {
                name: 'value',
                in: 'query',
            }
        ],
    })
    async getLoansWithCustomFilter(
        @Query('filterType') filterType: string,
        @Query('value') value: string,
    ): Promise<LoansDto> {
        Logger.log(`Received request with custom filter Type: ${filterType}, Value: ${value}`);
        return this.loanService.findLoansWithCustomFilter({ filterType: filterType, value: value});
    }
}
