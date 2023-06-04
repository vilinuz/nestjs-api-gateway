import {Module} from '@nestjs/common';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {LoanController} from "./loan/loan.controller";
import {join} from "util.join";
import {LoanServiceName} from "./loan/constants";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: LoanServiceName,
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50050',
          package: 'loan',
          protoPath: join(__dirname, 'loan/loan.proto'),
        },
      },
    ]),
  ],
  controllers: [LoanController],
})
export class AppModule {}
