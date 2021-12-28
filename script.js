var socket = io.connect("localhost", { transports: ["websocket"] });
var allServers;
var savedIndex = -1;
var lastUUID = "";

socket.on("message", function (message) {
    console.log("Server: " + message);
    lastUUID = document.cookie.slice(9);
});

socket.on("renxData", function (rawdata) {
    allServers = rawdata;

    var x = document.getElementById("serverNames");
    x.length = 0;

    for (const server in allServers) {
        var option = document.createElement("option");
        option.text =
            allServers[server].Name +
            ` (${allServers[server].Players}/${allServers[server]["Variables"]["Player Limit"]})`;
        option.value = allServers[server].UUID;
        x.add(option);
    }

    if (lastUUID != "") {
        document.getElementById("serverNames").selectedIndex =
            allServers.findIndex((e) => e.UUID == lastUUID);
    }
});

function setBG(map) {
    switch (map) {
        case "Field":
            map = "https://i.ibb.co/cYP8pNg/field1.png";
            break;
        case "Canyon":
            map = "https://i.ibb.co/Cv17WX4/canyon3.png";
            break;
        case "Lakeside":
            map = "https://i.ibb.co/hW1nNk3/lakeside4.png";
            break;
        case "Mesa":
            map = "https://i.ibb.co/WkBnrYG/mesa2.png";
            break;
        case "Complex":
            map = "https://i.ibb.co/DWwbLFr/complex1.png";
            break;
        case "Snow":
            map = "https://i.ibb.co/BLqft0R/snow1.png";
            break;
        case "Under":
            map = "https://i.ibb.co/CVnNX2Y/under3.png";
            break;
        case "Islands":
            map = "https://i.ibb.co/YtL80RM/islands1.png";
            break;
        case "XMountain":
            map = "https://i.ibb.co/0Y8VGLB/xmountain2.png";
            break;
        case "Whiteout":
            map = "https://i.ibb.co/TqpZq4s/whiteout2.png";
            break;
        case "GoldRush":
            map = "https://i.ibb.co/Tc8w3yQ/goldrush1.png";
            break;
        case "Field X":
            map = "https://i.ibb.co/rwkWPpK/fieldx1.png";
            break;
        case "Crash Site":
            map = "https://i.ibb.co/2dkWSP4/crashsite1.png";
            break;
        case "Islands":
            map = "https://i.ibb.co/6NLNjpy/islands3.png";
            break;
        case "Walls":
            map = "https://i.ibb.co/gFKBvcj/walls4.png";
            break;
        default:
            map = "https://i.ibb.co/cYP8pNg/field1.png";
    }

    document.getElementById("back").style.backgroundImage = `linear-gradient(
          rgba(0, 0, 0, 0.45),
          rgba(0, 0, 0, 0.45)
          ),
          /* your image */
          url('${map}')`;
}

function setInfo() {
    var selectedServer;

    if (!allServers) return;

    selectedServer =
        allServers[document.getElementById("serverNames").selectedIndex];
    serverTitle.innerHTML = selectedServer.Name;
    minPlayerCount.innerHTML = selectedServer.Players;
    botCount.innerHTML = selectedServer.Bots;
    mapName.innerHTML = selectedServer["Current Map"]
        .slice(selectedServer["Current Map"].indexOf("-") + 1)
        .replaceAll("_", " ");
    maxPlayerCount.innerHTML =
        "/ " + selectedServer["Variables"]["Player Limit"];
    totalCount.innerHTML =
        "Total: " +
        parseInt(selectedServer.Players + parseInt(selectedServer.Bots));
    lastUUID = selectedServer.UUID;
    document.cookie = "lastuuid=" + lastUUID + ";secure";
    document.title = `${selectedServer.Name} - ${mapName.innerHTML} (${selectedServer.Players} ${maxPlayerCount.innerHTML})`;

    setBG(
        selectedServer["Current Map"]
            .slice(selectedServer["Current Map"].indexOf("-") + 1)
            .replaceAll("_", " ")
    );

    var nodlist = document.getElementById("nodlist");
    nodlist.innerHTML = "";

    for (const player in selectedServer["PlayerList"]) {
        var node = document.createElement("LI");
        var textnode = document.createTextNode(
            selectedServer["PlayerList"][player].Name
        );
        node.appendChild(textnode);
        nodlist.appendChild(node);
    }
}

setInterval(setInfo, 100);
