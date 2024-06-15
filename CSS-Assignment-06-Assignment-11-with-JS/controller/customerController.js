import {customers} from "../db/db.js";
import  {CustomerModel} from "../model/customerModel.js";
import {RegexValidator} from "../validation/RegexValidator.js";


let clickedIndex;
let idCounter = 1
$("#btnAddCustomer").on('click',()=>{
    let customerId = getCustomerId()
    let customerName = $("#customerName").val()
    let customerEmail = $("#customerEmail").val()
    let customerAddress = $("#customerAddress").val()
    let customerPhone = $("#customerPhone").val()

    let validator = new RegexValidator();

    const validationResult = validator.validateCustomer(customerName, customerEmail, customerAddress, customerPhone);
    if (validationResult.isValid){
        let customer = new CustomerModel(customerId(),customerName,customerEmail,customerAddress,customerPhone)
        customers.push(customer)
        clearCustomer()
        loadTable()
    }
    else {
        alert('Invalid customer data. Please check the input fields.');
        if (!validationResult.isNameValid) {
            alert('Invalid Name');
        }
        if (!validationResult.isEmailValid){
            alert('Invalid Email');
        }
        if (!validationResult.isAddressValid) {
            alert('Invalid Address');
        }
        if (!validationResult.isPhoneValid) {
            alert('Invalid Phone');
        }
    }
})
function  getCustomerId(){
    return function (){
        let customerId = String(idCounter).padStart(3,'0')
        let id = "C"+customerId;
        idCounter++
        return id;
    }
}
function clearCustomer() {
    $("#customerName").val("")
    $("#customerEmail").val("")
    $("#customerAddress").val("")
    $("#customerPhone").val("")

    $("#customerIdUpdate").text("");
    $("#customerNameUpdate").val("");
    $("#customerEmailUpdate").val("");
    $("#customerAddressUpdate").val("");
    $("#customerPhoneUpdate").val("");
}
function loadTable(){
    $("#customer-table-tbody").append().empty()
    customers.map((item,index)=>{
        var record =
            `<tr>
        <td class="customerId">${item.customerId}</td>
        <td class = "customerName">${item.customerName}</td>
        <td class = "customerEmail">${item.customerEmail}</td>
        <td class = "customerAddress">${item.customerAddress}</td>
        <td class = "customerPhone">${item.customerPhone}</td>
            </tr>`
        $("#customer-table-tbody").append(record);
    })
}
$("#customer-table-tbody").on('click','tr',function (){
    let index = $(this).index();
    clickedIndex = index;


    let customerId = $(this).find(".customerId").text()
    let customerName = $(this).find(".customerName").text()
    let customerEmail = $(this).find(".customerEmail").text()
    let customerAddress = $(this).find(".customerAddress").text()
    let customerPhone = $(this).find(".customerPhone").text()


    $("#updateCustomerBtn").click()
    $("#customerIdUpdate").text(customerId);
    $("#customerNameUpdate").val(customerName);
    $("#customerEmailUpdate").val(customerEmail);
    $("#customerAddressUpdate").val(customerAddress);
    $("#customerPhoneUpdate").val(customerPhone);

})
$("#btnUpdateCustomer").on('click',()=>{

    let customerIdUpdated = $("#customerIdUpdate").text();
    let customerNameUpdated = $("#customerNameUpdate").val();
    let customerEmailUpdated = $("#customerEmailUpdate").val();
    let customerAddressUpdated = $("#customerAddressUpdate").val();
    let customerPhoneUpdated = $("#customerPhoneUpdate").val();

    let customerObject = customers[clickedIndex];

    customerObject.custId =customerIdUpdated
    customerObject.customerName = customerNameUpdated
    customerObject.customerEmail = customerEmailUpdated
    customerObject.customerAddress = customerAddressUpdated
    customerObject.customerPhone = customerPhoneUpdated

    clearCustomer()
    loadTable()
})
$("#btnDeleteCustomer").on('click',()=>{
    customers.splice(clickedIndex,1)
    loadTable()
    clearCustomer()
})

$("#customerSearchButton").on('click', () => {
    const searchQuery = $("#searchBar").val().trim().toLowerCase();
    const searchResults = [];


    customers.forEach(customer => {
        if (
            customer.customerId.toLowerCase() === searchQuery ||
            customer.customerName.toLowerCase().includes(searchQuery) ||
            customer.customerEmail.toLowerCase().includes(searchQuery) ||
            customer.customerAddress.toLowerCase().includes(searchQuery) ||
            customer.customerPhone.toLowerCase() === searchQuery
        ) {
            searchResults.push(customer);
        }
    });

    $("#customer-table-tbody").empty();


    searchResults.forEach(customer => {
        $("#customer-table tbody").append(`
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
        $("#customer-table-tbody").html("<tr><td colspan='4'>No matching customers were found.</td></tr>");
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
$("#searchBar").on('input', function() {
    const input = $(this).val();
    const suggestions = suggestNames(input);

    updateSuggestions(suggestions);

    if (input.trim() === '') {
        $("#suggestions").hide();
    } else {
        $("#suggestions").show();
    }
});