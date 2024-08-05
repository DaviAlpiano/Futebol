const times = [
    {
      id: 1,
      teamName: "Avaí/Kindermann"
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

export {
    times,
    createMockTeam,
    mockTeams,
    mockUser,
    tokenPayload,
}