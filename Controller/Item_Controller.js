import {Item} from "../db/db.js";
import { ItemModel } from "../Model/Item_Model.js";

let idCounter = 1;
let clickedIndex;

$('#btnAddItem').on('click', () => {
    let itemCode = getItemId();
    let itemName = $("#itemName").val();
    let itemQuantity = $("#itemQuantity").val();
    let itemPrice = $("#itemPrice").val();

    let item = new ItemModel(itemCode, itemName, itemQuantity, itemPrice);
    Item.push(item);
    console.log(Item);
    clearItem();
    loadTable();
});

function getItemId() {
    return "I" + String(idCounter++).padStart(3, '0');
}

function clearItem() {
    $("#itemName").val("");
    $("#itemQuantity").val("");
    $("#itemPrice").val("");
    $("#ItemIdUpdate").val("");
    $("#ItemNameUpdate").val("");
    $("#ItemQuantityUpdate").val("");
    $("#ItemPriceUpdate").val("");
}

function loadTable() {
    $("#Item-table-tbody").empty();
    Item.forEach((item, index) => {
        let record = `
            <tr>
                <td class="itemCode">${item.ItemCode}</td>
                <td class="itemName">${item.ItemName}</td>
                <td class="itemQuantity">${item.ItemQuantity}</td>
                <td class="itemPrice">${item.ItemPrice}</td>
                <td>
                    <button class="btn btn-warning btn-sm edit-item" data-index="${index}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-item" data-index="${index}">Delete</button>
                </td>
            </tr>`;
        $("#Item-table-tbody").append(record);
    });
}

$("#Item-table-tbody").on('click', '.edit-item', function () {
    clickedIndex = $(this).data('index');
    let item = Item[clickedIndex];

    $("#ItemIdUpdate").val(item.ItemCode);
    $("#ItemNameUpdate").val(item.ItemName);
    $("#ItemQuantityUpdate").val(item.ItemQuantity);
    $("#ItemPriceUpdate").val(item.ItemPrice);
    $("#updateItemModal").modal('show');
});

$("#updateItembtn").on('click', () => {
    let itemIdUpdated = $("#ItemIdUpdate").val();
    let itemNameUpdated = $("#ItemNameUpdate").val();
    let itemQuantityUpdated = $("#ItemQuantityUpdate").val();
    let itemPriceUpdated = $("#ItemPriceUpdate").val();

    let itemObject = Item[clickedIndex];

    itemObject.ItemCode = itemIdUpdated;
    itemObject.ItemName = itemNameUpdated;
    itemObject.ItemQuantity = itemQuantityUpdated;
    itemObject.ItemPrice = itemPriceUpdated;

    clearItem();
    loadTable();
    $('#updateItemModal').modal('hide');
});

$("#Item-table-tbody").on('click', '.delete-item', function () {
    let index = $(this).data('index');
    Item.splice(index, 1);
    loadTable();
});

$("#customerSearchButton").on('click', () => {
    const searchQuery = $("#searchBar").val().trim().toLowerCase();
    const searchResults = Item.filter(item =>
        item.ItemCode.toLowerCase() === searchQuery ||
        item.ItemName.toLowerCase().includes(searchQuery) ||
        item.ItemQuantity.toLowerCase() === searchQuery ||
        item.ItemPrice.toLowerCase() === searchQuery
    );

    $("#Item-table-tbody").empty();

    searchResults.forEach(item => {
        $("#Item-table-tbody").append(`
            <tr>
                <td>${item.ItemCode}</td>
                <td>${item.ItemName}</td>
                <td>${item.ItemQuantity}</td>
                <td>${item.ItemPrice}</td>
            </tr>
        `);
    });

    if (searchResults.length === 0) {
        $("#Item-table-tbody").html("<tr><td colspan='5'>No matching items were found.</td></tr>");
    }
});

function suggestNames(input) {
    const suggestions = [];
    const inputText = input.toLowerCase().trim();

    Item.forEach(item => {
        if (item.ItemName.toLowerCase().startsWith(inputText)) {
            suggestions.push(item.ItemName);
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
