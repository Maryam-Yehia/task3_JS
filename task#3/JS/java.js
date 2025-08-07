
const inpts =  document.querySelectorAll('input');
const inpt1 = document.querySelectorAll('input')[0];
const inpt2 = document.querySelectorAll('input')[1];
const tbody = document.querySelector('tbody');
const form = document.querySelector('form');

displaybookmark();

function check(val , i){
    if(i === 0){
        const regex = /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*(?<! )$/;
        return regex.test(val);
    }
    else if(i === 1){
        const regex = /https?:\/\/(www\.)?[a-zA-Z0-9\-_]+\.[a-zA-Z]{2,}(:[0-9]{1,5})?(\/[^\s]*)?/;
        return regex.test(val);
    }
}

for(let i = 0 ; i < inpts.length ;i++){
    inpts[i].addEventListener('input',(e)=>{
        if(check(e.target.value ,i)){
           
            //input is valid
            inpts[i].classList.remove('inptred');
            inpts[i].classList.add('inptgreen');

            //right icon
            const right = e.target.nextElementSibling;
            right.classList.remove('d-none');

            //wrong icon
            right.nextElementSibling.classList.add('d-none');

        }else{
            //input is invalid
            inpts[i].classList.remove('inptyellow');
            inpts[i].classList.add('inptred');

            //right icon
            const right = e.target.nextElementSibling;
            right.classList.add('d-none');

            //wrong icon
            right.nextElementSibling.classList.remove('d-none');

        }
    })
}

function savedata(){
    let res;
    try {
        if(inpt1.classList.contains('inptgreen') && inpt2.classList.contains('inptgreen')){
        dataj = localStorage.getItem("bookmarklist");
        if(dataj){
            arr = JSON.parse(dataj);
            arr.push({name:inpt1.value , url:inpt2.value},)
            res = JSON.stringify(arr);
        }else{
            res = JSON.stringify([{name:inpt1.value , url:inpt2.value},])
        }
        localStorage.setItem("bookmarklist", res)
        return true;
    }}
    catch (error) {

        return false;
    }
    return false;
}

document.querySelector('button[type=submit]').addEventListener('click',(e)=>{
    e.preventDefault();
    if(savedata()){
        form.reset();

        inpt1.classList.remove('inptgreen');
        inpt2.classList.remove('inptgreen');

        inpt1.classList.add('inptyellow');
        inpt2.classList.add('inptyellow');

        inpt1.nextElementSibling.classList.add('d-none');
        inpt2.nextElementSibling.classList.add('d-none');
        displaybookmark();
    }
    else{
        showerror();
    }
})

function displaybookmark(){
    tbody.innerHTML='';
    let data = JSON.parse(localStorage.getItem('bookmarklist'));
    if(data){
        data.map((p , ind)=>{
            tbody.innerHTML +=`
                <tr>
                    <th scope="row">${ind+1}</th>
                    <td>${p.name}</td>
                    <td ><a href="${p.url}" target="_blank"><button type="button" class="btn btn-success"><i class="fa-solid fa-eye" style="color: white;"></i> Visit</button></a></td>
                    <td><button type="button" class="btn btn-danger" onclick="deletebook(${ind})"><i class="fa-solid fa-trash-can" style="color: white;"></i> Delete</button></td>
                    </tr>
                <tr>
                `;
        })
    }
}

function deletebook(ind){
    let data = JSON.parse(localStorage.getItem('bookmarklist'));
    data.splice(ind , 1);
    localStorage.setItem('bookmarklist',JSON.stringify(data));
    displaybookmark();
    
}

function showerror(){
    const error = document.getElementById('error');
    error.classList.remove('d-none');
    error.classList.add('show');
}

function hideerror(){
    const error = document.getElementById('error');
    error.classList.remove('show');
    error.classList.add('d-none');
}

