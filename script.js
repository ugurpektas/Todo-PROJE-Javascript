// UI vars

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const deleteAllBtn = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
const items = ['item 1','item 2','item 3','item 4'];

//load items
loadItems();
eventListenners();


function eventListenners(){        //formda submit olayı olduğunda , addNewItem fonksiyonu çağırılır.
        //submit eventi
    form.addEventListener('submit',addNewItem);

        //delete eventi tek eleman silmek
    taskList.addEventListener('click', deleteItem);

        // delete All tüm elamanları silmek
    deleteAllBtn.addEventListener('click', deleteItemAll);
}

function loadItems() {
    items.forEach(function(item){
        createItem(item);
    })
}

function createItem(text){
     // li elamnını oluşturma
     const li = document.createElement('li');
     li.className = 'list-group-item list-group-item-secondary';
         //inputun değerini li'nin içerisine atama
     li.appendChild(document.createTextNode(text));
 
     //a elemanını oluşturma
     const a = document.createElement('a');
     a.className = 'delete-item float-right';
     a.setAttribute('href','#');
     a.innerHTML = '<i class="fas fa-times"></i>';
     
     // a elemanını li elemanının child'ı olarak atamak
     li.appendChild(a);
 
     //li elemanını ul'in içerisine atamak
     taskList.appendChild(li); 
}

    // listeye eleman ekleme fonksiyonu
function addNewItem(e) {

    if(input.value ==='') {
        alert('Değer giriniz.');
    }

    //eleman oluşturma
    createItem(input.value);
   
    //inputu temizlemek
    input.value = '';

    console.log(taskList);
    e.preventDefault();
}

    //listeden tek eleman silme fonksiyonu
function deleteItem(e) {

        if (e.target.className==='fas fa-times') {
            if(confirm(`Task'ı silmek istediğinizden emin misiniz?`)){
            e.target.parentElement.parentElement.remove();
            }
        }
    e.preventDefault();
}

    //listeden tüm elemanları silmek
function deleteItemAll(e) {

    // taskList.childNodes.forEach(function (item){
    //     if (item.nodeType === 1){   // nodetype element ise bu işlemi yapar
    //         item.remove();
    //     }
    // })
    if (taskList.innerHTML==''){
        confirm('Task bulunamadı.');
    }else if (confirm('Tüm taskları silmek istediğinizden emin misiniz?')) {
        taskList.innerHTML ='';
    }
    
    e.preventDefault();
}