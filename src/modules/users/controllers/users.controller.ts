import { Controller, Get, Headers, Param } from "@nestjs/common";
import { UsersService } from "src/modules/users/providers/users.service";
import { User } from "src/modules/users/interfaces/user.entity";

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Get()
  async findAll(
  ): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number,): Promise<User | null> {
    return this.usersService.findOne(id);
  }
}