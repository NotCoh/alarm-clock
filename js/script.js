function Time(){
    getCurrentTime();
    
    getAwakeTime();
    if (getAwakeTimeInSeconds()>86400){
        window.alert('i cant set clock for more than 24 hours :(')
        document.getElementById('hours').value ="";
        document.getElementById('minutes').value ="";
        document.getElementById('seconds').value ="";
        return
    }
    setAwakeTime();
    console.log(setAwakeTime());
    
    createTimer()
    startTimer(getAwakeTimeInSeconds() ,document.getElementById(idCounter));
    document.getElementById('hours').value ="";
    document.getElementById('minutes').value ="";
    document.getElementById('seconds').value ="";
}



function getCurrentTime(args){
    
    const currentTime = {
        'hours' : new Date().getHours(),
        'minutes' : new Date().getMinutes(),
        'seconds' : new Date().getSeconds()
    }
    return currentTime;

    
}

function getAwakeTime(args){  
    const awakeTime = {
    'hours' : parseInt(document.getElementById('hours').value),
    'minutes' : parseInt(document.getElementById('minutes').value),
    'seconds' : parseInt(document.getElementById('seconds').value)
    }
    for (var i in awakeTime){
        if (isNaN(awakeTime[i]) ){
            awakeTime[i] = 0
              
        } 
    }
    return awakeTime;
    
    
    
}
function getAwakeTimeInSeconds(args){  
    const currentTime = getCurrentTime().hours*3600 + getCurrentTime().minutes*60 + getCurrentTime().seconds,
    awakeTime = getAwakeTime().hours*3600 + getAwakeTime().minutes*60 + getAwakeTime().seconds ;
    if (awakeTime < currentTime){
        timeDifference = 24*3600-currentTime+awakeTime;
    }
    else{
        timeDifference = awakeTime-currentTime;
    }
    
    return timeDifference;
    
    
    
}

function setAwakeTime(args) {

    const currentTime = getCurrentTime().hours*3600 + getCurrentTime().minutes*60 + getCurrentTime().seconds,
    awakeTime = getAwakeTime().hours*3600 + getAwakeTime().minutes*60 + getAwakeTime().seconds ;
    if (awakeTime < currentTime){
        timeDifference = 24*3600-currentTime+awakeTime;
    }
    else{
        timeDifference = awakeTime-currentTime;
    }
    const translatedTime = {
        "hours" : (this.timeDifference - this.timeDifference%3600)/3600,
        "minutes" : (this.timeDifference%3600-this.timeDifference%3600%60)/60,
        'seconds' : this.timeDifference%3600%60
    }
    return translatedTime    
}
idCounter = 0
function createTimer(args) {
    targetList = document.getElementsByClassName('clocks')[0];
    idCounter++
    targetList.insertAdjacentHTML(`afterbegin`,`<li id=${idCounter}>`)

    li = document.getElementById(idCounter)

}
function startTimer(duration,display) {
    var timer = duration, hours, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        hours = (duration - duration%3600)/3600;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        if (minutes>=60){
            minutes%=60;
        }
        hours = hours <10 ? "0" + hours : hours;

        display.textContent = hours + ":" +  minutes + ":" + seconds; //

        if (--timer < 0) {
            timer = duration;
            
            const anim = document.body.classList.add('alarm')
            var audio = new Audio('../audio/alarm.mp3');
            audio.play();
        }
    }, 1000);
}

