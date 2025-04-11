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
    dto: CreateUserRequestDto,
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
    const { faceType, skinTone, hairLength } = dto;
    let recommendation = '';

    // Reglas para rostro ovalado
    if (faceType === 'ovalado') {
      if (skinTone === 'frio' && hairLength === 'corto')
        recommendation = 'Corte clásico, tinte ceniza, cejas definidas.';
      else if (skinTone === 'frio' && hairLength === 'medio')
        recommendation = 'Corte en capas, tinte platino, barba recortada.';
      else if (skinTone === 'frio' && hairLength === 'largo')
        recommendation =
          'Peinado con volumen natural, maquillaje en tonos fríos.';
      else if (skinTone === 'calido' && hairLength === 'corto')
        recommendation = 'Corte pulido, tintura dorada, cejas suaves.';
      else if (skinTone === 'calido' && hairLength === 'medio')
        recommendation =
          'Estilo elegante con capas sutiles, barba bien cuidada.';
      else if (skinTone === 'calido' && hairLength === 'largo')
        recommendation =
          'Peinado natural, tonos cobrizos, maquillaje en matices cálidos.';
      else if (skinTone === 'neutro' && hairLength === 'corto')
        recommendation =
          'Corte versátil, tintura adaptable, cejas equilibradas.';
      else if (
        skinTone === 'neutro' &&
        (hairLength === 'medio' || hairLength === 'largo')
      )
        recommendation = 'Estilo clásico, look balanceado.';
    }
    // Reglas para rostro redondo
    else if (faceType === 'redondo') {
      if (skinTone === 'frio' && hairLength === 'corto')
        recommendation =
          'Corte angular para alargar el rostro, tinte ceniza, barba recortada.';
      else if (skinTone === 'frio' && hairLength === 'medio')
        recommendation =
          'Estilo escalonado, cejas definidas, peinado asimétrico.';
      else if (skinTone === 'frio' && hairLength === 'largo')
        recommendation =
          'Peinado con volumen controlado y acentuación de pómulos.';
      else if (skinTone === 'calido' && hairLength === 'corto')
        recommendation =
          'Corte angular, tintura dorada, cejas suavemente arqueadas.';
      else if (skinTone === 'calido' && hairLength === 'medio')
        recommendation =
          'Estilo clásico, barba esculpida, combinación de tonos cálidos.';
      else if (skinTone === 'calido' && hairLength === 'largo')
        recommendation = 'Peinado fluido, look fresco con tintes cobrizos.';
      else if (
        skinTone === 'neutro' &&
        (hairLength === 'corto' || hairLength === 'medio')
      )
        recommendation =
          'Corte equilibrado, tintura adaptable, cejas naturales.';
      else if (skinTone === 'neutro' && hairLength === 'largo')
        recommendation = 'Estilo versátil, con énfasis en rasgos sin excesos.';
    }
    // Reglas para rostro alargado
    else if (faceType === 'alargado') {
      if (skinTone === 'frio')
        recommendation =
          'Flequillo frontal, volumen lateral y peinado estructurado para acortar visualmente.';
      else if (skinTone === 'calido')
        recommendation =
          'Cortes con capas laterales, flequillo estratégico y tintura cálida.';
      else if (skinTone === 'neutro')
        recommendation =
          'Peinado con volumen en laterales, estilo equilibrado.';
      else if (skinTone === 'mixto')
        recommendation =
          'Opción que suaviza la longitud con texturizado en el cabello.';
    }
    // Reglas para rostro cuadrado
    else if (faceType === 'cuadrado') {
      if (skinTone === 'frio')
        recommendation =
          'Corte suavizante, capas asimétricas y tinte ceniza para suavizar líneas angulares.';
      else if (skinTone === 'calido')
        recommendation =
          'Estilo angular suavizado, flequillo lateral y tintura dorada.';
      else if (skinTone === 'neutro')
        recommendation =
          'Corte en capas con contorno definido y acento en rasgos naturales.';
      else if (skinTone === 'mixto')
        recommendation = 'Alternativa que equilibra los ángulos del rostro.';
    }
    // Reglas para rostro en forma de corazón
    else if (faceType === 'corazon') {
      if (skinTone === 'frio')
        recommendation =
          'Corte con capas que equilibra frente ancha y mentón estrecho.';
      else if (skinTone === 'calido')
        recommendation =
          'Flequillo lateral, peinado equilibrado, acentuando pómulos.';
      else if (skinTone === 'neutro')
        recommendation =
          'Estilo asimétrico con técnicas de contorno para balance facial.';
      else if (skinTone === 'mixto')
        recommendation =
          'Estilo que realza mandíbula para equilibrar la frente.';
    }
    // Reglas para rostro diamante
    else if (faceType === 'diamante') {
      if (skinTone === 'frio')
        recommendation =
          'Corte que suaviza pómulos anchos y enmarca el rostro.';
      else if (skinTone === 'calido')
        recommendation = 'Corte en capas con contorno y tintura equilibrada.';
      else if (skinTone === 'neutro')
        recommendation = 'Peinado definido que resalta rasgos armónicos.';
      else if (skinTone === 'mixto')
        recommendation = 'Estilo que realza frente y mentón de forma sutil.';
    }
    // Reglas para otros tipos de rostro
    else if (faceType === 'triangular') {
      recommendation =
        'Volumen en la parte superior para equilibrar la mandíbula.';
    } else if (faceType === 'rectangular') {
      recommendation =
        'Flequillo y capas para suavizar la longitud del rostro.';
    }
    // Si no coincide con ninguna regla
    else {
      recommendation =
        'No se encontró una recomendación para los datos ingresados.';
    }

    return recommendation;
  }
}
