import { AppError } from '../../../../errors/AppError';
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token Missing!", 401);
  }

  const [bearer, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      process.env.WEB_TOKEN_KEYWORD
    ) as IPayload;

    const userRepository = new UserRepository();
    const user = await userRepository.findById(user_id);

    if(!user) {
      throw new AppError("User does not exists!")
    }

    request.user = {
      id: user_id
    }

    next();
  } catch (err) {
    throw new AppError("Invalid Token", 401);
  }
}
