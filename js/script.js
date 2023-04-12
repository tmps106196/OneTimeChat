

console.log("Connecting..")
peer = new Peer();

const urlid = document.getElementById("urlid")

const urlidtest = document.querySelector(".urltest")

var url = location.href;
if(url.indexOf('?')!=-1)
{
    var ary1 = url.split('?');
    var ary2 = ary1[1].split('&');
    var ary3 = ary2[0].split('=');
    var idd = ary3[1];
    idd = idd.replace("#","");
    console.log(idd);
    urlidtest.style.display = "flex";
    urlid.innerHTML = idd
};


// when connection is created, handle the event - 
peer.on('open', function (id) {
    console.log('Connected to Signaling Server ID : ' + id);
    // set the input value
    var peerIDField = document.querySelector("#peerid")
    peerIDField.innerHTML = window.location.protocol + "//" + window.location.host + location.pathname + "?id=" +id
    document.getElementById("qrcode").src = "https://chart.googleapis.com/chart?cht=qr&chl=" + window.location.protocol + "//" + window.location.host + location.pathname + "?id=" +id + "&chs=200x200";
});

peer.on('connection', function (c) {
    conn = c
    console.log("New connection : ")
    document.getElementById("msg").style.cursor = "auto";
    document.getElementById("sendMessage").style.cursor = "auto";
    document.getElementById("msg").readOnly = false;
    console.log(conn)


    // handle message receive
    conn.on('open', function () {
        // Receive messages - receiver side
        conn.on('data', function (data) {
            console.log('Received', data);
            const audio = document.getElementById("audio-element");
            audio.currentTime = 0;
            audio.play();
            printMsg("對方 : " + data)
        });
    });
});

function sendMessage() {
    var msg = document.querySelector("#msg")
    
    console.log("sending message")
    // send message at sender or receiver side
    if (conn && conn.open) {
        printMsg("你 : " + msg.value)
    
        conn.send(msg.value);
        document.querySelector("#msg").value = ""
    }
}

function printMsg(msg) {
    var messages = document.querySelector("#messages")
    messages.innerHTML = messages.innerHTML + msg + "<br><br>"
}

function connect() {
    var fpeerIDField = idd
    console.log("connecting to " + fpeerIDField)
    conn = peer.connect(fpeerIDField);

    // open event called when connection gets created
    conn.on('open', function () {
        document.getElementById("msg").style.cursor = "auto";
        document.getElementById("sendMessage").style.cursor = "auto";
        document.querySelector(".urltest").style.display = "none";
        console.log("connected")
        document.getElementById("msg").readOnly = false;
        // Receive messages - sender side
        conn.on('data', function (data) {
            console.log('Received', data);
            const audio = document.getElementById("audio-element");
            audio.currentTime = 0;
            audio.play();
            printMsg("對方 : " + data)
        });
    });
}

peer.on('error', function(err){
    console.log(err)
    document.getElementById("err").innerHTML = (err)
    document.querySelector(".error").style.display = "flex";
})

document.querySelector(".close").addEventListener("click", function(){
    document.querySelector(".error").style.display = "none";
})

document.querySelector(".close2").addEventListener("click", function(){
    document.querySelector(".urltest").style.display = "none";
})

document.getElementById("ok").addEventListener("click", function(){
    document.querySelector(".error").style.display = "none";
})

document.getElementById("peerbox").addEventListener("click", function(){
    document.querySelector(".peer").style.display = "flex";
})

document.getElementById("close3").addEventListener("click", function(){
    document.querySelector(".peer").style.display = "none";
})