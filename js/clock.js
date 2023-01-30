/**
 * Created by TobsA13 on 03.10.2015.
 */

function renderTime(element) {
    var currentTime = new Date();
    var h = currentTime.getHours();
    var m = currentTime.getMinutes();
    var s = currentTime.getSeconds();
    if (h < 10) {
        h = "0" + h;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }
    $("#" + element).text(h + ":" + m + ":" + s)
}

function renderDate(element) {
    var ArrayTage = ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];
    var currentTime = new Date();
    var d = currentTime.getDate();
    var m = currentTime.getMonth() +1;
    var y = currentTime.getFullYear();
    if (d < 10) {
        d = "0" + d;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (y < 10) {
        y = "0" + y;
    }
    $("#" + element).text(ArrayTage[currentTime.getDay()] + ", " + d + "." + m + "." + y)
}

function alert_time(){
    var now = new Date();
    var alerttime_obj = alerttime;

    var diff = Math.floor((now - alerttime_obj) / 1000);

    var timestring = "";
    var m = Math.floor(diff / 60);
    if(m > 0){
        if(m > 9){
            timestring += m + ":";
        } else {
            timestring += "0" + m + ":";
        }
    }

    diff -= m * 60;
    var s = Math.floor(diff);
    if(s > 9){
        timestring += s;
    } else {
        timestring += "0" + s;
    }
    $("#alert-time").text(timestring + " seit Alarm");
    delete(now);
    delete(alerttime_obj);
}

function alert_start_time(){
    var h = alerttime.getHours();
    var m = alerttime.getMinutes();
    if (h < 10) {
        h = "0" + h;
    }
    if (m < 10) {
        m = "0" + m;
    }
    $("#alert-start").text(h + ":" + m)
}