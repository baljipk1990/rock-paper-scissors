import { Component } from '@angular/core';
import { GameService } from './game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  playername!: string;
  public playerChoice: string = "";
  public computerChoice: string = "";
  private roundsLeft: number = 6;
  private computerScore: number = 0;
  private playerScore: number = 0;
  private winner: string = "";
  private winnerSide: string = "";
  private winnerChoice: string = "";
  private loserChoice: string = "";

  constructor(private gameservice: GameService) {
  }
  // Handle user choice selection
  handleClick(choice: string) {
    this.playerChoice = choice;
    this.computerChoice = this.getComputerChoice();
    this.roundsLeft--;
    this.updateScore();
    this.monitorGame();
    console.log(this.playerChoice);
    console.log(this.computerChoice);
  }
  // Generate a random choice for the computer
  getComputerChoice(): string {
    const choices = ['rock', 'paper', 'scissors'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
  }
  // Update the game score based on player and computer choices
  updateScore() {
    if (this.playerChoice == "rock") {
      if (this.computerChoice == "paper") {
        this.computerScore++;
        this.winnerSide = "Computer";
        this.winnerChoice = "paper";
        this.loserChoice = "rock";
      }
      else if (this.computerChoice == "scissors") {
        this.playerScore++;
        this.winnerSide = "Player";
        this.winnerChoice = "rock";
        this.loserChoice = "scissors";
      }
      else {
        this.winnerSide = "Tie";
        this.winnerChoice = this.playerChoice;
        this.loserChoice = this.playerChoice;
      }
    }
    else if (this.playerChoice == "paper") {
      if (this.computerChoice == "scissors") {
        this.computerScore++;
        this.winnerSide = "Computer";
        this.winnerChoice = "scissors";
        this.loserChoice = "paper";
      }
      else if (this.computerChoice == "rock") {
        this.playerScore++;
        this.winnerSide = "Player";
        this.winnerChoice = "paper";
        this.loserChoice = "rock";
      }
      else {
        this.winnerSide = "Tie";
        this.winnerChoice = this.playerChoice;
        this.loserChoice = this.playerChoice;
      }
    }
    else if (this.playerChoice == "scissors") {
      if (this.computerChoice == "rock") {
        this.computerScore++;
        this.winnerSide = "Computer";
        this.winnerChoice = "rock";
        this.loserChoice = "scissors";
      }
      else if (this.computerChoice == "paper") {
        this.playerScore++;
        this.winnerSide = "Player";
        this.winnerChoice = "scissors";
        this.loserChoice = "paper";
      }
      else {
        this.winnerSide = "Tie";
        this.winnerChoice = this.playerChoice;
        this.loserChoice = this.playerChoice;
      }

    }

  }
  // Monitor the game and determine the winner
  monitorGame(): any {
    if (this.roundsLeft == 0) {
      if (this.computerScore > this.playerScore)
        this.winner = "Computer wins!";
      else if (this.computerScore < this.playerScore)
        this.winner = "Player wins!";
      else
        this.winner = "It's a tie!";

    }

  }


  data: any;
  // Send game results to the API
  send() {
    this.data = {
      "name": this.playername, "user_score": this.playerScore, "comp_score": this.computerScore, "status": this.winner
    }

    this.gameservice.post(this.data).subscribe((response: any) => {
      console.log('API response:', response);
    },
      (error: any) => {
        console.error('API error:', error);

      }
    );
  }
  getComputerScore() {
    return this.computerScore;
  }

  getPlayerScore() {
    return this.playerScore;
  }

  getRounds() {
    return this.roundsLeft;
  }

  getComputer() {
    return this.computerChoice;
  }

  getPlayer() {
    return this.playerChoice;
  }

  getWinnerSide() {
    return this.winnerSide;
  }

  getWinnerChoice() {
    return this.winnerChoice;
  }

  getLoserChoice() {
    return this.loserChoice;
  }
  // restart the game
  restartGame() {
    this.send();
    this.playerChoice = "";
    this.computerChoice = "";
    this.playername = "";
    this.roundsLeft = 6;
    this.computerScore = 0;
    this.playerScore = 0;

  }
  // Get the overall winner of the game
  getWinner() {

    return this.winner;
  }
}
