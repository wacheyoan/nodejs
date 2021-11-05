let socket = io();

var messages = document.getElementById("messages");

var formLogIn = document.getElementById("form2");
var input2 = formLogIn.querySelector("input");

let selectedRoom = null;

let form = document.createElement("form");
form.id = "form";

let input = document.createElement("input");
input.type = "text";
input.id = "input";

let button = document.createElement("button");
button.type = "submit";
button.textContent = "Send";

form.appendChild(input);
form.appendChild(button);

formLogIn.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input2.value) {
    socket.emit("log", input2.value);
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat", {msg:input.value,selectedRoom:selectedRoom});
    input.value = "";
  }
});

function timestampToCleanTime(timestamp){
  let date = new Date(timestamp);

  let hour = this.zeroNumber(date.getHours());
  let minutes = this.zeroNumber(date.getMinutes());
  let seconds = this.zeroNumber(date.getSeconds());

  return `${hour}:${minutes}:${seconds}`;
}

function zeroNumber(number){
    if(number < 10){
      return "0"+number;
    }

    return number;
}

function appendLi(msg, classes, img,timer) {
  var item = document.createElement("li");
  item.textContent = msg;
  item.dataset.timestamp = this.timestampToCleanTime(timer);

  for (let cls in classes) {
    item.classList.add(classes);
  }

  if (img) {
    var image = document.createElement("img");
    image.src = img;

    item.appendChild(image);
  }

  messages.appendChild(item);
  item.scrollIntoView();
}

socket.on("chat", function ({msg,user}) {
  if(msg.roomId === selectedRoom){
    appendLi(msg.msg, [user.id !== socket.id ? 'other' :'self'], user.imgUrl,msg.timestamp);
  }
});

socket.on("logged", function ({msg,user}) {
  appendLi(msg.msg, [user.id !== socket.id ? 'other' :'self'], user.imgUrl,msg.timestamp);
  formLogIn.replaceWith(form);
  selectedRoom = msg.roomId;
});

socket.on('initRooms',function(rooms){

  let roomsElement = document.getElementById('rooms');
  //voir autrement
  let count = 0;

  for(let room in rooms.rooms){
    let roomElement = document.createElement('div');
    roomElement.classList.add('room');
    roomElement.title= rooms.rooms[room].title;
    roomElement.id = room;

    if(count === 0){
      roomElement.classList.add('selected');
      selectedRoom = room;
    }

    let src= rooms.rooms[room].urlImage;

    let img = document.createElement('img');
    img.src = src ? src : "/sources/default.png";

    roomElement.addEventListener('click',function(){
        document.querySelector('.room.selected').classList.remove('selected');
        roomElement.classList.add('selected');
        selectedRoom = roomElement.id;

        socket.emit('chooseRoom',selectedRoom);

    })

    roomElement.appendChild(img)
    roomsElement.appendChild(roomElement);

    count++;
  }
})

socket.on('disconnected',({msg,user,timer})=>{
  appendLi(msg, [user !== socket.id ? 'other' :'self'], user.imgUrl,timer);
  document.getElementById(user.id).remove();
})

socket.on('initMsg',(msgs) =>{
  document.getElementById('messages').innerHTML = "";
  msgs.map(msg => {
    appendLi(msg.msg,[msg.userId !== socket.id ? 'other' :'self'],'tristan.jpg',msg.timestamp);
  })
})

socket.on('initUsers',(users)=>{

  let usersElement = document.getElementById('users');
  usersElement.innerHTML = "";

  for(let user of users){

    if(!document.getElementById(user.id)){
      let userElement = document.createElement('div');
      userElement.classList.add('user');
      userElement.id = user.id;

      let img = document.createElement('img');
      img.src = user.imgUrl ? user.imgUrl : "/sources/default.png";

      let p = document.createElement('p');
      p.textContent = user.pseudo;

      userElement.appendChild(img);
      userElement.appendChild(p);

      usersElement.appendChild(userElement);
    }

  }
})
