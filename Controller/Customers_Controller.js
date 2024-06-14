import { customers } from "../db/db.js";
import { CustomerModel } from "../Model/Customers_Model.js";

let idCounter = 1;
let clickedIndex;

$('#btnAddCustomer').on('click', () => {
    let customerId = getCustomerId();
    let customerName = $("#customerName").val();
    let customerEmail = $("#customerEmail").val();
    let customerAddress = $("#customerAddress").val();
    let customerPhone = $("#customerPhone").val();

    let customer = new CustomerModel(customerId, customerName, customerEmail, customerAddress, customerPhone);
    customers.push(customer);
    console.log(customers);
    clearCustomer();
    loadTable();
});

function getCustomerId() {
    return "C" + String(idCounter++).padStart(3, '0');
}

function clearCustomer() {
    $("#customerName").val("");
    $("#customerEmail").val("");
    $("#customerAddress").val("");
    $("#customerPhone").val("");
    $("#customerIdUpdate").val("");
    $("#customerNameUpdate").val("");
    $("#customerEmailUpdate").val("");
    $("#customerAddressUpdate").val("");
    $("#customerPhoneUpdate").val("");
}

function loadTable() {
    $("#customer-table-tbody").empty();
    customers.forEach((customer, index) => {
        let record = `
            <tr>
                <td class="customerId">${customer.customerId}</td>
                <td class="customerName">${customer.customerName}</td>
                <td class="customerEmail">${customer.customerEmail}</td>
                <td class="customerAddress">${customer.customerAddress}</td>
                <td class="customerPhone">${customer.customerPhone}</td>
                <td>
                    <button class="btn btn-warning btn-sm edit-customer" data-index="${index}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-customer" data-index="${index}">Delete</button>
                </td>
            </tr>`;
        $("#customer-table-tbody").append(record);
    });
}

$("#customer-table-tbody").on('click', '.edit-customer', function () {
    clickedIndex = $(this).data('index');
    let customer = customers[clickedIndex];

    $("#customerIdUpdate").val(customer.customerId);
    $("#customerNameUpdate").val(customer.customerName);
    $("#customerEmailUpdate").val(customer.customerEmail);
    $("#customerAddressUpdate").val(customer.customerAddress);
    $("#customerPhoneUpdate").val(customer.customerPhone);
    $("#updateCustomerModal").modal('show');
});

$("#btnUpdateCustomer").on('click', () => {
    let customerIdUpdated = $("#customerIdUpdate").val();
    let customerNameUpdated = $("#customerNameUpdate").val();
    let customerEmailUpdated = $("#customerEmailUpdate").val();
    let customerAddressUpdated = $("#customerAddressUpdate").val();
    let customerPhoneUpdated = $("#customerPhoneUpdate").val();

    let customerObject = customers[clickedIndex];

    customerObject.customerId = customerIdUpdated;
    customerObject.customerName = customerNameUpdated;
    customerObject.customerEmail = customerEmailUpdated;
    customerObject.customerAddress = customerAddressUpdated;
    customerObject.customerPhone = customerPhoneUpdated;

    clearCustomer();
    loadTable();
    $('#updateCustomerModal').modal('hide');
});

$("#customer-table-tbody").on('click', '.delete-customer', function () {
    let index = $(this).data('index');
    customers.splice(index, 1);
    loadTable();
});

$("#customerSearchButton").on('click', () => {
    const searchQuery = $("#searchBar").val().trim().toLowerCase();
    const searchResults = customers.filter(customer =>
        customer.customerId.toLowerCase() === searchQuery ||
        customer.customerName.toLowerCase().includes(searchQuery) ||
        customer.customerEmail.toLowerCase().includes(searchQuery) ||
        customer.customerAddress.toLowerCase().includes(searchQuery) ||
        customer.customerPhone.toLowerCase() === searchQuery
    );

    $("#customer-table-tbody").empty();

    searchResults.forEach(customer => {
        $("#customer-table-tbody").append(`
            <tr>
                <td>${customer.customerId}</td>
                <td>${customer.customerName}</td>
                <td>${customer.customerEmail}</td>
                <td>${customer.customerAddress}</td>
                <td>${customer.customerPhone}</td>
            </tr>
        `);
    });

    if (searchResults.length === 0) {
        $("#customer-table-tbody").html("<tr><td colspan='5'>No matching customers were found.</td></tr>");
    }
});

function suggestNames(input) {
    const suggestions = [];
    const inputText = input.toLowerCase().trim();

    customers.forEach(customer => {
        if (customer.customerName.toLowerCase().startsWith(inputText)) {
            suggestions.push(customer.customerName);
        }
    });

    return suggestions;
}

function updateSuggestions(suggestions) {
    const suggestionsList = $("#suggestions");
    suggestionsList.empty();

    suggestions.forEach(suggestion => {
        suggestionsList.append(`<li>${suggestion}</li>`);
    });
}

$("#searchBar").on('input', function () {
    const input = $(this).val();
    const suggestions = suggestNames(input);

    updateSuggestions(suggestions);

    if (input.trim() === '') {
        $("#suggestions").hide();
    } else {
        $("#suggestions").show();
    }
});
