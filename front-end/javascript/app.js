const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const email = document.querySelector('#email');
const number = document.querySelector('#number');
const address = document.querySelector('#address');
const coordinates = document.querySelector('#coordinates');
const addBtn = document.querySelector('#add');
const updateBtn = document.querySelector('#update');
const dataList = document.querySelector(".data");
const showFormBtn = document.querySelector("#show-form");
const form = document.querySelector('.form');
const closeBtn = document.querySelector('#close-btn');

window.onload = () =>{
    getInfo();
}

showFormBtn.addEventListener('click', e=> {
    e.preventDefault()
    form.style.display = "block"
    updateBtn.style.display = "none"
});

closeBtn.addEventListener('click', e=> {
    e.preventDefault();
    form.style.display = "none"
});

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const coordRegex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

// Insert Data
addBtn.addEventListener('click', e =>{
    e.preventDefault();
        if (firstName.value.length < 3) {
            showAlert('Името трябва да е поне 3 символа', 'error');
        } else if (lastName.value.length < 3) {
            showAlert('Фамилията трябва да е поне 3 символа', 'error');
        } else if (!email.value.length) {
            showAlert('Добавете имейл адрес', 'error');
        } else if (!emailRegex.test(email.value)) {
            showAlert('Невалиден имейл', 'error');
        }  else if (!Number(number.value) || number.value.length != 10) {
            showAlert('Невалиден телефонен номер', 'error');
        }  else if (!address.value.length) {
            showAlert('Добавете адрес', 'error');
        }  else if (!coordRegex.test(coordinates.value)) {
            showAlert('Невалидни координати', 'error');
        } else {

            fetch("/save-data", {
                method: 'post',
                headers: new Headers({'Content-Type':'application/json'}),
                body: JSON.stringify({
                    firstName: firstName.value,
                    lastName: lastName.value,
                    email: email.value,
                    number: number.value,
                    address: address.value,
                    coordinates: coordinates.value
                })
            }).then(res => res.json())
            alert('Успешно запазена информация');
            location.reload();
        }
})

const getInfo = () =>{
    fetch('/get-data')
.then(res => {
return res.json();
})
.then(data => {
        for(let i in data){
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${data[i].first_name}</td>
            <td>${data[i].last_name}</td>
            <td>${data[i].email}</td>
            <td>${data[i].number}</td>
            <td>${data[i].address}</td>
            <td>${data[i].coordinates}</td>
        <td>
            <button type="button" class="change" onclick="updateItem('${data[i].first_name}', '${data[i].last_name}', '${data[i].email}', '${data[i].number}', '${data[i].address}', '${data[i].coordinates}')" >Обнови</button>
            <button type="button" class="delete" onclick="deleteItem('${data[i].id}')">Изтрий</button>
            <button type="button" class="show-map">Покажи на картата</button>
        </td>
        `;
    
        dataList.appendChild(row);
    }
});
}
updateBtn.addEventListener('click', e =>{
e.preventDefault()
    if (!email.value.length) {
        showAlert('Добавете имейл адрес', 'error');
    } else if (!emailRegex.test(email.value)) {
        showAlert('Невалиден имейл', 'error');
    }  else if (!Number(number.value) || number.value.length != 10) {
        showAlert('Невалиден телефонен номер', 'error');
    }  else if (!address.value.length) {
        showAlert('Добавете адрес', 'error');
    }  else if (!coordRegex.test(coordinates.value)) {
        showAlert('Невалидни координати', 'error');
    } else {

        fetch("/update-data", {
            method: 'post',
            headers: new Headers({'Content-Type':'application/json'}),
            body: JSON.stringify({
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                number: number.value,
                address: address.value,
                coordinates: coordinates.value
            })
        }).then(res => res.json())
        alert('Успешно обновена информация');
        location.reload()
    }
});



const updateItem = (first_name, last_name, emailUpd, numberUpd, addressUpd, coordinatesUpd) =>{
    form.style.display = "block";
    addBtn.style.display = "none"
    firstName.value = first_name;
    firstName.disabled = true;
    lastName.value = last_name;
    lastName.disabled = true;
    email.value = emailUpd;
    number.value = numberUpd;
    address.value = addressUpd;
    coordinates.value = coordinatesUpd;
};


const deleteItem = (id) =>{
    fetch("/delete-data", {
        method: 'post',
        headers: new Headers({'Content-Type':'application/json'}),
        body: JSON.stringify({id})
    }).then(res => res.json())
    alert('Информацията е изтрита');
    location.reload();
};

const showAlert = (message, type) =>{
    const div = document.createElement('div');
    div.className = `${type}`;

    div.appendChild(document.createTextNode(message));
    const content = document.querySelector('.form-content');
    const main = document.querySelector('.form-main');

    content.insertBefore(div, main);

    setTimeout(() => document.querySelector(`.${type}`).remove(), 3000)
}
