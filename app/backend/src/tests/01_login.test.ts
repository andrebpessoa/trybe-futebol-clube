import * as chai from 'chai';
import { exec } from 'child_process';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login tests: "/login" & "/login/validate"', () => {
  let chaiHttpResponse: Response;
  let loginToken: string;

  before(async () => {
    exec('npm run db:reset');
  });

  describe('When login is successful', () => {
    it('API responds with status 200, user data and token', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: 'secret_admin' });

      const { user, token } = chaiHttpResponse.body;

      loginToken = token;

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(token).not.to.be.undefined;
      expect(user.username).to.be.equal('Admin');
    });
  });

  describe('When email is', () => {
    it('not registered', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin.com', password: 'secret_admin' });

      const { message } = chaiHttpResponse.body;

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(message).to.be.equal('Incorrect email or password');
    });

    it('was not specified', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: '', password: 'secret_admin' });

      const { message } = chaiHttpResponse.body;

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(message).to.be.equal('All fields must be filled');
    });
  });

  describe('When password is', () => {
    it('not correct', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: 'senha_invalida' });

      const { message } = chaiHttpResponse.body;

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(message).to.be.equal('Incorrect email or password');
    });

    it('was not specified', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password: '' });

      const { message } = chaiHttpResponse.body;

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(message).to.be.equal('All fields must be filled');
    });
  });

  describe('When validating a login with a token that is', () => {
    it('valid: Responds with the user role', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', loginToken);


      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.text).to.be.equal('"admin"');
    });

    it('invalid: Responds with the "Invalid Token" message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', '123456');

      const { message } = chaiHttpResponse.body;

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(message).to.be.equal('Expired or invalid token');
    });

    it('not provided: Responds with the "Token not found" message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')

      const { message } = chaiHttpResponse.body;

      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(message).to.be.equal('Token not found');
    });
  });
});
