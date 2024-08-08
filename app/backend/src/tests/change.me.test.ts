import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { times, mockTeams, mockUser, tokenPayload, matchesMocks, mockMatches, createdMatch, createdRMatch, mockTeamMatches, teamMatches, responseTeamMatches } from './mock';
import TeamModel from '../database/models/team.model';
import UserModel from '../database/models/users.model';
import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import JwtScret from '../utils/jwt';
import MatchesModel from '../database/models/matches.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  beforeEach(function () { sinon.restore(); });
  const token =  JwtScret.sign(tokenPayload);
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(false);
  });

  it('Deve retornar os times', async () => {
    sinon.stub(TeamModel, "findAll").resolves(mockTeams);

    chaiHttpResponse = await chai.request(app).get('/teams');

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.deep.equal(times);
  });

  it('Deve retornar um time', async () => {
    sinon.stub(TeamModel, "findByPk").resolves(TeamModel.build(times[0]));

    chaiHttpResponse = await chai.request(app).get('/teams/1');

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.deep.equal(times[0]);
  });

  it('O post login deve retornar um token', async () => {
    sinon.stub(UserModel, "findOne").resolves(UserModel.build(mockUser));

    const login = {
      email: "admin@admin.com",
      password: "secret_admin"
    }

    chaiHttpResponse = await chai.request(app).post('/login').send(login);
    const expectToken =  JwtScret.sign(tokenPayload);

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body.token).to.equal(expectToken);
  });

  it('O get login/role deve retornar a role do email', async () => {
    sinon.stub(UserModel, "findOne").resolves(UserModel.build(mockUser));

    chaiHttpResponse = await chai.request(app).get('/login/role').set('Authorization', `Bearer ${token}`);

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body.role).to.equal('admin');
  });

  it('Deve retornar as matches', async () => {
    sinon.stub(MatchesModel, "findAll").resolves(mockMatches);

    chaiHttpResponse = await chai.request(app).get('/matches');

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.deep.equal(matchesMocks);
  });

  it('Deve finalizar a match', async () => {
    const affectedCount = 1;
    sinon.stub(MatchesModel, "update").resolves([affectedCount] as [number]);

    chaiHttpResponse = await chai.request(app).patch('/matches/1/finish').set('Authorization', `Bearer ${token}`);    

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.deep.equal({ message: "Finished" });
  });

  it('Deve atualizar uma match', async () => {
    const affectedCount = 1;
    sinon.stub(MatchesModel, "update").resolves([affectedCount] as [number]);

    chaiHttpResponse = await chai.request(app).patch('/matches/1')
      .set('Authorization', `Bearer ${token}`)
      .send({
        "homeTeamGoals": 3,
        "awayTeamGoals": 1
      });    

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.deep.equal({ message: "Updated" });
  });

  it('Deve criar uma match', async () => {
    sinon.stub(MatchesModel, "create").resolves(MatchesModel.build(createdMatch));

    chaiHttpResponse = await chai.request(app).post('/matches')
      .set('Authorization', `Bearer ${token}`)
      .send({
        "homeTeamId": 16, 
        "awayTeamId": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2
      });    

    expect(chaiHttpResponse).to.have.status(201);
    expect(chaiHttpResponse.body).to.deep.equal(createdRMatch);
  });

  it('Nao deve criar uma match com times iguais', async () => {
    sinon.stub(MatchesModel, "create").resolves(MatchesModel.build(createdMatch));

    chaiHttpResponse = await chai.request(app).post('/matches')
      .set('Authorization', `Bearer ${token}`)
      .send({
        "homeTeamId": 8, 
        "awayTeamId": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2
      });    

    expect(chaiHttpResponse).to.have.status(422);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
  });

  it('Deve retornar o leaderboard Home', async () => {
    sinon.stub(TeamModel, "findAll").resolves(mockTeamMatches);

    chaiHttpResponse = await chai.request(app).get('/leaderboard/home')
      .set('Authorization', `Bearer ${token}`);

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.deep.equal(responseTeamMatches);
  });

});
