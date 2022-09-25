// This will keep count of the current problem number and output it
function problemNumber(num)
{
    let prob = "Problem " + String(num) + ": ";
    document.getElementById("problem").innerHTML = prob;
}

// This will display the timer that will count from a number to 0
function timer(probNum)
{
    let time, tLess;

    // Calculates the time it should be based on the problem number
    time = 11;
    tLess = Math.floor((probNum - 1) / 10);
    if (tLess > 7)
    {
        tLess = 7;
    }
    time -= tLess;

    // Displays the starting time (ex. Timer: 10)
    time -= 1;
    document.getElementById("timer").innerHTML = "Timer: " + String(time);

    /* This global variable allows the function within it to tick down every 
    second. "window" makes it a global variable that can be called anywhere. */ 
    window.Tim = setInterval(function(){   // setInterval() iterates this
        time -= 1;                      // function until timeLeft hits 0
        document.getElementById("timer").innerHTML = "Timer: " + String(time);
    
        if (time <= 0)
        {   // Time reaching 0 calls the gameOver() function
            gameOver(probNum);
        }
    }, 1000);
}   /* Use of setInterval() retrieved from: 
    https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown */

// This will end the game and show the Game Over Screen
function gameOver(probNum)
{
    alert("Game Over!");

    // This will end the global variable timer, which is necessary when the game ends
    clearInterval(Tim);

    // Clears the elements that shouldn't be seen in the Game Over Screen
    document.getElementById("header").innerHTML = "";
    document.getElementById("section").innerHTML = "";
    document.getElementById("choice").innerHTML = "";
    /* Trick retrived from: 
    https://stackoverflow.com/questions/3450593/how-do-i-clear-the-content-of-a-div-using-javascript */

    /* This block of code displays the content for the Game Over Screen. 

    Using getElementById() allows the code to change
    information about an elements Id, including style */
    document.getElementById("retry").disabled = false;

        // Game Over! text
    document.getElementById("gameOver").innerHTML = "GAME OVER!";

        // Problem that the player ended at
    document.getElementById("score").innerHTML = "You got up to:<br>Problem " + String(probNum);

        // Retry button and it's border
    document.getElementById("retry").innerHTML = "Retry?";
    document.getElementById("retry").style.backgroundColor = "royalblue";
    document.getElementById("retry").style.border = "4px solid silver";
    document.getElementById("retry").style.padding = "20px 50px";

        // The Game Over Screen's border
    document.getElementById("overScreen").style.border = "5px dashed silver";
    document.getElementById("overScreen").style.display = "inline-block";
}

// This will create a random equation for the player to answer
function randomEquation()
{
    let num1, num2, oper, ans;
    let oSign = "", rEqu = "";
    let canDivide = true;
    
    // The two numbers for the equation ranging up to 12
    num1 = Math.floor(Math.random() * 13);
    num2 = Math.floor(Math.random() * 13);

    // The possible operator for the equation
    oper = Math.floor(Math.random() * 4);

    if (oper != 3)
    {   // These are the possible operations
        if (oper == 0)
        {
            ans = num1 + num2;
            oSign = " + ";
        }
        else if (oper == 1)
        {
            ans = num1 - num2;
            oSign = " - ";
        }
        else if (oper == 2)
        {
            ans = num1 * num2; 
            oSign = " × ";
        }
    }

    else if (oper == 3)
    {   // Division may make numbers with decimals, which wouldn't be good
        canDivide = false;

        // This will loop until it finds numbers that can be divided
        while (!canDivide){
            ans = num1 / num2;

            if (ans % 1 == 0)
            {   // This will check whether the two numbers result a whole number
                canDivide = true;
                oSign = " ÷ ";
            }

            else
            {   // Range up to 20 ensures better chance for divison
                num1 = Math.floor(Math.random() * 21);
                num2 = Math.floor(Math.random() * 20 + 1);  // To prevent ÷ 0
            }
        }
    }

    // Fuses the numbers and operator to make an equation to output
    rEqu = String(num1) + oSign + String(num2);
    document.getElementById("equation").innerHTML = rEqu;

    return ans;
}

// This will create the random choices for the four buttons
function randomChoices(answer)
{
    let rAns, choice, cOper;
    const allChoices = [];
    let ansBut = "", oBut = "";

    // Randomly chooses which button will have the answer
    rAns = Math.floor(Math.random() * 4);
    choice = answer; // Making choice equal to the answer will help later

    // Displays the answer onto the chosen button
    ansBut = "b" + String(rAns);
    document.getElementById(ansBut).innerHTML = String(answer);

    for (let i = 0; i < 4; i++) {
        allChoices[i] = choice;

        if (i != rAns)
        {
        // These loops are used to make sure there won't be any repeating choices
            for (let j = 0; j < allChoices.length; j++) 
            {
                while (allChoices[j] == choice) 
                {   /* Checks whether the chosen number "choice" hasn't been used yet
                    in the array. If it has, it will pick another and check again */
                    j = 0;

                    // Anchoice random number and operation to use
                    choice = Math.floor(Math.random() * 10 + 1);
                    cOper = Math.floor(Math.random() * 2);

                    if (cOper == 0)
                    {
                        choice += ans;
                    }
                    else if (cOper == 1)
                    {
                        choice -= ans;
                    }
                }
            }   /* Use of Arrays retrived from: 
            https://www.w3schools.com/js/js_arrays.asp */

            // Displays each separate button with their choice
            oBut = "b" + String(i);
            document.getElementById(oBut).innerHTML = String(choice);
        }
    }

    // Returns the index of the button with the correct answer
    return ansBut;
}

// This will check whether the chosen button is correct or wrong
function checkAnswer(butIndex, ansIndex, probNum)
{   
    // butIndex is the Id of the button that was clicked
    if (butIndex != ansIndex)
    {
        gameOver(probNum);
    }
    else if (butIndex == ansIndex)
    {
        clearInterval(Tim);
        mathMadness();
    }
}

// Alert message to prepare the player
alert("Press OK to Start!");

// Using getElementById() again to change style
document.getElementById("equation").style.border = "5px dashed silver";
document.getElementById("b0").style.border = "4px solid silver";
document.getElementById("b1").style.border = "4px solid silver";
document.getElementById("b2").style.border = "4px solid silver";
document.getElementById("b3").style.border = "4px solid silver";

/* Variables to be used in the game. They can also be called in the HTML.
It's usable within the preceding function because the function is a sub-block */
let ans = 0, pNum = 0;
let aIndex = "";

// This function is the game. It allows the game to progress
function mathMadness()
{
    pNum++;
    problemNumber(pNum);
    
    ans = randomEquation();
    
    timer(pNum);
    
    aIndex = randomChoices(ans);
}

// This starts the whole game
mathMadness();
