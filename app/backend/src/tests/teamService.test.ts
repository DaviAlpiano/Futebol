import * as sinon from 'sinon';
import * as chai from 'chai';
const { expect } = chai;
import { times, mockTeams } from './mock';
import TeamModel from '../database/models/team.model';
import TeamService from '../service/team.service';

describe('TeamService', function () {
  beforeEach(function () { sinon.restore(); });

  it('Testando o getTeams', async function () {
    sinon.stub(TeamModel, 'findAll').resolves(mockTeams);
    
    const response = await TeamService.getTeams();
    expect(response.status).to.equal('successful');
    expect(response.data).to.deep.equal(times);
  });
});
