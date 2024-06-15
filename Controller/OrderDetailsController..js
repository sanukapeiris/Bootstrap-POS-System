import {order_details} from "../db/db.js";


let clickedIndex;
$("#nav-order-details").on('click',()=>{
    loadTable()
})
function loadTable(){
    $("#order-details-table-tbody").append().empty()

    order_details.map((order, index) =>{
        var record = `
         <tr>
         <td class="order-detail-orderId">${order.OrderModel.orderId}</td>
         <td class="order-detail-custName">${order.OrderModel.customerName}</td>
         <td class="order-detail-date">${order.OrderModel.date}</td>
         <td class="order-detail-total">${order.OrderModel.total}</td>
         <td class="order-detail-discount">${order.OrderModel.discount}</td>
         <td class="order-detail-subTotal">${order.OrderModel.subtotal}</td>
            </tr>`

        $("#order-details-table-tbody").append(record)
    })
}
$("#order-details-table-tbody").on('click','tr',function (){
    let index = $(this).index();
    let order = order_details[index];
    populateItemList(order.ItemList);
    $('#listItems').modal('show');
})

function populateItemList(itemList) {
    let itemListBody = $("#itemList-body");
    itemListBody.empty();

    itemList.forEach(item => {
        let row = `
                <tr>
                    <td>${item.itemCode}</td>
                    <td>${item.itemName}</td>
                    <td>${item.itemQuantity}</td>
                    <td>${item.unitPrice}</td>
                    <td>${item.unitPrice * item.qty}</td>
                </tr>
            `;
        itemListBody.append(row);
    });
}