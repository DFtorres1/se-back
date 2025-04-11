import { Body, Controller, Post, Req } from '@nestjs/common';
// import { RegisterDto } from 'src/modules/users/dto/register.dto';
// import { CreateUserRequestDto } from '../dto/createUserRequest.dto';
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
  //   return this.expertService.createUserRequest(createUserRequestDto);
  // }

  @Post('evaluate')
  async evaluateRecommendation(
    @Body() evaluateDto: EvaluateRequestDto,
  ): Promise<{ recommendation: string }> {
    const recommendation = await this.expertService.evaluateExpert(evaluateDto);
    return { recommendation };
  }
}
