import { BaseEntity } from 'src/shared/interfaces/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Recomendations } from 'src/modules/styleExpert/interfaces/recomendations.entity';
import { UsersRequests } from 'src/modules/styleExpert/interfaces/usersRequests.entity';

@Entity()
export class SkinTone extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Recomendations, (recomendations) => recomendations.skinTone)
  recomendations: Recomendations[];

  @OneToMany(() => UsersRequests, (usersRequest) => usersRequest.skinTone)
  usersRequest: UsersRequests[];
}
