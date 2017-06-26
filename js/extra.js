// variables
let orderField = $('.order');
let subTotal = $('.sub');
let tax = $(".tax");
let tot = $(".tot");
let clientData = $('.clientData');

// event handlers
$('.card').on('click', 'a', itemInfo);
$('.order').on('click', placeOrder);



// Functions
function itemInfo(event){
  let itemToAdd = $(event.target).parent('.card-action').siblings('.card-content').children('span').text();
  let itemPrice = $(event.target).parent('.card-action').siblings('.card-content').children('p').text();
  let itemRow = $('<tr>');
  let itemName = $('<td>').text(itemToAdd);
  itemRow.append(itemName);
  itemRow.append($('<td>').text(itemPrice).attr("class", "rightness"));
  orderField.append(itemRow);
  updateSubTotal(itemPrice);
}

function updateSubTotal(itemPrice){
  let totes = subTotal.text().slice(1, subTotal.text().length);
  if (totes === 0.00){
    subTotal.text(itemPrice);
    updateTaxAndTotal(subTotal);
  }
  else {
    let newTotes = Number(totes) + Number(itemPrice.slice(1, itemPrice.length));
    subTotal.text("$" + newTotes.toFixed(2));
    updateTaxAndTotal(subTotal);
  }
}

function updateTaxAndTotal(subTotal){
  let taxable = subTotal.text();
  tax.text("$" + (Number(taxable.slice(1, taxable.length)) * 0.096).toFixed(2));
  tot.text("$" + ((Number(taxable.slice(1, taxable.length)) * 0.096) + (Number(taxable.slice(1, taxable.length)))).toFixed(2));
}

// I did not do a good job at validation, please tell how to do better, I don't like being suck
function placeOrder(event) {
  if (orderField.children().text() === ""){
    Materialize.toast("You haven't ordered anything!", 4000);
  }
  else if (clientData.children().children().children('input[id="name"]').val() === ""){
    Materialize.toast("Please fill out your personal information.", 4000);
  }
  else if (!/[0-9]{10}/.test(clientData.children().children().children('input[type="tel"]').val())){
    Materialize.toast("Please enter a valid 10 digit phone number.", 4000);
  }
  else if (clientData.children().children().children('textarea').val() === "") {
    Materialize.toast("Please fill out your personal information.", 4000);
  }
  else{
    Materialize.toast("Thanks for your order!", 4000);
  }
}
