$('#customer-section').css({display: 'none'});
$('#item-section').css({display: 'none'});
$('#order-section').css({display: 'none'});

$('#nav-customer').on('click',() =>  {
    $('#customer-section').css({display: 'block'});
    $('#item-section').css({display: 'none'});
    $('#order-section').css({display: 'none'});

});
$('#nav-item').on('click',() =>  {
    $('#item-section').css({display: 'block'});
    $('#customer-section').css({display: 'none'});
    $('#order-section').css({display: 'none'});

});
$('#nav-order').on('click',() =>  {
    $('#customer-section').css({display: 'none'});
    $('#item-section').css({display: 'none'});
    $('#order-section').css({display: 'block'});


});