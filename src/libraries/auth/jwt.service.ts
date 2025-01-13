"use server";

import jwt from 'jsonwebtoken';
import {BadRequestError} from '../error';
import {ACCESS_TOKEN_MAX_AGE, REFRESH_TOKEN_MAX_AGE} from './config';

export const generateAccessToken = async (data: Payload) => {
  return jwt.sign(data, process.env.AUTH_ACCESS_SECRET, {expiresIn: ACCESS_TOKEN_MAX_AGE});
};

export const generateRefreshToken = async (data: JWT) => {
  return jwt.sign(data, process.env.AUTH_REFRESH_SECRET, {expiresIn: REFRESH_TOKEN_MAX_AGE});
};

export const parseJwtToken = async <T extends "access" | "refresh">(token: string, type: T) => {
  try{
    return jwt.verify(token, 
      type === "access" 
      ? process.env.AUTH_ACCESS_SECRET 
      : process.env.AUTH_REFRESH_SECRET
    ) as T extends "access" ? Payload : JWT;
  } catch (e) {
    throw new BadRequestError("Invalid Token");
  }
};
