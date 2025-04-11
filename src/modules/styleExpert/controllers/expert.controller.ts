import { Body, Controller, NotFoundException, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserRequestDto } from '../dto/createUserRequest.dto';
import { EvaluateRequestDto } from '../dto/evaluateRequest.dto';
import { StyleExpertService } from '../providers/expert.service';

@Controller('style-expert')
export class StyleExpertController {
  constructor(private readonly expertService: StyleExpertService) {}

  // @Post('request')
  // async createUserRequest(
  //   @Body() createUserRequestDto: CreateUserRequestDto,
  //   @Req() req: Request,
  // ) {
  //   const user = req.user;
  //   if (!user) {
  //     throw new NotFoundException('Invalid user: user not found');
  //   }
  //   return this.expertService.createUserRequest(user, createUserRequestDto);
  // }

  @Post('evaluate')
  async evaluateRecommendation(
    @Body() evaluateDto: EvaluateRequestDto,
    @Req() req: Request,
  ): Promise<{ recommendation: string }> {
    const user = req.user;
    if (!user) {
      throw new NotFoundException('Invalid user: user not found');
    }

    this.expertService.createUserRequest(user, evaluateDto);
    const recommendation = await this.expertService.evaluateExpert(evaluateDto);
    return { recommendation };
  }
}
