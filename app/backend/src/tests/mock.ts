type Team = {
  teamName: string;
};

type Match = {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam: Team;
  awayTeam: Team;
};

const times = [
    {
      id: 1,
      teamName: "Avaí/Kindermann",
    },
    {
      id: 2,
      teamName: "Bahia"
    },
    {
      id: 3,
      teamName: "Botafogo"
    },
]

const createMockTeam = (id: number, teamName: string) => {
  return { id, teamName } as any;
};

const mockTeams = [
  createMockTeam(1, 'Avaí/Kindermann'),
  createMockTeam(2, 'Bahia'),
  createMockTeam(3, 'Botafogo'),
];

const mockUser = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
}

const tokenPayload = {
  id: mockUser.id,
  email: mockUser.email,
}

const matchesMocks = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeamId": 9,
    "homeTeamGoals": 1,
    "awayTeamId": 14,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "Internacional"
    },
    "awayTeam": {
      "teamName": "Santos"
    }
  },
  {
    "id": 3,
    "homeTeamId": 4,
    "homeTeamGoals": 3,
    "awayTeamId": 11,
    "awayTeamGoals": 0,
    "inProgress": false,
    "homeTeam": {
      "teamName": "Corinthians"
    },
    "awayTeam": {
      "teamName": "Napoli-SC"
    }
  },
  {
    "id": 4,
    "homeTeamId": 3,
    "homeTeamGoals": 0,
    "awayTeamId": 2,
    "awayTeamGoals": 0,
    "inProgress": true,
    "homeTeam": {
      "teamName": "Botafogo"
    },
    "awayTeam": {
      "teamName": "Bahia"
    }
  },
]

const createMockMatch = (match: Match) => {
  return {
    id: match.id,
    homeTeamId: match.homeTeamId,
    homeTeamGoals: match.homeTeamGoals,
    awayTeamId: match.awayTeamId,
    awayTeamGoals: match.awayTeamGoals,
    inProgress: match.inProgress,
    homeTeam: match.homeTeam,
    awayTeam: match.awayTeam,
  } as any;
};

const mockMatches = [
  createMockMatch(matchesMocks[0]),
  createMockMatch(matchesMocks[1]),
  createMockMatch(matchesMocks[2]),
  createMockMatch(matchesMocks[3]),
]

const createdMatch = {
  "id": 1,
  "homeTeamId": 16,
  "homeTeamGoals": 2,
  "awayTeamId": 8,
  "awayTeamGoals": 2,
  "inProgress": 1
}

const createdRMatch = {
  "id": 1,
  "homeTeamId": 16,
  "homeTeamGoals": 2,
  "awayTeamId": 8,
  "awayTeamGoals": 2,
  "inProgress": true
}

const teamMatches = [
  {
    "id": 16,
    "teamName": "São Paulo",
    "matches": [
      {
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 3,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": false
      },
      {
        "id": 28,
        "homeTeamId": 16,
        "homeTeamGoals": 3,
        "awayTeamId": 7,
        "awayTeamGoals": 0,
        "inProgress": false
      }
    ]
  },
  {
    "id": 9,
    "teamName": "Internacional",
    "matches": [
      {
        "id": 2,
        "homeTeamId": 9,
        "homeTeamGoals": 1,
        "awayTeamId": 14,
        "awayTeamGoals": 1,
        "inProgress": false
      },
      {
        "id": 29,
        "homeTeamId": 9,
        "homeTeamGoals": 0,
        "awayTeamId": 4,
        "awayTeamGoals": 4,
        "inProgress": false
      },
      {
        "id": 34,
        "homeTeamId": 9,
        "homeTeamGoals": 3,
        "awayTeamId": 6,
        "awayTeamGoals": 1,
        "inProgress": false
      }
    ]
  },
  {
    "id": 4,
    "teamName": "Corinthians",
    "matches": [
      {
        "id": 3,
        "homeTeamId": 4,
        "homeTeamGoals": 3,
        "awayTeamId": 11,
        "awayTeamGoals": 0,
        "inProgress": false
      },
      {
        "id": 22,
        "homeTeamId": 4,
        "homeTeamGoals": 3,
        "awayTeamId": 3,
        "awayTeamGoals": 1,
        "inProgress": false
      }
    ]
  },
]

const createMockTeamMatches = (team: any) => {
  return {
    id: team.id,
    teamName: team.teamName,
    matches: team.matches.map((match: any) => ({
      id: match.id,
      homeTeamId: match.homeTeamId,
      homeTeamGoals: match.homeTeamGoals,
      awayTeamId: match.awayTeamId,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: match.inProgress,
    })),
  } as any;
};

const mockTeamMatches = [
  createMockTeamMatches(teamMatches[0]),
  createMockTeamMatches(teamMatches[1]),
  createMockTeamMatches(teamMatches[2]),
];

const responseTeamMatches = [
  {
    "efficiency": 100,
    "goalsBalance": 5,
    "goalsFavor": 6,
    "goalsOwn": 1,
    "name": "São Paulo",
    "totalDraws": 0,
    "totalGames": 2,
    "totalLosses": 0,
    "totalPoints": 6,
    "totalVictories": 2,
   },
   {
    "efficiency": 100,
    "goalsBalance": 5,
    "goalsFavor": 6,
    "goalsOwn": 1,
    "name": "Corinthians",
    "totalDraws": 0,
    "totalGames": 2,
    "totalLosses": 0,
    "totalPoints": 6,
    "totalVictories": 2,
  },
  {
    "efficiency": 44.44,
    "goalsBalance": -2,
    "goalsFavor": 4,
    "goalsOwn": 6,
    "name": "Internacional",
    "totalDraws": 1,
    "totalGames": 3,
    "totalLosses": 1,
    "totalPoints": 4,
    "totalVictories": 1,
  },
]

export {
    times,
    createMockTeam,
    mockTeams,
    mockUser,
    tokenPayload,
    matchesMocks,
    createMockMatch,
    mockMatches,
    createdMatch,
    createdRMatch,
    teamMatches,
    createMockTeamMatches,
    mockTeamMatches,
    responseTeamMatches,
}