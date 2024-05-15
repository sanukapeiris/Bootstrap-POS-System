import {customers} from "../db/db.js";
import {CustomerModel} from "../Model/Customers_Model.js";

let idCounter = 1
let clickedIndex;

$('#btnAddCustomer').on('click',() =>{
    let customerId = getCustomerId();
    let customerName = $("#customerName").val();
    let customerEmail = $("#customerEmail").val();
    let customerAddress = $("#customerAddress").val();
    let customerPhone = $("#customerPhone").val();

    let customer = new CustomerModel(customerId(),customerName,customerEmail,customerAddress,customerPhone);
    customers.push(customer)
    console.log(customers)
    clearCustomer()
    loadTable()
});

function  getCustomerId(){
    console.log(idCounter)
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
}

function loadTable(){
    $("#customer-table tbody tr").append().empty()
    customers.map((item,index)=>{
        var record =
            `<tr>
        <td class="customerId">${item.customerId}</td>
        <td class = "customerName">${item.customerName}</td>
        <td class = "customerEmail">${item.customerEmail}</td>
        <td class = "customerAddress">${item.customerAddress}</td>
        <td class = "customerPhone">${item.customerPhone}</td>
            </tr>`
        $("#customer-table").append(record);
    })

}