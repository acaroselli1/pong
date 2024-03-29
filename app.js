var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
canvas.height = window.innerHeight
canvas.width = window.innerWidth;
var circleX = canvas.width / 2;
var circleY = canvas.height / 2;
var paddle1X = 0;
var paddle1Y = canvas.height / 2 - 100;
var paddle2X = canvas.width - 40;
var paddle2Y = canvas.height / 2 - 100;
var left = true;
var player1Score = 0;
var player2Score = 0;
var speedX = 10;
var speedY = 2;


drawScreen = () => {
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScore1();
    drawScore2();
    drawBall();
    drawPaddle1();
    paddle2X = canvas.width - 40;
    drawPaddle2();
}

drawBall = () => {

    ctx.beginPath();
    ctx.arc(circleX, circleY, 20, 0, Math.PI * 2);
    ctx.strokeStyle = "white"
    ctx.stroke();
    ctx.fillStyle = "white"
    ctx.fill();
}

drawPaddle1 = () => {
    ctx.beginPath();
    ctx.rect(paddle1X, paddle1Y, 40, 200);
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.fill();
}

drawPaddle2 = () => {
    ctx.beginPath();
    ctx.rect(paddle2X, paddle2Y, 40, 200);
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.fill();
}

drawScore1 = () => {
    ctx.font = "30px Arial";
    ctx.strokeStyle = "white";
    if (player1Score > player2Score) {
        ctx.fillStyle = "white";
        ctx.fillText(player1Score, canvas.width / 4, canvas.height / 4);
    } else {
        ctx.strokeText(player1Score, canvas.width / 4, canvas.height / 4);
    }
}

drawScore2 = () => {
    ctx.font = "30px Arial";
    ctx.strokeStyle = "white";
    if (player2Score > player1Score) {
        ctx.fillStyle = "white";
        ctx.fillText(player2Score, canvas.width * .75, canvas.height / 4);
    } else{
        ctx.strokeText(player2Score, canvas.width * .75, canvas.height / 4);
    } 
}


animateBall = () => {

    if (circleX < 21) {
        player2Score++;
        document.getElementById("score").play();
        drawScreen();
        circleX = canvas.width / 2;
        circleY = canvas.height / 2;
    }

    if (circleX > canvas.width + 21) {
        document.getElementById("score").play();
        player1Score++;
        drawScreen();
        circleX = canvas.width / 2;
        circleY = canvas.height / 2;
    }

    if (circleY + speedY > canvas.height - 20 || circleY + speedY < 20) {
        document.getElementById("hit-wall").play();
        speedY = -speedY;
    }
    if (circleY > paddle2Y - 20 && circleY < paddle2Y + 221 && ((canvas.width - circleX <= 71) && (canvas.width -circleX >= 60))) {
        document.getElementById("hit-sound").play();
        speedX = -speedX;
    }
    if (circleY > paddle1Y - 20 && circleY < paddle1Y + 221 && (circleX <= 71 && circleX >= 60)) {
        document.getElementById("hit-sound").play();
        speedX = -speedX;
    }

    circleX += speedX;
    circleY += speedY;


    // if (circleX > 60 && circleX - 10 > 60 && left
    //     || (!(circleY > paddle1Y - 20 && circleY < paddle1Y + 220) && circleX < 60)
    // ) {
    //     circleX -= 10;
    //     console.log("1st", circleX);

    // } else if (circleX - 10 < 60 && circleX != 60 && circleY > paddle1Y - 20 && circleY < paddle1Y + 220) {
    //     circleX -= circleX - 60
    //     console.log("2nd", circleX);
    //     left = false;

    // } else if (((canvas.width - circleX) - 10) > 60 && !left
    //     || (!(circleY > paddle2Y - 20 && circleY < paddle2Y + 220) && circleX > canvas.width - 70)
    // ) {
    //     console.log("Right", canvas.width, circleX)
    //     circleX += 10;
    //     // circleY += 3;

    // } else if (((canvas.width - circleX) - 10) <= 60 && !left) {
    //     circleX += canvas.width - circleX - 60;
    //     left = true;

    // }
    drawScreen();
    var test = requestAnimationFrame(animateBall)
}


window.addEventListener('load', animateBall);

window.addEventListener('load', drawBall);

movePaddle2 = (e) => {
    if (paddle2Y > 0 & e.wheelDelta > 0) {
        paddle2Y -= 20;
    } else if (paddle2Y < canvas.height - 220) {
        paddle2Y += 20;
    }
}
window.addEventListener('mousewheel', movePaddle2)


window.onresize = drawScreen;

window.onkeydown = (e) => {

    if (e.keyCode === 38) {
        // speedX++;
        // speedY++;
    }
    else if (e.keyCode === 40) {
        // speedX--;
        // speedY--;
    }
    else if (e.keyCode === 65 && paddle1Y > 20) {
        paddle1Y -= 20;
        console.log(paddle2Y, canvas.height);
    }
    else if (e.keyCode === 90 && paddle1Y < canvas.height - 220) {
        paddle1Y += 20;
        console.log(paddle2Y, canvas.height);
    }


}


