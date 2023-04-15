

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
    urlhaveid()
};

var urll = ""
// when connection is created, handle the event - 
peer.on('open', function (id) {
    console.log('Connected to Signaling Server ID : ' + id);
    // set the input value
    var peerIDField = document.querySelector("#peerid")
    
    urll = window.location.protocol + "//" + window.location.host + location.pathname + "?id=" +id
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
    var msgbox = document.getElementById("msg")
    if(msgbox.style.cursor!="not-allowed"){
        console.log(msgbox.style.cursor);
        var msg = document.querySelector("#msg")
        if(msg.value == 0){
            postapace()
        }
        else{
            console.log("sending message")
            // send message at sender or receiver side
            if (conn && conn.open) {
                printMsg("你 : " + msg.value)
    
                conn.send(msg.value);
                document.querySelector("#msg").value = ""  
    }

    
    else{
          
    }}
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

var errormsg = ""

peer.on('error', function(err){
    console.log(err)
    errormsg = err
    swal.fire({
        title: '錯誤',
        text: errormsg ,
        icon: "error",
        
        showCancelButton: false
      }).then(function(result) {
        if (result.value) {
          console.log('button A pressed')
        } else {
          console.log('button B pressed')
        }
      })


})

function postapace() {
    Swal.fire(
        "傳送失敗",
        "內容不得為空",
        "error"
    );
}




document.getElementById("peerbox").addEventListener("click", function(){
    getcon();
})

function getcon() {
    Swal.fire(
        "連線",
        "連結:" + urll + "<br>" + "<img src='https://chart.googleapis.com/chart?cht=qr&chl=" + urll + "&chs=200x200'>",
        
    );
}

function urlhaveid() {
    Swal.fire({
        title: "連結中包含ID",
        text: "是否進行連接",
        showCancelButton: true
    }).then(function(result) {
       if (result.value) {
            connect()
       }
       else {
        
       }
    });
}

var input = document.getElementById("msg");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("sendMessage").click();
    }
});


document.querySelector(".close").addEventListener("click", function(){
    document.querySelector(".error").style.display = "none";
})

document.getElementById("ok").addEventListener("click", function(){
    document.querySelector(".error").style.display = "none";
})



document.getElementById("close3").addEventListener("click", function(){
    document.querySelector(".peer").style.display = "none";
})