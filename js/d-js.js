let date = document.getElementById('date');
let name = document.getElementById('name');
let typePruduit = document.getElementById('type-p');
let cuntPruduit = document.getElementById('cunt-p');
let priceUnite = document.getElementById('price-u');
let total = document.getElementById('total');
let create = document.getElementById('create');
let mood = 'create';
let tmp;
function gettotale(){
    if(priceUnite.value !=''){
        let result = +cuntPruduit.value * +priceUnite.value  ;
        total.innerHTML = result;
        total.style.background = '#040'
    }else{
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
    
}
    let dataPro
if(localStorage.pruduit != null){
    dataPro = JSON.parse(localStorage.pruduit)
}else{
    dataPro = [];
}


create.onclick = function(){
    let newPro = {
        date:date.value,
        name:name.value,
        type:typePruduit.value,
        cuntP:cuntPruduit.value,
        priceU:priceUnite.value,
        total:total.innerHTML,
    }
    if (name.value !='' 
                && date.value !=''
                && typePruduit.value !=''
                && cuntPruduit !=''  
                ){
        if (mood === 'create'){
            dataPro.push(newPro)
            localStorage.setItem('pruduit', JSON.stringify(dataPro))
            }
            else{
                dataPro[tmp] = newPro;
                mood = 'create'
                create.innerHTML='create'
            }
            clearData()
            saveData()
        };
    }

function clearData (){
    date.value ='';
    name.value='';
    typePruduit.value='';
    cuntPruduit.value='';
    priceUnite.value='';
    total.innerHTML='';
}
function saveData(){
    let table = ''
    for(let i=0 ; i < dataPro.length; i++ ){
        table += `
        <tr>
            <td> ${i} </td>
            <td> ${dataPro[i].date} </td>
            <td> ${dataPro[i].name}  </td>
            <td> ${dataPro[i].type} </td>
            <td> ${dataPro[i].cuntP} </td>
            <td> ${dataPro[i].priceU} </td>
            <td> ${dataPro[i].total} </td>
            <td> <button onclick="updateData(${i})" id="update">update</button> </td>
            <td> <button onclick="deleteData(${i})" id="delete">delete</button> </td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML= table;
    let bntDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        bntDelete.innerHTML =`<button onclick="deleteAll ()" >delete ALL (${dataPro.length}) </button>`
    }else{
        bntDelete.innerHTML ='';
    }

}
saveData()

function deleteData(i){
    dataPro.splice(i,1);
    localStorage.pruduit = JSON.stringify(dataPro);
    saveData()
}
function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    saveData();
}
function updateData(i){
    gettotale();
    date.value = dataPro[i].date;
    name.value=dataPro[i].name;
    typePruduit.value=dataPro[i].type;
    cuntPruduit.value=dataPro[i].cuntP;
    priceUnite.value=dataPro[i].priceU;
    create.innerHTML= 'Update';
    mood = 'update'
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth',
    })
}
let searchMood = 'title';

function getsearchMood(id){
    let search = document.getElementById('in-search');
    if (id == 'searchName'){
        searchMood = 'title';
        search.placeholder = 'Search by Name'
    } else{
        searchMood ='date';
        search.placeholder = 'Search by Date'
    }
    search.focus()
}
function searchData(value){
    let table='';
    if (searchMood == 'title')
    {
        for(let i=0; i<dataPro.length; i++)
        if (dataPro[i].name.includes(value)){
            table += `
        <tr>
            <td> ${i} </td>
            <td> ${dataPro[i].date} </td>
            <td> ${dataPro[i].name}  </td>
            <td> ${dataPro[i].type} </td>
            <td> ${dataPro[i].cuntP} </td>
            <td> ${dataPro[i].priceU} </td>
            <td> ${dataPro[i].total} </td>
            <td> <button onclick="updateData(${i})" id="update">update</button> </td>
            <td> <button onclick="deleteData(${i})" id="delete">delete</button> </td>
        </tr>
        `
        }
    }

    else{
        for(let i=0; i<dataPro.length; i++)
        if (dataPro[i].date.includes(value)){
            table += `
        <tr>
            <td> ${i} </td>
            <td> ${dataPro[i].date} </td>
            <td> ${dataPro[i].name}  </td>
            <td> ${dataPro[i].type} </td>
            <td> ${dataPro[i].cuntP} </td>
            <td> ${dataPro[i].priceU} </td>
            <td> ${dataPro[i].total} </td>
            <td> <button onclick="updateData(${i})" id="update">update</button> </td>
            <td> <button onclick="deleteData(${i})" id="delete">delete</button> </td>
        </tr>
        `
        }

    }
    document.getElementById('tbody').innerHTML= table;

}