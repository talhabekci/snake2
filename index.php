<?php
header("Access-Control-Allow-Origin: *");

$scoresLink = "https://snake-game-api.herokuapp.com/users";

$scores = file_get_contents($scoresLink);

$data = json_decode($scores, TRUE);

?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title></title>
        <link href="https://fonts.googleapis.com/css?family=Antic+Slab" rel="stylesheet">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    </head>
    <style>
        body{
            background-color: black;
        }
        #gameCanvas{
            z-index: -1;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        #gameOver{
            font-size: 50px;
            color:rgb(126, 15, 15);
            text-align: center;
        }

        .newGameBtn{
            width:550px;
            z-index: 99;
            margin-top: 660px;
            margin-left: 625px;
            text-align: center;
            border:none;
            padding: 15px;
            background-color:#ddbea9;
            color: black;
            font-size: 16px;
            font-weight: bold;
            border-radius: 8px;
        }

        .newGameBtn:hover{
            cursor: pointer;
            background-color:#cb997e;
        }

        .scoreBrd{
            color:aqua;
            width:300px;
            text-align: center;
        }

        #scoreBoard{
            position: fixed;
            display:inline-block;
            margin-left: 100px;
            margin-top: 50px;
        }

        #userInfo{
            display: inline-block;
            color: red;
        }

        #gameBoard{
            position:fixed;
            width:600px;
            height:600px;
            display:inline-block;
            margin-left: 600px;
            margin-top: 50px;
        }

        #score{
            color: black;
            font-size: 70px;
            text-align: center;
        }
    </style>
    <body>
        <script type="text/javascript">
            // fetch('http://localhost:3000/users/')
            // .then(response => response.json())
            // .then(data => var score = data)
        </script>
        <div id="gameBoard">
            <div id="score">0</div>
            <div id="gameOver"></div>
            <canvas id="gameCanvas" width="400" height="400"></canvas>
        </div>
        <div id="scoreBoard">
            <table id="scrBrd" class="scoreBrd" border="1">
                <tr>
                    <td style="color:#c1121f; font-size:20px;" colspan="2"><b>Score Board</b></td>
                </tr>
                <tr>
                    <td style="color:#f07167; font-size:18px;">User Name</td>
                    <td style="color:#f07167; font-size:18px;">Score</td>
                </tr>
                <tr>
                    <td><?php echo json_encode($data[0]["userName"]); ?></td>
                    <td><?php echo json_encode($data[0]["score"]); ?></td>
                </tr>
            </table>
        </div>
        <div id="userInfo">
            <div id="userName"></div>
            <div id="userScore"></div>
        </div>
        <script src="index.js"></script>
    </body>
</html>
