type GoalsType = {
  homeTeamGoals: number;
  awayTeamGoals: number;
};

export interface IEditMatchRequestDTO {
  id: number;
  goals: GoalsType;
}
