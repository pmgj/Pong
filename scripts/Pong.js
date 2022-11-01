import CellState from "./CellState.js";
import Cell from "./Cell.js";
import Direction from "./Direction.js";

export default class Pong {
    constructor(w, h) {
        this.board = Array(w).fill().map(() => Array(h).fill(CellState.EMPTY));
        this.rows = w;
        this.cols = h;
        this.player1 = null;
        this.player2 = null;
        this.ball = null;
        this.player1Points = null;
        this.player2Points = null;
        this.ball_x_orientation = null;
        this.ball_y_orientation = null;
        this.player1Direction = null;
        this.player2Direction = null;
    }
    getBall() {
        return this.ball;
    }
    getPlayer1() {
        return this.player1;
    }
    getPlayer1Points() {
        return this.player1Points;
    }
    getPlayer2() {
        return this.player2;
    }
    getPlayer2Points() {
        return this.player2Points;
    }
    startGame() {
        this.createPlayers();
        this.createBall();
        this.showBoard();
        this.player1Points = this.player2Points = 0;
        this.player1Direction = this.player2Direction = Direction.NONE;
    }
    createPlayers() {
        this.player1 = [], this.player2 = [];
        let n = Math.floor(this.rows / 4), start = Math.floor(this.rows / 2) - Math.floor(n / 2);
        for (let i = 0; i < n; i++) {
            this.player1.push(new Cell(start + i, 1));
            this.player2.push(new Cell(start + i, this.cols - 2));
        }
        //        console.table(player2);
    }
    createBall() {
        this.ball = new Cell(Math.floor(this.rows / 2), Math.floor(this.cols / 2));
        this.ball_x_orientation = Math.random() > 0.5 ? 1 : -1;
        this.ball_y_orientation = Math.random() > 0.5 ? 1 : -1;
    }
    showBoard() {
        // Board
        for (let i = 0; i < this.rows; i++) {
            this.board[i].fill(CellState.EMPTY);
        }
        // Players
        this.player1.forEach(c => {
            if (this.onBoard(c)) {
                this.board[c.getX()][c.getY()] = CellState.PLAYER1;
            }
        });
        this.player2.forEach(c => {
            if (this.onBoard(c)) {
                this.board[c.getX()][c.getY()] = CellState.PLAYER2;
            }
        });
        // Ball
        this.board[this.ball.getX()][this.ball.getY()] = CellState.BALL;
        //        console.table(board);
    }
    onBoard({ x, y }) {
        let inLimit = (value, limit) => value >= 0 && value < limit;
        return (inLimit(x, this.rows) && inLimit(y, this.cols));
    }
    updateBoard() {
        this.move();
        this.showBoard();
    }
    move() {
        // Verifica se a bola passou bateu no chão ou no teto
        if (this.ball.getX() === 0 || this.ball.getX() === this.rows - 1) {
            this.ball_y_orientation *= -1;
        }
        let tempBall = new Cell(this.ball.getX() + this.ball_y_orientation, this.ball.getY() + this.ball_x_orientation);
        if (this.player1.find(c => c.equals(tempBall))) {
            // Verifica se a bola está colidindo com o barra do player 1
            this.ball_x_orientation = 1;
        } else if (this.player2.find(c => c.equals(tempBall))) {
            // Verifica se a bola está colidindo com o barra do player 2
            this.ball_x_orientation = -1;
        }
        // Move a bola no eixo X e Y
        this.ball = new Cell(this.ball.getX() + this.ball_y_orientation, this.ball.getY() + this.ball_x_orientation);
        // Calcula pontuação
        if (this.ball.getY() < 0) {
            this.player2Points++;
            this.createBall();
        }
        if (this.ball.getY() === this.cols) {
            this.player1Points++;
            this.createBall();
        }
        // Move os jogadores
        if (this.player1Direction === Direction.UP && this.player1[0].getX() > 0) {
            this.player1.forEach(c => c.setX(c.getX() - 1));
        }
        if (this.player1Direction === Direction.DOWN && this.player1[this.player1.length - 1].getX() < this.rows - 1) {
            this.player1.forEach(c => c.setX(c.getX() + 1));
        }
        if (this.player2Direction === Direction.UP && this.player2[0].getX() > 0) {
            this.player2.forEach(c => c.setX(c.getX() - 1));
        }
        if (this.player2Direction === Direction.DOWN && this.player2[this.player2.length - 1].getX() < this.rows - 1) {
            this.player2.forEach(c => c.setX(c.getX() + 1));
        }
    }
    setPlayer1Direction(d) {
        this.player1Direction = d;
    }
    setPlayer2Direction(d) {
        this.player2Direction = d;
    }
}