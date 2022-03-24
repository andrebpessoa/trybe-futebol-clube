import * as chai from 'chai';
import { exec } from 'child_process';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

import { default as clubsList } from './mocks/clubsList'

chai.use(chaiHttp);

const { expect } = chai;

describe('Clubs tests: "/clubs" & "/clubs/:id"', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    exec('npm run db:reset');
  });

  describe('When making a GET request do "/clubs"', () => {
    it('API responds with status 200 and all clubs', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/clubs')

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(clubsList);
    });
  });

  describe('When making a GET request do "/clubs/:id"', () => {
    it('and club exists: API responds with status 200 and club data based on id', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/clubs/5');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(clubsList[4]);
    });

    it('and club doesnt exist: API responds with status 404 and correct message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/clubs/447');

      const { message } = chaiHttpResponse.body;

      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(message).to.be.equal('Club not found');
    });
  });
});
