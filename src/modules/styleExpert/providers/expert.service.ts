import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/modules/users/dto/register.dto';
import { LoginDto } from 'src/modules/users/dto/login.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRequests } from '../interfaces/usersRequests.entity';
import { Recomendations } from '../interfaces/recomendations.entity';
import { FaceType } from '../interfaces/faceType.entity';
import { SkinTone } from '../interfaces/skinTone.entity';
import { HairLength } from '../interfaces/hairLength.entity';
import { User } from 'src/modules/users/interfaces/user.entity';
import { CreateUserRequestDto } from '../dto/createUserRequest.dto';
import { EvaluateRequestDto } from '../dto/evaluateRequest.dto';

@Injectable()
export class StyleExpertService {
  constructor(
    @InjectRepository(UsersRequests)
    private readonly usersRequestsRepository: Repository<UsersRequests>,

    @InjectRepository(Recomendations)
    private readonly recomendationsRepository: Repository<Recomendations>,

    @InjectRepository(FaceType)
    private readonly faceTypeRepository: Repository<FaceType>,

    @InjectRepository(SkinTone)
    private readonly skinToneRepository: Repository<SkinTone>,

    @InjectRepository(HairLength)
    private readonly hairLengthRepository: Repository<HairLength>,
  ) {}

  async createUserRequest(
    user: User,
    dto: CreateUserRequestDto | EvaluateRequestDto,
  ): Promise<UsersRequests> {
    const faceType = await this.faceTypeRepository.findOne({
      where: { name: dto.faceType },
    });
    const skinTone = await this.skinToneRepository.findOne({
      where: { name: dto.skinTone },
    });
    const hairLength = await this.hairLengthRepository.findOne({
      where: { name: dto.hairLength },
    });

    if (!faceType || !skinTone || !hairLength) {
      throw new Error(
        'Alguna de las características no existe en la base de datos',
      );
    }

    const userRequest = this.usersRequestsRepository.create({
      user,
      faceType,
      skinTone,
      hairLength,
    });

    return this.usersRequestsRepository.save(userRequest);
  }

  async evaluateExpert(dto: EvaluateRequestDto): Promise<string> {
    const faceTypeEntity = await this.faceTypeRepository.findOne({ where: { name: dto.faceType } });
    const skinToneEntity = await this.skinToneRepository.findOne({ where: { name: dto.skinTone } });
    const hairLengthEntity = await this.hairLengthRepository.findOne({ where: { name: dto.hairLength } });

    if (!faceTypeEntity || !skinToneEntity || !hairLengthEntity) {
      throw new Error('Alguna de las características no existe en la base de datos');
    }
    
    const recomendationEntity = await this.recomendationsRepository.findOne({
      where: {
        faceType: {id: faceTypeEntity.id},
        skinTone: {id: skinToneEntity.id},
        hairLength: {id: hairLengthEntity.id},
      },
      relations: ['faceType', 'skinTone', 'hairLength'],
    });

    console.log(recomendationEntity)

    if (!recomendationEntity) {
      return 'No se encontró una recomendación para los datos ingresados.';
    }

    return recomendationEntity.description;
  }
}
