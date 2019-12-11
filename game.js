
class Game {

    constructor() {
        this.snake = [[16, 16], [16, 15], [16, 14], [16, 13]];
        this.apple = [20, 20];
        this.direction = 4;
        this.fasterWay = false;
    }

    move() {

        let tail = [];

        if(this.snake[0][0] === this.apple[0] && this.snake[0][1] === this.apple[1]) {
            tail.push(this.snake[this.snake.length-1][0]);
            tail.push(this.snake[this.snake.length-1][1]);

            this.generateNewApple();

            if(this.fasterWay) {
                if(this.snake[0][0]%2 === 0) {
                    this.direction = 2;
                } else {
                    this.direction = 8;
                }
                this.fasterWay = false;
            }
        }

        if(this.snake[0][0] > 0 && (this.direction === 8 || this.direction === 2)) {
            let isOK = true;
            for(let i=0; i<this.snake.length; i++) {
                if(this.snake[i][0] === 0 && this.snake[i][1] >= 30) {
                    isOK = false;
                }
            }
            if(this.apple[0] > this.snake[0][0] && isOK) {
                this.direction = 4;
            }
        }

        for(let i=this.snake.length-1; i>0; i--) {
            this.snake[i][0] = this.snake[i-1][0];
            this.snake[i][1] = this.snake[i-1][1];
        }

        if(tail.length > 0) {
            this.snake.push(tail);
        }

        if(this.direction === 8) {
            this.snake[0][1]--;
        } else if(this.direction === 2) {
            this.snake[0][1]++;
        } else if(this.direction === 4) {
            this.snake[0][0]--;
        } else {
            this.snake[0][0]++;
        }

        if(this.snake[0][1] === this.apple[1] && this.snake[0][0] > this.apple[0] && this.snake[0][1] < 30 && this.snake[0][1] !== 0) {
            // for(let i=this.apple[0]; i<this.snake[0][0]-1; i++) {
            //     for(let j=this.apple[0]; j<this.snake[0][1]; j++) {
            //         let isOK = true;
            //         for(let k=0; k<this.snake.length; k++) {
            //             if(this.snake[k][0] === i && this.snake[k][1] === j) {
            //                 isOK = false;
            //                 break;
            //             }
            //         }
            //         if(isOK) {
            //             this.fasterWay = true;
            //             this.direction = 4;
            //         }
            //     }
            // }
            let isOK = true;
            for(let i=0; i<this.snake.length; i++) {
                if(this.snake[i][0] === 0 && this.snake[i][1] >= 30) {
                    isOK = false;
                }
            }
            if(isOK) {
                this.fasterWay = true;
                this.direction = 4;
            }
            
        }



        if(!this.fasterWay) {
            if(this.direction === 4 && this.snake[0][1] === 0) {
                this.direction = 2;
            }
            if(this.direction === 8 && this.snake[0][1] === 0) {
                this.direction = 4;
            }
            if(this.direction === 4 && this.snake[0][1] === 30) {
                this.direction = 8;
            }
            if(this.direction === 2 && this.snake[0][1] === 30) {
                this.direction = 4;
            }
            if(this.snake[0][0] === 0 && this.snake[0][1] === 30) {
                this.direction = 2;
            }
            if(this.snake[0][0] === 0 && this.snake[0][1] === 31) {
                this.direction = 6;
            }
            if(this.snake[0][0] === 31 && this.snake[0][1] === 31) {
                this.direction = 8;
            }
            if(this.direction === 4 && this.snake[0][0] === 0) {
                this.direction = 2;
            }
        }
        
    }

    generateNewApple() {
        let avaiablePositions = [];

        for(let i=0; i<32; i++) {
            for(let j=0; j<32; j++) {
                let isOK = true;
                for(let k=0; k<this.snake.length; k++) {
                    if(this.snake[k][0] === i && this.snake[k][1] === j) {
                        isOK = false;
                        break;
                    }
                }
                if(isOK) {
                    avaiablePositions.push([i, j]);
                }
            }
        }

        if(avaiablePositions.length === 0) {
            noLoop();
        } else {
            this.apple = avaiablePositions[Math.floor(Math.random()*avaiablePositions.length)];
        }
    }

    isGameOver() {
        for(let i=1; i<this.snake.length; i++) {
            if(this.snake[i][0] == this.snake[0][0] && this.snake[i][1] == this.snake[0][1]) {
                alert("GAME OVER" + i);
                return true;
            }
        }
        return false;
    }
}