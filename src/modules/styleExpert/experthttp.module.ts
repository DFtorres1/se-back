import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FaceType } from 'src/modules/styleExpert/interfaces/faceType.entity';
import { HairLength } from 'src/modules/styleExpert/interfaces/hairLength.entity';
import { Recomendations } from 'src/modules/styleExpert/interfaces/recomendations.entity';
import { SkinTone } from 'src/modules/styleExpert/interfaces/skinTone.entity';
import { UsersRequests } from 'src/modules/styleExpert/interfaces/usersRequests.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FaceType,
      HairLength,
      Recomendations,
      SkinTone,
      UsersRequests,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class ExpertHTTPModule {}
