var arrOfObj = new Set();
var value_id;
var titleFlag = false;
var subtask = new Map;

//pop-up to add card
function modal(){
    document.getElementById("modal-container").style.display = "block";
    document.getElementById("head").style.filter = "blur(5px)";
    document.getElementById("empty-list").style.filter = "blur(5px)";
};

//add button in popup of add card
function addCard(){
    var cardTitle = document.getElementById("modal-input").value;
    createObj(cardTitle);
    closeModal();
}

//close button in popup of add card
function closeModal(){
    document.getElementById("modal-container").style.display = "none";
    document.getElementById("head").style.filter = "blur(0px)";
    document.getElementById("empty-list").style.filter = "blur(0px)";
}

//assign card details to set
const createObj = (title)=>{
    document.getElementById("empty-list").style.display = "none";
    var cardObj = {
        title: title,
        id: Date.now(),
        subtask
    };
    arrOfObj.add(cardObj);
    createCard(cardObj.id);
};

//cloning of subtask
function addList(){
    var clonedListItem = document.querySelector(".list-element").cloneNode(true);
    var cardItem = document.getElementById("modal-item-input").value;
    console.log(value_id);
    clonedListItem.innerText = cardItem;
    clonedListItem.style.display = "block";
    clonedListItem.setAttribute('id', `${Date.now()}`);
    clonedListItem.setAttribute('value', `${Date.now()}`);
    clonedListItem.setAttribute('style', "margin-left: 10px;");
    var doneButton = document.createElement('button');
    doneButton.setAttribute('id', `check-done-${Date.now()}`);
    doneButton.setAttribute('class', 'mark-as-done-class');
    doneButton.setAttribute('value', `${Date.now()}`);
    doneButton.setAttribute('onClick', 'completedTask(this.value)');
    doneButton.innerText = 'Mark Done';
    doneButton.setAttribute('style', 'font-size:15 px;cursor:pointer; height:18px; border-radius:10px;');
    clonedListItem.appendChild(doneButton);
    clonedListItem.setAttribute('onClick', 'completedTask(this.value)');
    
    for(obj of arrOfObj){
        for(prop in obj){
            if(obj.id == value_id){
                obj.subtask.set(`${cardItem}`, `${Date.now()}`);
                break;
            }
          
        }
    }
    document.getElementById(`${value_id}`).getElementsByClassName('add-todo-after-this')[0].appendChild(clonedListItem).appendChild(doneButton);
    closeCardModal();
}

// close item box
function closeCardModal(){
    document.getElementById('modal-item').style.display = "none";
}

// adding sublist items to card
function addSubTask(val){
    document.getElementById('modal-item').style.display = "block";
    value_id = val;
}

// delete particular card
function deleteCard(val){
    var delDiv = document.getElementById(`${val}`);
    for(obj of arrOfObj){
        for(prop in obj){
            if(obj.id == val){
                arrOfObj.delete(obj);
                break;
            }
        }
    }
    delDiv.parentNode.removeChild(delDiv);
    if(arrOfObj.size == 0){
        document.getElementById('empty-list').style.display = "block";
    }
};

//Cloning of card
function createCard(){
    var firstCard = document.querySelector('.todo-card').cloneNode(true);
    display(firstCard);
};

//  Task list item done
function completedTask(value){
    document.getElementById(`${value}`).style.textDecoration = 'line-through';
    document.getElementById(`${value}`).style.color = '#8e7cc3';
    document.getElementById(`check-done-${value}`).remove();
};

// appending cards to todo-outer-container
function display(card){
    document.getElementById('empty-list').style.display = "none";
    arrOfObj.forEach(element=>{
        card.id = element.id;
        card.querySelector(".card-head").innerHTML = element.title;
        card.querySelector(".card-head").setAttribute('value', `${element.id}`);
        card.setAttribute('value', `${element.id}`);
        card.setAttribute("display", "block");
        card.setAttribute("min-height", "300px");
        card.querySelector('.delete-btn-card').setAttribute("value", `${element.id}`);
        card.querySelector('.delete-btn-card').setAttribute("onClick", "deleteCard(this.value)");
        card.querySelector(".add-btn-card").setAttribute("value", `${element.id}`);
        card.querySelector(".add-btn-card").setAttribute("onClick", "addSubTask(this.value)");

    });
    if(titleFlag){
        card.style.display = "none";
    }
    else{
        card.style.display = "block";
        document.getElementById('todo-outer-container').appendChild(card);
    }
};


// Selected card on entire page
function headerFunc(val){
    var cardHeader;
    for(let ele of arrOfObj){
        for(let id in ele){
            if(ele[id] == val){
                cardHeader = ele.title;
                break;
            }
        }
    }
    document.querySelector('#task').style.display = "none";
    document.querySelector('#add-btn-text').style.display = "none";
    for(let ele of arrOfObj){
        if(ele.id == val){
            document.getElementById(`${ele.id}`).style.display = "block";
        }
        else{
            document.getElementById(`${ele.id}`).style.display = "none";
        }
    }
    // document.getElementById('card-dynamic-head').innerText = `${cardHeader}`;
    document.getElementById('card-dynamic-head').style.display = 'flex';
    document.getElementById('todo-outer-container').style.justifyContent = 'center';
    document.getElementById('back-btn').style.display = 'block';
    titleFlag = true;
};

// After clicking back button main page
function displayAll(){
    titleFlag = false;
    document.querySelector('#task').style.display = 'block';
    document.querySelector('#add-btn-text').style.display = 'inline-block';
    document.getElementById('back-btn').style.display = 'none';
    for(let ele of arrOfObj){
        document.getElementById(`${ele.id}`).style.display = 'block';
    }
    document.getElementById('card-dynamic-head').innerText = ``; 
    document.getElementById('card-dynamic-head').style.display = 'none';
};

