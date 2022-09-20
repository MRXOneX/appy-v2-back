import { Module } from '@nestjs/common';
import { DesignController } from './design.controller';
import { DesignGateway } from './design.gateway';
import { DesignService } from './design.service';

@Module({
  controllers: [DesignController],
  imports: [],
  providers: [DesignService, DesignGateway],
})
export class DesignModule {}
