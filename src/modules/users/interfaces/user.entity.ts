import { Role } from 'src/common/enums/role.enum';
import { UsersRequests } from 'src/modules/styleExpert/interfaces/usersRequests.entity';
import { BaseEntity } from 'src/shared/interfaces/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: [Role.Client] })
  roles: Role[];

  @OneToMany(() => UsersRequests, (usersRequests) => usersRequests.hairLength)
  usersRequest: UsersRequests[];
}
