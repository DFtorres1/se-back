import { BaseEntity } from 'src/shared/interfaces/base.entity';
import { Entity, ManyToOne } from 'typeorm';
import { FaceType } from 'src/modules/styleExpert/interfaces/faceType.entity';
import { SkinTone } from 'src/modules/styleExpert/interfaces/skinTone.entity';
import { HairLength } from 'src/modules/styleExpert/interfaces/hairLength.entity';
import { User } from 'src/modules/users/interfaces/user.entity';

@Entity()
export class UsersRequests extends BaseEntity {
  @ManyToOne(() => User, (user) => user.usersRequest)
  user: User;

  @ManyToOne(() => FaceType, (faceType) => faceType.usersRequest)
  faceType: FaceType;

  @ManyToOne(() => SkinTone, (skinTone) => skinTone.usersRequest)
  skinTone: SkinTone;

  @ManyToOne(() => HairLength, (hairLength) => hairLength.usersRequest)
  hairLength: HairLength;
}
