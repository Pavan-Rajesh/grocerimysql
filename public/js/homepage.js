const items = [{
        id: "dal1",
        name: "dal",
        price: 40,
        quantity: 0
    }, {
        id: "puls1",
        name: "pulse",
        price: 50,
        quantity: 0
    },
    {
        id: "seneg1",
        name: "senegs",
        price: 50,
        quantity: 0
    }
]
var t = 0;

const addbutton = document.getElementById("add");
const arr = [];
addbutton.addEventListener('click', function () {
    const iname = document.getElementById("name").value;
    const cardid = document.getElementById("bill");
    // console.log(iname);
    for (var i = 0; i < items.length; i++) {
        if (items[i].name == iname) {
            var t = i;
            break;
        }

    }
    // console.log(t);
    // console.log(items[2]);
    var html = "";
    html = `<div class="card"><h3>${items[t].name}</h3>
        <h4>quantity</h4>
        <input type="number" value=${items[t].quantity}  readonly id=${items[t].id}>
        <div class="quantity">
            <button type="button" onclick="incr('${items[t].id}')">+</button>
            <button type="button" onclick="dcr('${items[t].id}')">-</button>
        </div></div>`;
    cardid.insertAdjacentHTML("afterbegin", html);
});


function incr(x) {
    const z = document.getElementById(x);
    for (var i = 0; i < items.length; i++) {
        if (items[i].id === x) {
            items[i].quantity += 1;
            // console.log(items[i]);
            break;
        }
    }
    // console.log(x);
    const u = document.getElementById(x);
    u.value = items[i].quantity;
}

function dcr(x) {
    const z = document.getElementById(x);
    for (var i = 0; i < items.length; i++) {
        if (items[i].id === x) {
            items[i].quantity -= 1;
            console.log(items[i]);
            break;
        }
    }

    const r = document.getElementById(x);
    r.value = items[i].quantity;
}


function calcbill(e) {
    e.preventDefault();
    const calc = document.getElementById("bill");
    // console.log(calc.childElementCount);
    const num = calc.childElementCount;
    const childs = calc.children;
    // console.log(childs[0]);
    const postdat = [];
    for (let i = 0; i < num; i++) {
        const x = childs[i].children[2].getAttribute("id");
        items.forEach(element => {
            if (x == element.id) {
                postdat.push({
                    "name": `${element.name}`,
                    "quantity": `${element.quantity}`,
                    "price": `${element.quantity*element.price}`
                })
                console.log(`selected quaantiy of the ${element.name} is ${element.quantity} and the total price is ${element.quantity*element.price}`);
            }
        })
    }
    const form = e.currentTarget;
    const url = form.action;
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(postdat),
    };
    console.log(postdat);
    fetch(url, fetchOptions).then((res) => res.json()).then((data) => console.log(data));

}





const fSubmit = document.querySelector("form");


fSubmit.addEventListener('submit', calcbill);