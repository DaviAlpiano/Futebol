import * as sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import TeamService from '../service/team.service';
import TeamController from '../controller/team.controller';
const { expect } = chai;
import { times, mockTeams } from './mock';
import { Request, Response } from 'express';

chai.use(sinonChai);

describe('TeamController', function () {
  let req: Request;
  let res: Response;

  beforeEach(function () {
    req = {} as Request;
    res = {} as Response;
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Testando o getTeams', async function () {
    sinon.stub(TeamService, 'getTeams').resolves({ status: 'successful', data: mockTeams });

    await TeamController.getTeams(req, res);
    
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(times);
  });
});
