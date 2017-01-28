$(document).ready(function() {
  var nInt1;
  var nInt2;
  var sessMin = 25;
  var second = 60;
  var brMin = 5;
  var brSec = 60;
  var breakTime;
  var timerOff = true;
  var newMin;
  var buzzer = $("#buzzSound")[0];

  //decrease session length
  $('#timerMinus').click(function() {
    if (sessMin > 1 && timerOff) {
      sessMin -= 1;
      $('#timerNum').html(sessMin);
      if (sessMin > 9) {
        $('#clockArea').html(sessMin + ':' + '00');
      } else {
        $('#clockArea').html('0'+ sessMin + ':' + '00');
      }
      newMin = sessMin;
      second = 60;
    }
  });
  
  //increase session length
  $('#timerPlus').click(function() {
    if (timerOff) {
      sessMin += 1;
      $('#timerNum').html(sessMin);
      if (sessMin > 9) {
        $('#clockArea').html(sessMin + ':' + '00');
      } else {
        $('#clockArea').html('0'+ sessMin + ':' + '00');
      }
      newMin = sessMin;
      second = 60;
    }
  });

  //decrease break length
  $('#breakMinus').click(function() {
    if (brMin > 1 && timerOff) {
      brMin -= 1;
      $('#breakNum').html(brMin);
      breakTime = brMin;
      brSec = 60;
    }
  });
  
  //increase break length
  $('#breakPlus').click(function() {
    if (timerOff) {
      brMin += 1;
      $('#breakNum').html(brMin);
      breakTime = brMin;
      brSec = 60;
    }
  });

  //break session
  function breakSession() {
    nInt2 = setInterval(brTimeMin, 1000);
  }
  //changing time for break session
  function brTimeMin() {
    var brkMinDisp;
    var brkSecDisp;
    if (brSec === 0) {//break second reaches zero
      brSec = 60;
    }
    if (brSec === 60) {//break second reaches zero
      brMin -= 1;//make minute one less
    }
    brSec -= 1;//decrease second
    $('#annBrk').html('Break Time!');//display break announcement
    brkMinDisp = brMin > 9 ? brMin+'' : '0'+brMin;
    brkSecDisp = brSec > 9 ? brSec+'' : '0'+brSec;
    $('#clockArea').html(brkMinDisp + ':' + brkSecDisp);//display break time
    $('#clockArea').css('color','red');//make it red
    if (brMin === 0 && brSec === 0) {//when it gets zero
      buzzer.play();//play the sound
      $('#clockArea').html('');
      $('#annBrk').html('');
      clearInterval(nInt2);//close timer
      brMin = breakTime;
      sessMin = newMin;
      session(); //play session time
    }
  }

  //play/pause button is clicked
  $('#playPause').click(function() {
    if (timerOff) { //when timer is off
      if (sessMin === 0 && second === 0) { //session without time
        breakSession();//play break session
      } else {
        session(); //start session time
      }

      timerOff = false; 
    } else if (!timerOff) {//when time is on
      if (sessMin === 0 && second === 0) {//at break time
        clearInterval(nInt2)//pause break timer
      } else {
        clearInterval(nInt1); //pause session timer
      }

      timerOff = true;
    }
  });
  
  //play session timer 
  function session() {
    $('annBrk').html('');
    nInt1 = setInterval(changeseconds, 1000);
  }
  
  //change time for sesssion
  function changeseconds() {
    var sessSecDisp;
    var sessMinDisp;
    if (second === 0) {//when second reaches zero
      second = 60;//make it 60
    }
    if (second === 60) {//when second is 60
      sessMin = sessMin - 1;//decrease minute
    }
    second = second - 1;//decrease second
    sessMinDisp = sessMin > 9 ? sessMin+'' : '0'+sessMin;
    sessSecDisp = second > 9 ? second+'' : '0'+second;
    $('#clockArea').html(sessMinDisp + ':' + sessSecDisp);
    $('#clockArea').css('color','#005800');
    if (sessMin === 0 && second === 0) {//session timer ends
      buzzer.play();  //play the sound
      clearInterval(nInt1);//clear out timer
      breakSession();//turn on break timer
      final();
    }
  }

  //reset timer
  $('#resetBtn').click(function() {
    clearInterval(nInt1);
    clearInterval(nInt2);
    sessMin = 25;
    second = 60;
    brMin = 5;
    brSec = 60;
    timerOff = true;
    $('#timerNum').html(sessMin);
    if (sessMin > 9) {
      $('#clockArea').html(sessMin + ':' + '00');
    } else {
      $('#clockArea').html('0'+ sessMin + ':' + '00');
    }
    $('#clockArea').css('color','#005800');
    $('#breakNum').html(brMin);
    $('annBrk').html('');
  });
  
  function final(){//empty out the content
    $('#clockArea').html('');
    $('annBrk').html('');
  }
  
});