const express = require("express");
const cors = require("cors");
// const http = require("http")
// const socketIo = require("socket.io")
const fs = require("fs-extra");
const path = require("path");

const port = 1234;

const app = express()
const filePath = path.join(__dirname, "data", "userData.json");

app.use(cors())
app.use(express.json())

// app.post("/Login",(req,res)=>{
//     const Data = req.body

//     const readFile = fs.readFileSync(filePath)  
//     const pastData = JSON.parse(readFile)

//     if (Data.Username in pastData && Data.Password === pastData[Data.Username].Password){
//         console.log("유저",Data.Username + "님이 로그인 되었습니다.\n")
//         res.json("Login")
//     } else {
//         res.json("NotUserData")
//     }
// })

// app.post("/signUp",(req,res)=>{
//     const Data = req.body

//     const readFile = fs.readFileSync(filePath)  
//     const pastData = JSON.parse(readFile)

//     const name = Data.Username;
//     const password = Data.Password

//     console.log(typeof name)

//     if (name in pastData || name === "" || password === ""){
//         res.json("inputErr")
//     }else if(name.includes(" ") || password.includes(" ")) {
//         res.json("spaceErr")

//     }else{
//         res.json("signUp")
//         console.log("유저",name + "님이 신규가입 되었습니다.\n")
//         pastData[name] = {
//             "Username" : name,
//             "Password" : password,
//             "Point": 0
//         }
    
//         fs.writeFileSync(filePath,JSON.stringify(pastData,null,2))

//         console.log("data:",Data+" Save!")
//     }
// })

// app.post("/test", (req,res)=>{
//     const IP = req.body

//     res.json("Find!")
//     console.log("Found a Client!\nServer Ip: "+IP)
// })

// app.post("/getData", (req,res)=>{
//     const readFile = fs.readFileSync(filePath)  
//     const pastData = JSON.parse(readFile)
//     res.json(pastData);
// })

// app.get("/", (req,res) => {
//     res.send("<h1>HelloWorld</h1>")
// })

//----------표준국어대사전 API사용

const apiKey = "02423E4592ADEA654ADB100B20FDAAA6";

//----------------단어존재여부
const checkWord = (word,callback)=>{
     if (word.slice(-1)+word.slice(-1) != word){
        fetch(`http://stdict.korean.go.kr/api/search.do?key=${apiKey}&q=${word}&num=30&advanced=y&pos=1&cat=0&req_type=json`)
        .then((response)=>response.json()).then((data)=>{
            callback(data)
        }).catch(()=>{
            callback(null)
        })
     }
}
app.post("/api", (req,res)=>{ 
    const word = req.body.word;

    if (!word) {
        console.log(":c")
        return res.status(404).json({error:"단어값을 받지 못했습니다."})
    }

    checkWord(word,(data)=>{
        if (data && data.channel && data.channel.item){
            res.json({result:true,wordLisn:data.channel.item[0],total:data.channel.total})
        }else{
            res.json({result:false,wordLisn:"none",total:0})
        }
    });
})

//--------------단어완성
const searchWord = (startWord,callback)=>{
    if (!startWord) {return res.status(404).json({error:"단어값을 받지 못했습니다."})}
    fetch(`http://stdict.korean.go.kr/api/search.do?key=${apiKey}&q=${startWord}&letter_s=2&advanced=y&pos=1&cat=0&method=start&req_type=json`)
    .then((response)=>response.json()).then((data)=>{
        if (data && data.channel && data.channel.item){
            callback(data)
        }
    }).catch((err)=>{
        callback(null)
    })
}

app.post("/autoWord", (req,res)=>{
    const startWord = req.body.word
    searchWord(startWord, (data)=>{
        if (data){
            res.json({result:data.channel.item})
        } else {
            res.json({result:""})
        }
    })
})

// //------------멀티서버
// const createServer = http.createServer(app)
// const io = socketIo(createServer)

// const PlayerRoom = {};
// const wordLisn = {};
// let waitingPlayer = [] // 0 : p1, 1: p2

// io.on("connection",(socket)=>{

//     //방 할당
//     io.on("joinGame",(callback)=>{
//         const roomId = `room-${PlayerRoom.length+1}`

//         waitingPlayer.push(socket.id)

//         if (waitingPlayer.length === 2) {
//             PlayerRoom[roomId] = waitingPlayer;
//             wordLisn[roomId] = []
//             waitingPlayer = [];

//             io.to(roomId).emit("startGame","P1")

//         }

//         socket.join(roomId)
//         console.log(`Player joined ${roomId}, ${waitingPlayer.length}/2`)

//         callback({
//             order: `P${waitingPlayer.length+1}`,
//             roomId: roomId,
//             Id: socket.id
//         })
//     })

//     io.on("submit",(Existence, roomId, order, word)=>{
//         const newTurn = order == "P1" ? "P2" : "P1"
//         if (Existence) {
//             if(!wordLisn[roomId].includes(word)){
//                 wordLisn[roomId].push(word)
//                 io.to(roomId).emit("setTurn", word, newTurn)
//             } else {
//                 io.to(roomId).emit("setTurn", word, newTurn)
//             }
//         } else {
//             const lastCha = word.slice(-1);
//             const data = searchWord(lastCha)

//             if (data) {
//                 io.to(roomId).emit("setTurn", data.channel.item[0], newTurn)
//                 wordLisn[roomId].push(data.channel.item[0])
//             } else {
//                 io.to(roomId).emit("setTurn", "ChangeWord", newTurn)
//             }
//         }
//     })

//     io.on("GameOver",(defeatedPlayer, roomId)=>{
//         io.to(roomId).emit("EndGame",PlayerRoom[roomId].map((p,_) => p !== defeatedPlayer))
//         delete PlayerRoom[roomId]
//         delete wordLisn[roomId]
//     })
// })


app.listen(port,()=>console.log("stringNodeServer")); 