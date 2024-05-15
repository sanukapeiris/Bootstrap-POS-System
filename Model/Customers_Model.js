export class CustomerModel {
    constructor(customerId, customerName, customerEmail, customerAddress, customerPhone) {
        this._customerId = customerId
        this._customerName = customerName
        this._customerEmail = customerEmail
        this._customerAddress = customerAddress
        this._customerPhone = customerPhone

    }

    get customerId() {
        return this._customerId;
    }

    set customerId(value) {
        this._customerId = value;
    }

    get customerName() {
        return this._customerName;
    }

    set customerName(value) {
        this._customerName = value;
    }

    get customerEmail() {
        return this._customerEmail;
    }

    set customerEmail(value) {
        this._customerEmail = value;
    }

    get customerAddress() {
        return this._customerAddress;
    }

    set customerAddress(value) {
        this._customerAddress = value;
    }

    get customerPhone() {
        return this._customerPhone;
    }

    set customerPhone(value) {
        this._customerPhone = value;
    }
}