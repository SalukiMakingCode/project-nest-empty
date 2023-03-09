import { createParamDecorator, ExecutionContext, HttpException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ErrorMessage, ErrorStatus } from '../enum/error.enum';

export const User = createParamDecorator(async (data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new HttpException(ErrorMessage.AUTHENTICATION_FAIL, ErrorStatus.AUTHENTICATION_FAIL);
  }

  const tokenSplit = authHeader.split(' ');
  const token = tokenSplit[1];
  const jwtService = new JwtService();
  const decoded = jwtService.decode(token) as { id: number };
  return decoded.id;
});
