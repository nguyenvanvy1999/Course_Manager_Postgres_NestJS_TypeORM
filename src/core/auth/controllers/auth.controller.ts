import { Get, Post, Res, UseGuards, Body } from '@nestjs/common';
import { ApiInit, ControllerInit } from 'src/decorators';
import { AuthService } from '../services';
import { Response } from 'express';
import { User } from '../decorators';
import { RegisterDTO, ValidateResDTO } from '../dtos';
import { JwtAuthGuard, LocalAuthGuard } from '../guards';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ControllerInit('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @ApiInit('Login', ValidateResDTO)
  @UseGuards(LocalAuthGuard)
  @ApiUnauthorizedResponse({ description: 'Unauthorized!' })
  async login(
    @Res() res: Response,
    @User() user: ValidateResDTO,
  ): Promise<ValidateResDTO> {
    try {
      const { cookie, user: parsedUser } = await this.authService.login(user);
      res.setHeader('Set-Cookie', cookie);
      return parsedUser;
    } catch (error) {
      throw error;
    }
  }
  @Get('profile')
  @ApiInit('Get profile', ValidateResDTO)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public getProfile(@User() user: ValidateResDTO): ValidateResDTO {
    try {
      return user;
    } catch (error) {
      throw error;
    }
  }
  @Post('register')
  @ApiInit('Register', ValidateResDTO)
  async register(
    @Body() registerPayload: RegisterDTO,
    @Res() res: Response,
  ): Promise<ValidateResDTO> {
    const { cookie, user } = await this.authService.register(registerPayload);
    res.setHeader('Set-Cookie', cookie);
    return user;
  }
}
