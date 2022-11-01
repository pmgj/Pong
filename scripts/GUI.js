import Pong from "./Pong.js";
import Direction from "./Direction.js";

class GUI {
    constructor() {
        this.ctx = null;
        this.game = null;
        this.SCREEN_WIDTH = null;
        this.SCREEN_HEIGHT = null;
        this.UNIT_SIZE = 15;
    }
    startGame() {
        const canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
        this.SCREEN_WIDTH = canvas.offsetWidth;
        this.SCREEN_HEIGHT = canvas.offsetHeight;
        this.game = new Pong(this.SCREEN_HEIGHT / this.UNIT_SIZE, this.SCREEN_WIDTH / this.UNIT_SIZE);
        this.game.startGame();
        setInterval(this.paintComponent.bind(this), 100);
        document.addEventListener("keydown", this.keyPush.bind(this));
    }
    resetCanvas() {
        this.ctx.clearRect(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
    }
    paintComponent() {
        this.resetCanvas();
        this.game.updateBoard();
        // BALL
        let ball = this.game.getBall();
        this.ctx.beginPath();
        this.ctx.arc(ball.getY() * this.UNIT_SIZE + this.UNIT_SIZE / 2, ball.getX() * this.UNIT_SIZE + this.UNIT_SIZE / 2, this.UNIT_SIZE / 2, 0, 2 * Math.PI);
        this.ctx.fillStyle = "magenta";
        this.ctx.fill();
        // PLAYER 1
        let p1 = this.game.getPlayer1();
        for (let i = 0, SIZE = p1.length; i < SIZE; i++) {
            let x = p1[i].getX() * this.UNIT_SIZE, y = p1[i].getY() * this.UNIT_SIZE;
            this.ctx.fillStyle = "green";
            this.ctx.fillRect(y, x, this.UNIT_SIZE, this.UNIT_SIZE);
        }
        // PLAYER 2
        let p2 = this.game.getPlayer2();
        for (let i = 0, SIZE = p2.length; i < SIZE; i++) {
            let x = p2[i].getX() * this.UNIT_SIZE, y = p2[i].getY() * this.UNIT_SIZE;
            this.ctx.fillStyle = "green";
            this.ctx.fillRect(y, x, this.UNIT_SIZE, this.UNIT_SIZE);
        }
        this.writePoints();
    }
    writePoints() {
        this.ctx.font = "50px monospace";
        this.ctx.fillStyle = "#fff";
        // w/4 = 1/4 da tela = metade da tela do player 1
        this.ctx.fillText(this.game.getPlayer1Points(), this.SCREEN_WIDTH / 4, 50);
        // 3*(w/4) = 3/4 da tela = metade da tela do player 2
        this.ctx.fillText(this.game.getPlayer2Points(), 3 * (this.SCREEN_WIDTH / 4), 50);
    }
    keyPush(evt) {
        let map = { 'w': Direction.UP, 's': Direction.DOWN };
        if (map[evt.key]) {
            this.game.setPlayer1Direction(map[evt.key]);
        }
        map = { 'ArrowUp': Direction.UP, 'ArrowDown': Direction.DOWN };
        if (map[evt.key]) {
            this.game.setPlayer2Direction(map[evt.key]);
        }
    }
}
let gui = new GUI();
gui.startGame();
