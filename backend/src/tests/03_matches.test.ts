import * as chai from 'chai';
import { execSync } from 'child_process';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

import * as matches from './mocks/matches';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches tests: "/matchs"', () => {
  let chaiHttpResponse: Response;
  let loginToken: string;

  before(async () => {
    execSync('npm run db:reset');

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

    loginToken = chaiHttpResponse.body.token
  });

  describe('When making a GET request do "/matchs" and is successful:', () => {
    it('API responds with status 200, and all matches', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matchs')

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body.length).to.be.equal(48);
      expect(chaiHttpResponse.body).to.be.deep.equal(matches.allMatches);
    });
  });

  describe('When making a GET request do "/matchs/:id"', () => {
    it('and is successful: API responds with status 200, and the corresponding ID match', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matchs/5')

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(matches.successfulMatch);
    });

    it('and the ID is invalid: API responds with status 404, and the error message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matchs/441')

      const { message } = chaiHttpResponse.body;

      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(message).to.be.equal('Matches not found');
    });
  });

  describe('When making a GET request do "/matchs" with query param = true', () => {
    it('and is successful: API responds with status 200, and the corresponding query', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matchs')
        .query({ NaN, inProgress: true });

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body.length).to.be.equal(8);
      expect(chaiHttpResponse.body).to.be.deep.equal(matches.inProgressMatches);
    });
  });

  describe('When making a GET request do "/matchs" with query param = false', () => {
    it('and is successful: API responds with status 200, and the corresponding query', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matchs')
        .query({ NaN, inProgress: false });

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body.length).to.be.equal(40);
      expect(chaiHttpResponse.body).to.be.deep.equal(matches.finishedMatches);
    });
  });

  describe('When saving a new match with a POST request to /matchs', () => {
    let newMatchId: number;

    const validNewMatch = {
      "homeTeam": 16,
      "awayTeam": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
      "inProgress": true
    }

    const invalidNewMatch = {
      "homeTeam": 8,
      "awayTeam": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
      "inProgress": true
    }

    const invalidClub = {
      "homeTeam": 67,
      "awayTeam": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
      "inProgress": true
    }

    it('and is successful: API responds with status 201 and new entry data', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matchs')
        .set('authorization', loginToken)
        .send(validNewMatch);

      const { status, body } = chaiHttpResponse;

      expect(status).to.be.equal(201);
      expect(body).to.haveOwnProperty('id');
      newMatchId = body.id;
      delete body.id;
      expect(body).to.be.deep.equal(validNewMatch);
    });

    it('and is successful: API saves new match in the database', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get(`/matchs/${newMatchId}`);

      const { status, body } = chaiHttpResponse;

      expect(status).to.be.equal(200);
      expect(body.id).to.be.equal(newMatchId);
      delete body.id; delete body.homeClub; delete body.awayClub;
      expect(body).to.be.deep.equal(validNewMatch);
    });

    it('and it fails because:', () => {
      it('the club is used two times', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get(`/matchs`)
          .send(invalidNewMatch);

        const { status, body } = chaiHttpResponse;

        expect(status).to.be.equal(401);
        expect(body.message).to.be.equal('It is not possible to create a match with two equal teams');
      });

      it('the club dont exist', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get(`/matchs`)
          .send(invalidClub);

        const { status, body } = chaiHttpResponse;

        expect(status).to.be.equal(401);
        expect(body.message).to.be.equal('There is no team with such id!');
      });
    })
  });
});


