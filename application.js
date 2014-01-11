$(document).ready(function() { 
    
    var target = Math.floor(Math.random()*99+1); //Global var, generates a number between 1 and 100.
    console.log(target);
    var previousDiff = 0; //Previous difference, initially set to 0.

    
    function submit() {  //Function that will obtain a guess from user input and initiate compare function.
        var guess = $("#guess_number").val(); 
        compare(guess);
        $('#guess_number').val('');
    }
    function compare(guess) {  //Function that first validates the input number and then compare it with the target number.
        var number = Number(guess.trim());
        if (isNaN(number) || guess=== "" || guess === " " || (number - Math.floor(number) !== 0)) {  //If the user input is not a valid number, prompts user for a new guess.
            $("#response").html("Please enter a whole number.").css({color: 'red'});  
        } else if (number > 100 || number < 1) {  //Display error if input number is not between 1 and 100.
            $("#response").html("Nope, how about a whole number between 1 and 100?").css({color: 'red'});
        } else if (number === target) {  //If the user guesses the target number, return statement.
            $("#response").html("Congrats! You got it!").css({color: 'red'});
            $("#progressBar").progressbar({value: 100}).children().css({background: '#CC0000'});
        } else {                       //If user guesses wrong, invoke difference method to determine hot or cold.
            return difference(number);
        }
    }; 


    function difference(num) {  //Determines how big of difference between user guess and target number.
        var diff = Math.abs(num-target);
        if((diff <= 5) && (previousDiff === 0)) { //First guess hot, sets previousDiff. 
            previousDiff = diff;
            $("#response").html("Hot!").css({color: 'black'});
            $("#progressBar").progressbar({value: 95}).children().css({background: '#FF0000'});
        } else if ((diff <= 5) && (previousDiff !== 0)) { //Non-first guess hot.
            $("#response").html("Hot!" + lastDiff(diff)).css({color: 'black'});
            $("#progressBar").progressbar({value: 95}).children().css({background: '#FF0000'});
        } else if ((diff > 5 && diff <= 15) && (previousDiff === 0)) { //First guess very warm, sets previousDiff.
            previousDiff = diff;
            $("#response").html("Very warm.").css({color: 'black'});
            $("#progressBar").progressbar({value: 80}).children().css({background: '#FF3300'});
        } else if ((diff > 5 && diff <= 15) && (previousDiff !== 0)) { //Non-first guess very warm.
            $("#response").html("Very warm." + lastDiff(diff)).css({color: 'black'});
            $("#progressBar").progressbar({value: 80}).children().css({background: '#FF3300'});
        } else if ((diff > 15 && diff <= 30) && (previousDiff === 0)) { //First guess warm, sets previousDiff.
            previousDiff = diff;
            $("#response").html("Warm.").css({color: 'black'});
            $("#progressBar").progressbar({value: 60}).children().css({background: '#FF6600'});
        } else if ((diff > 15 && diff <= 30) && (previousDiff !== 0)) { //Non-first guess warm.
            $("#response").html("Warm." + lastDiff(diff)).css({color: 'black'});
            $("#progressBar").progressbar({value: 60}).children().css({background: '#FF6600'});
        } else if ((diff > 30 && diff <= 45) && (previousDiff === 0)) { //First guess cold, sets previousDiff.
            previousDiff = diff;
            $("#response").html("Cold.").css({color: 'black'});
            $("#progressBar").progressbar({value: 40}).children().css({background: '#0099FF'});
        } else if ((diff > 30 && diff <= 45) && (previousDiff !== 0)) { //Non-first guess cold.
            $("#response").html("Cold." + lastDiff(diff)).css({color: 'black'});
            $("#progressBar").progressbar({value: 40}).children().css({background: '#0099FF'});
        } else if ((diff > 45) && (previousDiff === 0)) { //First guess freezing, sets previousDiff.
            previousDiff = diff;
            $("#response").html("Freezing.").css({color: 'black'});
            $("#progressBar").progressbar({value: 20}).children().css({background: '#0066FF'});
        } else {  //Non-first guess everything else with difference of 45 or more.
            $("#response").html("Freezing." + lastDiff(diff)).css({color: 'black'});
            $("#progressBar").progressbar({value: 20}).children().css({background: '#0066FF'});
        }
    };

    function lastDiff(diff) { //Function that checks the current difference value with previous difference value to determine guesses getting hotter or colder.
        if (diff < previousDiff) {
            previousDiff = diff;
            return " Getting hotter!";
        } else if (diff > previousDiff) {
            previousDiff = diff;
            return " Getting colder!";
        } else {
            return " Same Number!";
        }

    };

    $(function() {  //Progress bar initiation.
        $("#progressBar").progressbar({value: 0});
    });

    $('#submit').click(function() {  //Upon submit button click, invoke submit function.
        submit();
    });

    $('#guess_number').keydown(function(event) { //Upon Enter key presses, invoke submit function.
        if (event.which === 13) {
            submit();
        }
    }); 

    $('#newGame').click(function(event) {  //Upon click button start new game with new target value and reset progress bar.
        event.preventDefault();
        target = Math.floor(Math.random()*99+1);
        previousDiff = 0;
        $("#progressBar").progressbar({value: 0});
        console.log(target);
        $("#response").html("New Game Started!").css({color: 'black'});
    });

});  

