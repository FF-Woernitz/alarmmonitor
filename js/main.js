let mqtt_client;
$(document).ready(function () {
    setStandbyDisplay()

    mqtt_client = mqtt.connect(MQTT_URL, MQTT_OPTIONS);

    mqtt_client.on('connect', function () {
        mqtt_client.subscribe(MQTT_PATH + '/data');
        mqtt_client.subscribe(MQTT_PATH + '/vehicle-status/+');

        heartbeat()
        setInterval(heartbeat, 10000);
    })

    mqtt_client.on('message', function (topic, message) {
        if(topic === MQTT_PATH + '/data') {
            onMqttMessage(JSON.parse(message.toString()));
        } else {
            onMqttStatusMessage(JSON.parse(message.toString()))
        }
    })
});

function heartbeat(){
    mqtt_client.publish(MQTT_PATH + '/heartbeat', String(Math.floor(new Date() / 1000)));
}

let loop = null;
let alerttime = new Date();

function setAlertDisplay(data) {
    clearInterval(loop);
    setAlertData(data);
    loopAlert();
    $("#standby_div").hide();
    $("#alert_div").show();
    loop = setInterval(loopAlert, 1000);
    check_height();
    setTimeout(check_height, 2000); // Dirty Fix
}

function setAlertData(data){
    try {
        $("#catchword").text(data["keyword"]);
        $("#remark").text(data["message"]);
        $("#location").text(data["location"]["address"]);
        alerttime = new Date(data["timestamp"]);
        alert_start_time();
        $("#map").attr("src", "lib/render_map.html?lat=" + data["location"]["coordinate"]["lat"] + "&lon=" + data["location"]["coordinate"]["lon"]);
    } catch (e){
        console.error("oh shit!");
        console.error(e);
    }
}

function loopAlert() {
    renderDate("date_alert");
    renderTime("time_alert");
    alert_time();
}

function setStandbyDisplay() {
    clearInterval(loop);
    loopStandby();
    $("#alert_div").hide();
    $("#standby_div").show();
    loop = setInterval(loopStandby, 1000);
    check_height();
    setTimeout(check_height, 2000); // Dirty Fix
}

function loopStandby() {
    renderDate("date_standby");
    renderTime("time_standby");
}

function check_height() {
    $("#div_maps").height((window.innerHeight - $("#location")[0].getBoundingClientRect().bottom) - 15);
}


function onMqttMessage(msg) {
    if (msg["alert"] && !msg["test"]) {
        setAlertDisplay(msg);
    } else {
        setStandbyDisplay();
    }
}

function onMqttStatusMessage(msg){
    updateStatus(msg)
}