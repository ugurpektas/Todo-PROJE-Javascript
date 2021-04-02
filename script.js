// UI vars

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const deleteAllBtn = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');


eventListenners();

function eventListenners(){        //formda submit olayı olduğunda , addNewItem fonksiyonu çağırılır.
        //submit eventi
    form.addEventListener('submit',addNewItem);

        //delete eventi tek eleman silmek
    taskList.addEventListener('click', deleteItem);

        // delete All tüm elamanları silmek
    deleteAllBtn.addEventListener('click', deleteItemAll);
}

    // listeye eleman ekleme fonksiyonu
function addNewItem(e) {

    if(input.value ==='') {
        alert('Değer giriniz.');
    }

    // li elamnını oluşturma
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
        //inputun değerini li'nin içerisine atama
    li.appendChild(document.createTextNode(input.value));

    //a elemanını oluşturma
    const a = document.createElement('a');
    a.className = 'delete-item float-right';
    a.setAttribute('href','#');
    a.innerHTML = '<i class="fas fa-times"></i>';
    
    // a elemanını li elemanının child'ı olarak atamak
    li.appendChild(a);

    //li elemanını ul'in içerisine atamak
    taskList.appendChild(li);

    //inputu temizlemek
    input.value = '';

    console.log(taskList);
    e.preventDefault();
}


    //listeden tek eleman silme fonksiyonu
function deleteItem(e) {
    
    if (e.target.className==='fas fa-times') {
        e.target.parentElement.parentElement.remove();
    }
    e.preventDefault();
}

    //listeden tüm elemanları silmek
function deleteItemAll(e) {

    // taskList.childNodes.forEach(function (item){
    //     if (item.nodeType===1){   // nodetype element ise bu işlemi yapar
    //         item.remove();
    //     }
    // })
    
    taskList.innerHTML ='';

    e.preventDefault();
}