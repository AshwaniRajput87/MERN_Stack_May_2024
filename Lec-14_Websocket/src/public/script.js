const socket = io();

const btn = document.getElementById('send');
const input = document.getElementById('msg');
const ul = document.getElementById('list');

const createGrpBtn = document.getElementById('createGrp');
const joinGrpBtn = document.getElementById('joinGrp');
const stgBtn = document.getElementById('stg');
const leaveGrpBtn = document.getElementById('leaveGrp');

btn.addEventListener('click', ()=>{
    const val = input.value;

    if(val.length){

        const div = document.createElement('div');
        div.setAttribute('class', 'sender');

        const li = document.createElement('li');
        li.innerText = val;

        const para = document.createElement('p');
        para.innerText = 'sender';

        div.appendChild(para);
        div.appendChild(li);

        ul.appendChild(div);

        socket.emit('message', val);

        input.value = '';
    }
})

socket.on("broadcast", (msg)=>{
    console.log(msg);

    const div = document.createElement('div');
    div.setAttribute('class', 'reciever');

    const li = document.createElement('li');
    li.innerText = msg;

    const para = document.createElement('p');
    para.innerText = 'reciever';

    div.appendChild(para);
    div.appendChild(li);

    ul.appendChild(div);
});

createGrpBtn.addEventListener('click', ()=>{
    console.log("Group has been created");
    socket.emit('create_grp', Math.floor(Math.random(0,1)*1000));
});

joinGrpBtn.addEventListener('click', ()=>{
    console.log("joined the group");
    socket.emit('join_grp');
});

stgBtn.addEventListener('click', ()=>{
    console.log("send the messages");

    const val = input.value;

    if(val.length){
        socket.emit('grp_msg', val);
    }
});

socket.on('serve_grp_msg', (msg)=>{

    const div = document.createElement('div');
    div.setAttribute('class', 'reciever');

    const li = document.createElement('li');
    li.innerText = msg;

    const para = document.createElement('p');
    para.innerText = 'reciever';

    div.appendChild(para);
    div.appendChild(li);

    ul.appendChild(div);

});

leaveGrpBtn.addEventListener('click', ()=>{
   // Do in your assignment
});

