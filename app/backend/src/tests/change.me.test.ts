import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { times, mockTeams } from './mock';
import TeamModel from '../database/models/team.model';
import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
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
});
