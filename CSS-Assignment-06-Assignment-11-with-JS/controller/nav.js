$('#nav-home').on('click',() =>  {
    /*$('#customer-section').css({display: 'block'});
    $('#item-section').css({display: 'none'});
    $('#order-section').css({display: 'none'});
    $('#order-details-section').css({display: 'none'});*/

    $("#home-section").css('display','block')
    $("#customer-section").css('display','none')
    $("#item-section").css('display','none')
    $("#order-details-section").css('display','none')
    $("#order-section").css('display','none')
});

$('#nav-customer').on('click',() =>  {
    $('#customer-section').css({display: 'block'});
    $('#item-section').css({display: 'none'});
    $('#order-section').css({display: 'none'});
    $('#order-details-section').css({display: 'none'});
    $("#home-section").css('display','none')

});
$('#nav-item').on('click',() =>  {
    $('#customer-section').css({display: 'none'});
    $('#item-section').css({display: 'block'});
    $('#order-section').css({display: 'none'});
    $('#order-details-section').css({display: 'none'});
    $("#home-section").css('display','none')
});

$('#nav-order').on('click',() =>  {
    $('#customer-section').css({display: 'none'});
    $('#item-section').css({display: 'none'});
    $('#order-section').css({display: 'block'});
    $('#order-details-section').css({display: 'none'});
    $("#home-section").css('display','none')
});

$('#nav-order-details').on('click',() =>  {
    $('#customer-section').css({display: 'none'});
    $('#item-section').css({display: 'none'});
    $('#order-section').css({display: 'none'});
    $('#order-details-section').css({display: 'block'});
    $("#home-section").css('display','none')
});
