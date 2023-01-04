const items = [{
        id: "pulses1",
        name: "pulses",
        price: 30,
        quantity: 0
    }, {
        id: "rice1",
        name: "rice",
        price: 1200,
        quantity: 0
    }, {
        id: "chocolates1",
        name: "chocolates",
        price: 10,
        quantity: 0
    },
    {
        id: "bisuits1",
        name: "biscuits",
        price: 10,
        quantity: 0
    },
    {
        id: "soaps1",
        name: "soaps",
        price: 30,
        quantity: 0
    }, {
        id: "shampoo1",
        name: "shampoo",
        price: 50,
        quantity: 0
    }, {
        id: "books1",
        name: "books",
        price: 40,
        quantity: 0
    }, {
        id: "pens1",
        name: "pens",
        price: 5,
        quantity: 0
    }, {
        id: "handwash1",
        name: "handwash",
        price: 70,
        quantity: 0
    }, {
        id: "deodrant1",
        name: "deodrant",
        price: 250,
        quantity: 0
    }
]
var t = 0;

const addbutton = document.getElementById("add");
const arr = [];
addbutton.addEventListener('click', function () {
    const iname = document.getElementById("name").value;
    console.log(iname);
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
    // html = `<div class="card"><h3>${items[t].name}</h3>
    //     <h4>quantity</h4>
    //     <input type="number" value=${items[t].quantity}  readonly id=${items[t].id}>
    //     <div class="quantity">
    //         <button type="button" onclick="incr('${items[t].id}')">+</button>
    //         <button type="button" onclick="dcr('${items[t].id}')">-</button>
    //     </div></div>`;

    html = ` <div class="card  border border-5 border-dark">
    <div class="card-body">
        <h5 class="card-title">${items[t].name}</h5>
        <p class="card-text"></p>
        <div class="d-flex justify-content-evenly align-items-center">
            <input type="text" class="form-control w-25" value=${items[t].quantity} placeholder="quantity" min="0" readonly id=${items[t].id}>
            <button type="button" onclick="incr('${items[t].id}')"   class="quant">+</button>
            <button type="button" onclick="dcr('${items[t].id}')" class="quant">-</button>
        </div>
    </div>
</div>`



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
    // console.log(calc.childElementCount);d
    const num = calc.childElementCount;
    const childs = calc.children;
    // console.log(childs[0]);
    const postdat = [];
    for (let i = 0; i < num; i++) {
        const x = childs[i].children[0].children[2].children[0].getAttribute("id");
        // const x = childs[i].children[2].getAttribute("id");
        items.forEach(element => {
            if (x == element.id) {
                postdat.push({
                    "name": `${element.name}`,
                    "quantity": `${element.quantity}`,
                    "price": `${element.quantity*element.price}`
                })
                // console.log(`selected quaantiy of the ${element.name} is ${element.quantity} and the total price is ${element.quantity*element.price}`);
            }
        })
    }
    const form = e.currentTarget;
    const url = form.action;
    // console.log(url);
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(postdat),
    };
    // console.log(postdat);
    const visualArea = document.getElementById("billarea");
    fetch(url, fetchOptions).then((res) => res.json()).then((data) => {
        const x = data.items;
        var table = '<table><tr><th>Item Name</th><th>Item Quantity</th><th>Item price</th></tr>'
        // var billHTML = '<div>itemname-------item quantity---------itemprice</div>';
        x.forEach((item) => {
            // billHTML = billHTML + `<div>${item.name}------${item.quantity}------${item.price}</div>`;
            table = table + `<tr><td>${item.name}</td><td>${item.quantity}</td><td>${item.price}</td></tr>`;
        })
        table = table + '</table>'
        visualArea.insertAdjacentHTML("afterbegin", table);
    });
}





const fSubmit = document.querySelector("form");


fSubmit.addEventListener('submit', calcbill);


function dispdetail(x) {
    const z = document.getElementById(x);
    x.classList.toggle('show');
}