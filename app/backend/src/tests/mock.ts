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

export {
    times,
    createMockTeam,
    mockTeams,
}