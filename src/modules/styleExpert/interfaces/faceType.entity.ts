import { BaseEntity } from 'src/shared/interfaces/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Recomendations } from 'src/modules/styleExpert/interfaces/recomendations.entity';
import { UsersRequests } from 'src/modules/styleExpert/interfaces/usersRequests.entity';

@Entity()
export class FaceType extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Recomendations, (recomendations) => recomendations.faceType)
  recomendations: Recomendations[];

  @OneToMany(() => UsersRequests, (usersRequests) => usersRequests.faceType)
  usersRequest: UsersRequests[];
}
