import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { times, mockTeams, mockUser, tokenPayload } from './mock';
import TeamModel from '../database/models/team.model';
import UserModel from '../database/models/users.model';
import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import JwtScret from '../utils/jwt';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  beforeEach(function () { sinon.restore(); });
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

    const token =  JwtScret.sign(tokenPayload);

    chaiHttpResponse = await chai.request(app).get('/login/role').set('Authorization', `Bearer ${token}`);

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body.role).to.equal('admin');
  });
});
