// Declare variables
const menu_container = document.getElementById('menu');
const order_tbl = document.getElementById('order-tbl');
const menu = [
  {
    name: "Rice with fried fish",
    price: 25
  },
  {
    name: "Rice with chicken",
    price: 25
  },
  {
    name: "Rice with grill rib",
    price: 25
  },
  {
    name: "Rice with Dieu Hong fish",
    price: 20
  },
  {
    name: "Rice with cat fish",
    price: 20
  },
  {
    name: "Fried rice with sea food",
    price: 25
  },
  {
    name: "Fried rice with fried chicken",
    price: 25
  },
  {
    name: "Fried rice with boiled chicken",
    price: 25
  },
  {
    name: "Noodles with sea food",
    price: 30
  },
  {
    name: "Noodles with beef",
    price: 30
  },
  {
    name: "Hu tieu with sea food",
    price: 30
  },
  {
    name: "Extra rice",
    price: 0
  },
  {
    name: "Chilli",
    price: 0
  }
];
var order_list = []; // Create empty oder_list arr

function updateOrderList() {
  let str = "";
  let totalOrderPrice = 0; // Initialize the total order price
  var export_btn = document.getElementById('export');

  if (order_list.length > 0) {
    str += '<tr>';
    str += '<th>#</th>';
    str += '<th>Name</th>';
    str += '<th>Quantity</th>';
    str += '<th>Price</th>'; // Add a new column for item price
    str += '<th>Action</th>';
    str += '</tr>';

    order_list.forEach((item, index) => {
      const menuItem = menu[item.id];
      const itemPrice = menuItem.price * item.quantity;
      totalOrderPrice += itemPrice; // Update the total order price

      str += '<tr>';
      str += '<td>' + (index + 1) + '</td>';
      str += '<td>' + menuItem.name + '</td>';
      str += '<td>' + item.quantity + '</td>';
      str += '<td>' + itemPrice + 'k</td>';
      str += '<td><a class="del-btn" href="javascript:void(0)" onclick="deleteItem(' + index + ')"><i class="fa fa-trash-o" aria-hidden="true"></i></a></td>';
      str += '</tr>';
    });

    if (!export_btn) {
      order_tbl.insertAdjacentHTML('afterend', '<button id="export" onclick="exportPDF()">Submit Order <i class="fa fa-file-pdf-o" aria-hidden="true"></i></button>');
    }
  } else {
    str += '<tr>';
    str += '<td colspan="5" style="text-align: center">Your order list is empty</td>';
    str += '</tr>';
    if (export_btn) {
      export_btn.remove();
    }
  }

  // Add a row for total order price
  str += '<tr>';
  str += '<td colspan="3" style="text-align: right">Total:</td>';
  str += '<td>' + totalOrderPrice + 'k</td>';
  str += '<td></td>';
  str += '</tr>';

  order_tbl.innerHTML = str;
}


function addItem(id) {
  let qty = document.getElementsByClassName('qty')[id];
  let qty_val = Number(qty.value); // Cast to Interger
  // If already exist then increase qty
  for (let i = 0; i < order_list.length; i++) {
    if (order_list[i].id == id) {
      order_list[i].quantity =  order_list[i].quantity + qty_val;
      updateOrderList();
      return;
    }
  }
  // If not add new item to the arr
  order_list.push({id: id, quantity: qty_val});
  updateOrderList();
}

function deleteItem(id) {
  order_list.splice(id, 1); // Remove 1 item at 'id' position
  updateOrderList();
}

function exportPDF() {
  let doc = new jsPDF();
  doc.text(order_tbl.innerText, 20, 20);
  doc.save('test.pdf');
}


// Initialize
function initApp() {
  for (let i = 0; i < menu.length; i++) {
    let str = '<div class="menu-item">';
    str += '<p class="food-name">' + menu[i].name + '</p>';
    str += '<p class="price">' + (menu[i].price == 0 ? 'Free' : menu[i].price + 'k') + '</p>';
    str += '<input class="qty" type="number" name="qty" value="1" min="1" max="100" >';
    str += '<button class="add-btn" type="button" value="' + i + '" onclick="addItem(' + i +')">ADD</button>';
    str += '</div>';
    menu_container.insertAdjacentHTML('beforeend', str);
  }
  updateOrderList();
}

initApp();

// ... (previous code)

function exportPDF() {
  
  // Add an event listener to the export button
document.getElementById('export').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Check if the delivery address form is filled out
  const nameInput = document.querySelector('input[name="name"]').value;
  const flatNumberInput = document.querySelector('input[name="flat_number"]').value;
  const cityInput = document.querySelector('input[name="city"]').value;
  const postcodeInput = document.querySelector('input[name="postcode"]').value;
  const phoneNumberInput = document.querySelector('input[name="phonenumber"]').value;
  

  if (!nameInput || !flatNumberInput || !cityInput || !postcodeInput || !phoneNumberInput) {
    alert("Please fill out the delivery address form before exporting PDF.");
    return;
  }

  // If the form is filled, generate and attach the order summary
  let orderSummary = ""; // Initialize order summary text
  orderSummary += "Delivery Address:\n";
  orderSummary += `Name: ${nameInput}\n`;
  orderSummary += `Flat Number: ${flatNumberInput}\n`;
  orderSummary += `City: ${cityInput}\n`;
  orderSummary += `Postcode: ${postcodeInput}\n`;
  orderSummary += `Phone Number: ${phoneNumberInput}\n\n`;

  orderSummary += "Order Items:\n";
  order_list.forEach((item, index) => {
    orderSummary +=
      `${index + 1}. ${menu[item.id].name} - Quantity: ${item.quantity}\n`;
  });

  // Add the order summary to a hidden input field
  const orderSummaryInput = document.createElement("input");
  orderSummaryInput.type = "hidden";
  orderSummaryInput.name = "order_summary";
  orderSummaryInput.value = orderSummary;
  document.querySelector("form").appendChild(orderSummaryInput);

  // Submit the form
  document.querySelector("form").submit();
});}


// ... (rest of the code)

