import {items} from "../db/db.js";
import {ItemModel} from "../model/itemModel.js";
import {RegexValidator} from "../validation/RegexValidator.js";

let clickedIndex;

$('#btnAddItem').on('click',() =>{
    let itemCode = $("#itemCode").val();
    let itemName = $("#itemName").val();
    let itemQuantity = $("#itemQuantity").val();
    let itemPrice = $("#itemPrice").val();

    let validator = new RegexValidator();

    const validationResult = validator.validateItem(itemCode, itemName, itemQuantity, itemPrice);

    if (validationResult.isValid){
        let item = new ItemModel(itemCode,itemName,itemQuantity,itemPrice)
        items.push(item)

        loadItemTable()
        clearItem()
    }
    else {
        alert('Invalid item data. Please check the input fields.');
        if (!validationResult.isItemIdValid) {
            alert('Invalid Item Code');
        }
        if (!validationResult.isItemNameValid) {
            alert('Invalid Item Name');
        }
        if (!validationResult.isQtoValid) {
            alert('Invalid Quantity');
        }
        if (!validationResult.isPriceValid) {
            alert('Invalid Price');
        }
    }
});

function clearItem() {
    $("#itemCode").val("")
    $("#itemName").val("")
    $("#itemQuantity").val("")
    $("#itemPrice").val("")

    $("#itemCodeUpdate").val("");
    $("#itemNameUpdate").val("");
    $("#itemQuantityUpdate").val("");
    $("#itemPriceUpdate").val("");
}

export function loadItemTable(){
    $("#item-table-tbody").append().empty()
    items.map((item,index)=>{
        var record =
            `<tr>
        <td class="itemCode">${item.itemCode}</td>
        <td class = "itemName">${item.itemName}</td>
        <td class = "itemQuantity">${item.itemQuantity}</td>
        <td class = "itemPrice">${item.itemPrice}</td>
            </tr>`
        $("#item-table-tbody").append(record);
    })
}

$("#item-table-tbody").on('click','tr', function (){
    let index = $(this).index();
    clickedIndex = index;
    let itemCode = $(this).find(".itemCode").text()
    let itemName = $(this).find(".itemName").text()
    let itemQuantity = $(this).find(".itemQuantity").text()
    let itemPrice = $(this).find(".itemPrice").text()


    $("#updateItembtn").click()
    $("#itemCodeUpdate").val(itemCode);
    $("#itemNameUpdate").val(itemName);
    $("#itemQuantityUpdate").val(itemQuantity);
    $("#itemPriceUpdate").val(itemPrice);
})

$("#btnUpdateItem").on('click',()=>{

    let itemCodeUpdated = $("#itemCodeUpdate").val();
    let itemNameUpdated = $("#itemNameUpdate").val();
    let itemQuantityUpdated = $("#itemQuantityUpdate").val();
    let itemPriceUpdated = $("#itemPriceUpdate").val();

    let customerObject = items[clickedIndex];

    customerObject.itemCode =itemCodeUpdated
    customerObject.itemName = itemNameUpdated
    customerObject.itemQuantity = itemQuantityUpdated
    customerObject.itemPrice = itemPriceUpdated

    clearItem()
    loadItemTable()
})

$("#btnDeleteItem").on('click',()=>{
    items.splice(clickedIndex,1)
    loadItemTable()
    clearItem()
})

$("#itemSearchButton").on('click', () => {
    const searchQuery = $("#searchBar").val().trim().toLowerCase();
    const searchResults = [];


    items.forEach(item => {
        if (
            item.itemCode.toLowerCase() === searchQuery ||
            item.itemName.toLowerCase().includes(searchQuery) ||
            item.itemQuantity.toLowerCase().includes(searchQuery) ||
            item.itemPrice.toLowerCase() === (searchQuery)
        ) {
            searchResults.push(item);
        }
    });

    $("#item-table-tbody").empty();


    searchResults.forEach(item => {
        $("#item-table tbody").append(`
            <tr>
                <td>${item.itemCode}</td>
                <td>${item.itemName}</td>
                <td>${item.itemQuantity}</td>
                <td>${item.itemPrice}</td>
            </tr>
        `);
    });


    if (searchResults.length === 0) {
        $("#item-table-tbody").html("<tr><td colspan='4'>No matching items were found.</td></tr>");
    }
});

function suggestNames(input) {
    const suggestions = [];
    const inputText = input.toLowerCase().trim();


    items.forEach(item => {
        if (item.itemName.toLowerCase().startsWith(inputText)) {
            suggestions.push(item.itemName);
        }
    });

    return suggestions;
}


function updateSuggestions(suggestions) {
    const suggestionsList = $("#item-suggestions");

    suggestionsList.empty();

    suggestions.forEach(suggestion => {
        suggestionsList.append(`<li>${suggestion}</li>`);
    });
}
$("#item-searchBar").on('input', function() {
    const input = $(this).val();
    const suggestions = suggestNames(input);

    updateSuggestions(suggestions);

    if (input.trim() === '') {
        $("#item-suggestions").hide();
    } else {
        $("#item-suggestions").show();
    }
});