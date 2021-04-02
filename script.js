// UI vars

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const deleteAllBtn = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;


//dizi elemanlarının sayfaya yüklenmesi
loadItems();
// olayların sayfaya yüklenmesi
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
    //localstorage üzerinden elemanları almak
    items = getItemsFromLS();

    items.forEach(function(item){
        createItem(item);
    })
}
    //LS'den elemanlara ulaşmak
function getItemsFromLS(){
    if (localStorage.getItem('items') === null){
        items = [];
    }else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}
    //LS'in içerisine bilgi eklemek
function setItemToFromLS(text){
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}
    //LS'in içerisinden eleman silmek
function deleteItemFromLS(text){
    items = getItemsFromLS();
    items.forEach(function(item,index){
        if (item === text){
            items.splice(index,1);
        }
    });
    localStorage.setItem('items',JSON.stringify(items))
}

    //oluşturulan dizi üzerindeki elemanları sayfaya eklemek
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

    //Localstorage e elemanı kayıt etmek
    setItemToFromLS(input.value);
   
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
                //LS'den elemanı silmek
                deleteItemFromLS(e.target.parentElement.parentElement.textContent);
            }
        }
    e.preventDefault();
}

    //listeden tüm elemanları silmek
function deleteItemAll(e) {

    if (taskList.innerHTML==''){
        confirm('Liste zaten boş');
    }else if (confirm('Tüm taskları silmek istediğinizden emin misiniz?')) {
        
        while(taskList.firstChild){ //listemizde eleman olduğu sürece dönecek.
            taskList.removeChild(taskList.firstChild);
        }
        //tüm elemanları LS'den silmek
        localStorage.clear();
    }       

    e.preventDefault();
}