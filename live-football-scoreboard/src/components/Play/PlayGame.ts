
// src/Game.ts
class Game {
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    startTime: Date;
  
    constructor(homeTeam: string, awayTeam: string) {
      this.homeTeam = homeTeam;
      this.awayTeam = awayTeam;
      this.homeScore = 0;
      this.awayScore = 0;
      this.startTime = new Date();
    }
  
    updateScore(homeScore: number, awayScore: number) {
      this.homeScore = homeScore;
      this.awayScore = awayScore;
    }
  
    get totalScore() {
      return this.homeScore + this.awayScore;
    }
  }
  
  export default Game;