let vehicle_status = {};
let vehicle_status_sort = []

function updateStatus(data){
    vehicle_status[data["unit_id"]] = data;

    vehicle_status_sort = Object.keys(vehicle_status)
    vehicle_status_sort.sort((first, second) =>{
        return parseInt(vehicle_status[first]["unit_short"].replace("/", "")) - parseInt(vehicle_status[second]["unit_short"].replace("/", ""))
    })
    renderStatus()
}

function renderStatus(){
    $(".status").empty()
    vehicle_status_sort.forEach(ele => {
        let stati = $("<div></div>").text(vehicle_status[ele]["unit_short"] + ": " + vehicle_status[ele]["status_id"]).addClass("status-" + vehicle_status[ele]["status_id"]);
        $(".status").append(stati)
    })
}