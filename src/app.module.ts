import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DesignModule } from './design/design.module';
import { PrismaModule } from './prisma/prisma.module';
//
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    PrismaModule,
    DesignModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
