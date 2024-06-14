export class ItemModel {
    constructor(ItemCode, ItemName,ItemQuantity, ItemPrice) {
        this._ItemCode = ItemCode
        this._ItemName = ItemName
        this._ItemQuantity = ItemQuantity
        this._ItemPrice = ItemPrice

    }
    get ItemCode() {
        return this._ItemCode;
    }
    get ItemName() {
        return this._ItemName;
    }
    get ItemQuantity() {
        return this._ItemQuantity;
    }
    get ItemPrice() {
        return this._ItemPrice;
    }
    set ItemCode(value) {
        this._ItemCode = value;
    }
    set ItemName(value) {
        this._ItemName = value;
    }
    set ItemQuantity(value) {
        this._ItemQuantity = value;
    }
    set ItemPrice(value) {
        this._ItemPrice = value;
    }
}