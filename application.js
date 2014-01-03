$(document).ready(function() { 
    var target = Math.floor(Math.random()*99+1); //Global var, generates a number between 1 and 100.
    var previousDiff = 0; //previous difference, initially set to 0.

    function submit() {
        var guess = $("#guess_number").val(); 
        compare(guess);
    }
    function compare(guess) {
        var number = Number(guess.trim());
        if (isNaN(number) || guess=== "" || guess === " " || (number - Math.floor(number) !== 0)) {  // if the user input is not a valid number, prompts user for a new guess.
            $("#response").html("Please enter a whole number.").css({color: 'red'});
            return;       
        } else if (number > 100 || number < 1) {
            $("#response").html("Nope, how about a whole number between 1 and 100?").css({color: 'red'});
        } else if (number === target) {  // if the user guesses the target number, return statement.
            $("#response").html("Congrats! You got it!").css({color: 'black'});
            return;
        } else {                       // if user guesses wrong, invoke difference method to determine hot or cold.
            return difference(number);
        }
    }; 


    function difference(num) {  // determines how big of difference between user guess and target number.
        var diff = Math.abs(num-target);
        if((diff <= 10) && (previousDiff === 0)) {
            previousDiff = diff;
            $("#response").html("Hot!").css({color: 'black'});
            return;
        } else if ((diff <= 10) && (previousDiff !== 0)) {
            lastDiff(diff);
            return;
        } else if ((diff > 10) && (previousDiff === 0)) {
            previousDiff = diff;
            $("#response").html("Cold.").css({color: 'black'});
            return;
        } else {
            lastDiff(diff);
            return;
        }
    };

    function lastDiff(diff) {
        if (diff < previousDiff) {
            previousDiff = diff;
            $("#response").html("Getting hotter!").css({color: 'black'});
        } else if (diff > previousDiff) {
            previousDiff = diff;
            $("#response").html("Getting colder!").css({color: 'black'});
        } else {
            $("#response").html("Different # Please!").css({color: 'red'});
        }

    };
    
    $('#submit').click(function() {
        submit();
    });
    $('#newGame').click(function(event) {
        event.preventDefault();
        target = Math.floor(Math.random()*99+1);
        $("#response").html("New Game Started!").css({color: 'black'});
    });

});  

