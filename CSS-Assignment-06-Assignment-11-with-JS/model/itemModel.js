export class ItemModel{
    constructor(itemCode,itemName,itemQuantity,itemPrice) {
        this._itemCode = itemCode;
        this._itemName = itemName;
        this._itemQuantity = itemQuantity;
        this._itemPrice = itemPrice;
    }

    get itemCode() {
        return this._itemCode;
    }

    set itemCode(value) {
        this._itemCode = value;
    }

    get itemName() {
        return this._itemName;
    }

    set itemName(value) {
        this._itemName = value;
    }

    get itemQuantity() {
        return this._itemQuantity;
    }

    set itemQuantity(value) {
        this._itemQuantity = value;
    }

    get itemPrice() {
        return this._itemPrice;
    }

    set itemPrice(value) {
        this._itemPrice = value;
    }
}