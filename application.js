$document.ready(function() { 
    var target = Math.floor(Math.random()*99+1); //Global var, generates a number between 1 and 100.
    function initialize() {
        $('#submit').click(function() {
            submit();
        });
    };
    function submit() {
        var guess = $("#guess_number").val(); //Global var, asks user for a guess.
        compare(guess);
    }
    function compare(guess) {
        var number = Number(guess);
        if (isNaN(number)) {  // if the user input is not a valid number, prompts user for a new guess.
            $("#response").html("Please enter a number.");
            return;       
        } else if (number === target) {  // if the user guesses the target number, return statement.
            $("#response").html("Congrats! You got it!");
            return;
        } else {                       // if user guesses wrong, invoke difference method to determine hot or cold.
            return difference(number);
        }
    }; 


    function difference(num) {  // determines how big of difference between user guess and target number.
        var diff = Math.abs(num-target);
        if(diff < 10) {
            $("#response").html("Hot!");
            return;
        } else {
            $("#response").html("Cold.");
            return;
        }
    };
});  