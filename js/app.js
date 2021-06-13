const cart = [{
        id: 198752,
        name: "Tinta DJ27 Color",
        price: 52.95,
        count: 3,
        premium: true,
    },
    {
        id: 75621,
        name: "Impresora ticketera PRO-201",
        price: 32.75,
        count: 2,
        premium: true,
    },
    {
        id: 54657,
        name: "Caja de rollos de papel para ticketera",
        price: 5.95,
        count: 3,
        premium: false,
    },
    {
        id: 3143,
        name: "Caja de folios DIN-A4 80gr",
        price: 9.95,
        count: 2,
        premium: false,
    }
];

getProduct = (list, pos) => {
    let product = [];
    product.push(list[pos].id, list[pos].name, list[pos].premium, list[pos].price + " €", list[pos].count);
    return product;
}

function createTable(list) {
    let data = [];
    let newRow, newCell, newText;
    let body = document.getElementById('shopping-cart');
    let table = document.querySelector('table');
    let tblBody = document.querySelector('tbody');

    for (i = 0; i < list.length; i++) {
        data = getProduct(list, i);
        newRow = document.createElement('tr');
        for (j = 0; j < data.length; j++) {
            newCell = document.createElement('td');
            newText = document.createTextNode(data[j]);
            newCell.appendChild(newText);
            newRow.appendChild(newCell);
        }
        tblBody.appendChild(newRow);
        data = [];
    }
    table.appendChild(tblBody);
    body.appendChild(table);
}

function deleteTable() {
    let rowsNumber = document.querySelectorAll('table tr').length - 1;
    for (i = 0; i < rowsNumber; i++) {
        document.querySelector('table').deleteRow(1);
    }
}

function printList(list, idList) {
    let printData = document.getElementById(idList);
    deleteList();
    for (attr in list) {
        let li = document.createElement('li');
        li.innerText = list[attr];
        printData.appendChild(li);
    };
}

function deleteList() {
    let elementsNumber = document.querySelectorAll('#prime-products-list li').length;
    for (i = 0; i < elementsNumber; i++) {
        document.querySelector('li').remove();
    }
}

var deleteProduct = () => {
    let index = 0;
    deleteTable();
    for (i = 0; i < cart.length; i++) {
        if (cart[i].id === parseInt(document.getElementById('input-delete').value)) {
            index = i;
            cart.splice(index, 1);
        }
    }
    document.getElementById('input-delete').value = '';
    createTable(cart);
    printList(namePrimeProducts(cart), 'prime-products-list');
    totalPrice(cart);
    shippingCosts(cart);
}

let totalPrice = (list) => {
    let total = 0;
    for (attr in list) {
        total += (list[attr].price * list[attr].count);
    }
    if (total > 50) {
        document.querySelector('.discount-info').innerText = "Your purchase is " + total.toFixed(2) + "€, but you get a 5% discount!";
        total = discountedPrice(total);
    }
    document.getElementById('price').innerText = "Total price = " + total.toFixed(2) + '€';
}

function namePrimeProducts(list) {
    let data = [];
    for (attr in list) {
        if (list[attr].premium) data.push(list[attr].name);
    }
    return data;
}

function shippingCosts(list) {
    let numProducts = list.length;
    let cont = 0;
    for (attr in list) {
        if (list[attr].premium) cont++;
    }
    cont === numProducts ?
        document.getElementById('shipping-costs').innerText = "Zero shipping costs." :
        document.getElementById('shipping-costs').innerText = "With shipping costs.";
}

var discountedPrice = (totalPrice) => totalPrice * 0.95;

//Events
createTable(cart);
printList(namePrimeProducts(cart), 'prime-products-list');
totalPrice(cart);
shippingCosts(cart);

document.getElementById('button-delete').addEventListener('click', deleteProduct);