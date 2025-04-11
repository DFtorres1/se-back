import { Module } from '@nestjs/common';
import { ExpertHTTPModule } from 'src/modules/styleExpert/experthttp.module';
import { StyleExpertController } from './controllers/expert.controller';
import { StyleExpertService } from './providers/expert.service';

@Module({
  imports: [ExpertHTTPModule],
  controllers: [StyleExpertController],
  providers: [StyleExpertService],
  exports: [],
})
export class ExpertModule {}
