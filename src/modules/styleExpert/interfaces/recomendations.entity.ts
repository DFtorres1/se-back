import { BaseEntity } from 'src/shared/interfaces/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { FaceType } from 'src/modules/styleExpert/interfaces/faceType.entity';
import { SkinTone } from 'src/modules/styleExpert/interfaces/skinTone.entity';
import { HairLength } from 'src/modules/styleExpert/interfaces/hairLength.entity';

@Entity()
export class Recomendations extends BaseEntity {
  @ManyToOne(() => FaceType, (faceType) => faceType.recomendations)
  faceType: FaceType;

  @ManyToOne(() => SkinTone, (skinTone) => skinTone.recomendations)
  skinTone: SkinTone;

  @ManyToOne(() => HairLength, (hairLength) => hairLength.recomendations)
  hairLength: HairLength;

  @Column()
  description: string;
}
