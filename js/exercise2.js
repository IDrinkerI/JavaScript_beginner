fillProductList();

var shoppingList = {
    purchaseList: [],
    names: [],
    htmlEntity: document.querySelector("#shopping_list"),
    htmlTotalPrice: document.querySelector("#total_price"),

    add: function (product) {
        let index = this.names.indexOf(product.name);
        if (index != -1) {
            this.purchaseList[index].count++;
        }
        else {
            this.purchaseList.push(new Purchase(product));
            this.names.push(product.name);
        }

        this.update();
    },

    update: function () {
        this.htmlEntity.innerHTML = "";
        let totalPrice = 0;

        for (let purchase of this.purchaseList) {
            let price = purchase.price * purchase.count;
            totalPrice += price;

            let li = document.createElement("li")
            li.classList.add("shopping_list-item")
            li.innerText = purchase.name + " " + purchase.count + "шт. цена: " + price + "р.";
            this.htmlEntity.append(li);
        }

        this.htmlTotalPrice.innerText = "Итого: " + totalPrice + "р.";
    },
}

function fillProductList() {
    let productList = document.querySelector("#product_list");

    for (let product of goods) {
        let productCard = createProductCard(product);
        productList.append(productCard);
    }

    function createProductCard(product) {
        let card = document.createElement("div");
        card.classList.add("product_card");

        let title = document.createElement("h3");
        title.classList.add("product_card-title");
        title.innerText = product.name;
        card.append(title);

        let price = document.createElement("p");
        price.classList.add("product_card-price");
        price.innerText = "Цена: " + product.price + "р.";
        card.append(price);

        let buyButton = document.createElement("button");
        buyButton.classList.add("product_card-buy_button");
        buyButton.innerText = "Добавить в корзину";
        buyButton.addEventListener("click", addToBasket);
        card.append(buyButton);

        return card;
    }
}

function addToBasket(sender) {
    let productName = sender.target.parentNode.childNodes[0].innerText;
    shoppingList.add(goods.GetByName(productName));
}

function Purchase(product) {
    this.name = product.name;
    this.price = product.price;
    this.count = 1;
}