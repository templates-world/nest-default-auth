import {
  BadRequestException,
  INestApplication,
  UnauthorizedException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { config as loadEnv } from 'dotenv';
import { AuthModule } from 'src/auth/auth.module';
import * as request from 'supertest';

loadEnv();

describe('AuthController (e2e)', () => {
  let auth: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    auth = moduleFixture.createNestApplication();
    await auth.init();
  });

  afterAll(() => auth.close());

  it('/signup correctly', () => {
    return request(auth.getHttpServer())
      .post('/signup')
      .send({
        email: 'user@test.test',
        password: 'test123',
        confirm_password: 'test123',
      })
      .expect(200)
      .expect(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/g);
  });

  it("/signup doesn't work with wrong password", () => {
    return request(auth.getHttpServer())
      .post('/signup')
      .send({
        email: 'user@test.test',
        password: 'test123',
        confirm_password: 'test1234',
      })
      .expect(400)
      .expect(BadRequestException);
  });

  it('/signin correctly', () => {
    return request(auth.getHttpServer())
      .post('/signup')
      .send({
        email: 'user@test.test',
        password: 'test123',
      })
      .expect(200)
      .expect(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/g);
  });

  it("/signin doesn't work with wrong password", () => {
    return request(auth.getHttpServer())
      .post('/signup')
      .send({
        email: 'user@test.test',
        password: 'test1234',
      })
      .expect(200)
      .expect(UnauthorizedException);
  });
});
