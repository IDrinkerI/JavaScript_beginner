var goods = [
    new Product("Product A", 100),
    new Product("Product B", 250),
    new Product("Product C", 375),
    new Product("Product D", 455),
]

goods.GetByName = function (name) {
    let names = [];

    for (let product of this) {
        names.push(product.name);
    }

    return this[names.indexOf(name)];
}

function Product(name, price) {
    this.name = name;
    this.price = price;
}