import {cartItems, items, orderItems, customers, orders, order_details} from "../db/db.js";
import {OrderModel} from "../model/orderModel.js";

import {CartModel} from "../model/cartModel.js";
import {loadItemTable} from "./itemController.js";
import {OrderDetailModel} from "../model/orderDetailModel.js";

let displayCart = [];
let clickedIndex;
let orderIdCounter = 1;
$(document).ready(function (){


    $("#order-item-id").on('keypress',function (event){
        if (event.which===13){
            event.preventDefault()

            let itemCode = $("#order-item-id").val().trim().toLowerCase();
            items.forEach(item =>{
                if (item.itemCode.toLowerCase()===itemCode){
                    $("#order-item-name").val(item.itemName)
                    $("#order-item-price").val(item.itemPrice)
                    $("#order-item-qty-on-hand").val(item.itemQuantity)
                    $("#item-id-suggestions").hide();
                }
                /*else{
                    alert('Invalid Item');
                }*/
            })
        }
    })
})
function suggestItemIds(input) {
    const suggestions = [];
    const inputText = input.toLowerCase().trim();


    items.forEach(item => {
        if (item.itemCode.toLowerCase().startsWith(inputText)) {
            suggestions.push(item.itemCode + "-" + item.itemName + "- QTO : "+item.itemQuantity);
        }
    });

    return suggestions;
}
function updateSuggestions(suggestions) {
    const suggestionsList = $("#item-id-suggestions");

    suggestionsList.empty();

    suggestions.forEach(suggestion => {
        suggestionsList.append(`<li>${suggestion}</li>`);
    });
}
$("#order-item-id").on('input', function() {
    const input = $(this).val();
    const suggestions = suggestItemIds(input);

    updateSuggestions(suggestions);

    if (input.trim() === '') {
        $("#item-id-suggestions").hide();
    } else {
        $("#item-id-suggestions").show();
    }
});
$("#order-item-qty").on('input',()=>{
    $("#order-item-sub-total").val(
        $("#order-item-price").val() * $("#order-item-qty").val()
    )
})

$("#btn-add-to-cart").on('click',()=>{
    let itemId = $("#order-item-id").val()
    let itemDesc = $("#order-item-name").val()
    let price =$("#order-item-price").val()
    let qty =$("#order-item-qty").val()
    let subTotal = $("#order-item-sub-total").val()

    items.forEach(item =>{
        if (item.itemCode.toLowerCase() === itemId) {
            orderItems.push(item)
        }
    })

    let cartItem = new CartModel(itemId,itemDesc,price,qty,subTotal)
    cartItems.push(cartItem)
    loadTable()
    clearCart()

    let itemToReduce

    items.forEach(item =>{
        if (itemId === item.itemCode){
            itemToReduce = item;
        }
    })
    itemToReduce.itemQuantity = itemToReduce.itemQuantity - qty;
    console.log(itemToReduce.itemQuantity);
    loadItemTable()

})

function loadTable(){
    $("#order-item-table-tbody").append().empty()

    cartItems.map((item, index)=>{
        var record =
            `<tr>
        <td class="order-item-code">${item.itemCode}</td>
        <td class = "order-item-desc">${item.itemName}</td>
        <td class = "order-item-price">${item.unitPrice}</td>
        <td class = "order-item-qty">${item.qty}</td>
        <td class = "order-item-subTotal">${item.totalPrice}  </tr>`

        $("#order-item-table-tbody").append(record);
    } )
}
function clearCart(){
    $("#order-item-id").val("")
    $("#order-item-name").val("")
    $("#order-item-price").val("")
    $("#order-item-qty-on-hand").val("")
    $("#order-item-qty").val("")
    $("#order-item-sub-total").val("")
    $("#item-id-suggestions").hide()
}
$("#order-item-table-tbody").on('click','tr',function (){
    let index = $(this).index();
    clickedIndex = index;

    let itemCode = $(this).find(".order-item-code").text()
    let desc = $(this).find(".order-item-desc").text()
    let price = $(this).find(".order-item-price").text()
    let qty = $(this).find(".order-item-qty").text()
    let total = $(this).find(".order-item-subTotal").text()

    $("#order-item-id").val(itemCode)
    $("#order-item-desc").val(desc)
    $("#order-item-price").val(price)
    $("#order-item-qty").val(qty)
    $("#order-sub-total").val(total)

    $("#btn-cart-item-delete").css('display','inline-block')
    $("#btn-update-cart-item").css('display','inline-block')
})
$("#btn-cart-item-delete").on('click',()=>{
    let itemId =  $("#order-item-id").val()
    let itemInc;
    items.forEach(item=>{
        if (item.itemCode === itemId){
            itemInc = item;
        }
    })
    itemInc.itemQuantity = itemInc.itemQuantity + parseInt($("#order-item-qty").val())
    console.log(itemInc.itemQuantity)
    cartItems.splice(clickedIndex,1);
    loadItemTable()
    clearCart()
    loadTable()

    $("#btn-cart-item-delete").css('display','none')
    $("#btn-update-cart-item").css('display','none')


})
$("#btn-update-cart-item").on('click',()=>{
    let itemId = $("#order-item-id").val()
    let itemName = $("#order-item-name").val()
    let price =$("#order-item-price").val()
    let qty =$("#order-item-qty").val()
    let subTotal = $("#order-item-sub-total").val()

    let cartItem = cartItems[clickedIndex];

    cartItem.itemCode = itemId;
    cartItem.itemName=itemName;
    cartItem.unitPrice = price;
    cartItem.qty=qty;
    cartItem.totalPrice = subTotal

    clearCart()
    loadTable()

    $("#btn-cart-item-delete").css('display','none')
    $("#btn-update-cart-item").css('display','none')
})
function  getOrderId(){
    return function (){
        let orderId = String(orderIdCounter).padStart(3,'0')
        let id = "O:"+orderId;
        orderIdCounter++
        return id;
    }
}
$("#orderId").on('focus',()=>{
    $("#orderId").val(getOrderId())
})
$("#order-customer-id").on('blur', (event)=>{
    let custId = $("#order-customer-id").val().trim().toLowerCase();
    customers.forEach(customer=>{
        if (customer.customerId.toLowerCase() === custId){
            $("#order-customer-name").val(customer.customerName)
            $("#order-customer-id-suggestions").hide()
        }
        /*else{
            alert('Invalid Customer!');
        }*/
    })
})
function suggestCustomerIds(input) {
    const suggestions = [];
    const inputText = input.toLowerCase().trim();


    customers.forEach(item => {
        if (item.customerId.toLowerCase().startsWith(inputText)) {
            suggestions.push(item.customerId + "-" + item.customerName);
        }
    });

    return suggestions;
}
function updateCustomerSuggestions(suggestions) {
    const suggestionsList = $("#order-customer-id-suggestions");

    suggestionsList.empty();

    suggestions.forEach(suggestion => {
        suggestionsList.append(`<li>${suggestion}</li>`);
    });
}
$("#order-customer-id-suggestions").on('input', function() {
    const input = $(this).val();
    const suggestions = suggestCustomerIds(input);

    updateCustomerSuggestions(suggestions);

    if (input.trim() === '') {
        $("#order-customer-id-suggestions").hide();
    } else {
        $("#order-customer-id-suggestions").show();
    }
});
$("#order-finished").on('click',()=>{
    let total = 0;
    cartItems.forEach( item=> {
        total = total + parseInt(item.totalPrice)
    })
    $("#order-total").val(total)
    $("#order-full-total").val(total-((total/100)*5))
})
$("#buy-order").on('click',()=>{
    let id = $("#orderId").val()
    let custId = $("#order-customer-id").val()
    let date = $("#order-date").val()
    let custName = $("#order-customer-name").val()
    let total = $("#order-total").val()
    let discount  = "5%"
    let subTotal = $("#order-full-total").val()

    let order = new OrderModel(id,custId,date,custName,total,discount,subTotal)
    orders.push(order);
    let orderDetail = new OrderDetailModel(order,cartItems);
    order_details.push(orderDetail)

    $("#orderId").val("")
    $("#order-customer-id").val("")
    $("#order-date").val("")
    $("#order-customer-name").val("")
    $("#order-total").val("")
    $("#order-full-total").val("")

    $("#order-item-table-tbody").append().empty()

})