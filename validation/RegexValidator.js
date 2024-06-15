export class RegexValidator {
    constructor() {
        this.nameRegex = /^[A-Za-z\s]+$/;
        this.emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        this.addressRegex = /^[A-Za-z0-9\s,.-]+$/;
        this.phoneRegex = /^\d{10}$/;

        this.itemIdRegex = /^I\d{3}$/;
        this.itemNameRegex = /^[A-Za-z0-9\s]+$/;
        this.qtoRegex = /^\d+$/;
        this.priceRegex = /^\d+(\.\d{1,2})?$/;
    }

    validateName(name) {
        return this.nameRegex.test(name);
    }

    validateEmail(email){
        return this.emailRegex.test(email);
    }
    validateAddress(address) {
        return this.addressRegex.test(address);
    }

    validatePhone(phone) {
        return this.phoneRegex.test(phone);
    }

    validateCustomer(name, email, address, phone) {
        return {
            isNameValid: this.validateName(name),
            isEmailValid: this.validateEmail(email),
            isAddressValid: this.validateAddress(address),
            isPhoneValid: this.validatePhone(phone),
            isValid: this.validateName(name) && this.validateEmail(email) && this.validateAddress(address) && this.validatePhone(phone)
        };
    }
    // Item validation methods
    validateItemId(itemId) {
        return this.itemIdRegex.test(itemId);
    }

    validateItemName(itemName) {
        return this.itemNameRegex.test(itemName);
    }

    validateQto(qto) {
        return this.qtoRegex.test(qto);
    }

    validatePrice(price) {
        return this.priceRegex.test(price);
    }

    validateItem(itemId, itemName, qto, price) {
        return {
            isItemIdValid: this.validateItemId(itemId),
            isItemNameValid: this.validateItemName(itemName),
            isQtoValid: this.validateQto(qto),
            isPriceValid: this.validatePrice(price),
            isValid: this.validateItemId(itemId) && this.validateItemName(itemName) && this.validateQto(qto) && this.validatePrice(price)
        };
    }
}

