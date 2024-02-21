$(() => {
  $(document).on("click", 'a[fieldname="export_data"]', (e) => {
    let selected_rows = [];
    $("#table_data")
      .find(":input[type=checkbox]")
      .each((idx, row) => {
        if (row.checked) {
          selected_rows.push($(row).attr("row-id"));
        }
      });

    const data = filteredList.filter((item) => {
      if (selected_rows.includes(item.name)) {
        return item;
      }
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    saveAs(blob, "Order List.xlsx");
  });

  $(document).on("click", 'a[fieldname="export_pdf"]', (e) => {
    let selected_rows = [];
    $("#table_data")
      .find(":input[type=checkbox]")
      .each((idx, row) => {
        if (row.checked) {
          selected_rows.push($(row).attr("row-id"));
        }
      });

    const data = filteredList.filter((item) => {
      if (selected_rows.includes(item.name)) {
        return item;
      }
    });

    let element =
      '<html><body>  <table style="width:100%; border: 1px solid black;" > ';
    data.map((item) => {
      element += "<tr>";
      for (const [key, value] of Object.entries(item)) {
        element += `<td> ${value} </td>`;
      }
      element += "</tr>";
    });

    element += "</table></body></html>";

    html2pdf(element);
  });

  $("#from_dater").change((e) => {
    getDeliveryDashboardList();
  });

  $("#to_date").change((e) => {
    getDeliveryDashboardList();
  });

  const today_date = getTodayDate();
  $("#to_date").val(`${today_date}`);
  // $("#from_dater").val(`${today_date}`);
  $("#from_dater").val(`${today_date}`).trigger("change");

  $("#table_check").on("click", function (e) {
    if ($("#table_check").is(":checked")) {
      $("input:checkbox:visible").prop("checked", true);
      // $("input:checkbox:visible").trigger("click");
    } else {
      $("input:checkbox:visible").prop("checked", false);
      // $("input:checkbox:visible").trigger("click");
    }
  });
});

function s2ab(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
}

// get dashboard data
function getDeliveryDashboardList() {
  const toDate = $("#to_date").val() ? $("#to_date").val() : getTodayDate();
  const fromDate = $("#from_dater").val()
    ? $("#from_dater").val()
    : getTodayDate();

  if (fromDate <= toDate) {
    frappe
      .call({
        method:
          "customer_panel.www.order_list.index.get_delivery_dashboard_list",
        args: { from_date: fromDate, to_date: toDate },
      })
      .then((resp) => {
        $("#table_data")[0].innerHTML = "";

        curList = resp?.message[0];
        filteredList = [...curList.slice(0, 50)];

        filteredList.map((item) => {
          $("#table_data").append(settableRowData(item));
        });
        setPagination(resp?.message[1]);
      });
  } else {
    alert("To Date should be less than From Date");
  }
}

// get today date
function getTodayDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Set Pagination
function setPagination(order_count) {

  order_count = parseInt(order_count);
  let pages = Math.ceil(order_count / 20);

  $('ul[class="pagination"]')[0].innerHTML = "";
  if (pages > 0) {
    let pagination_sec = `<li class="paginate_button page-item previous " id="order-listing_previous"><a href="#"
    aria-controls="order-listing" data-dt-idx="0" tabindex="0" class="page-link" onclick="getPreviousData()">Previous</a></li>`;
    // for (let i = 0; i < pages; i++) {
    //   pagination_sec += `<li class="paginate_button page-item active" ><a href="#" aria-controls="order-listing" data-dt-idx="pagination-${
    //     i + 1
    //   }"
    //     tabindex="0" class="page-link" style="display:none;">${i + 1}</a></li>`;
    // }
    pagination_sec += `<li class="paginate_button page-item next" id="order-listing_next"><a
    aria-controls="order-listing" data-dt-idx="3" tabindex="0" class="page-link" onclick="getNextData()">Next</a></li>`;

    $('ul[class="pagination"]').append(pagination_sec);
  }
}

function getPreviousData() {
  let currentIndex;

  for (let i = 0; i < curList.length; i++) {
    if (curList[i] === filteredList[0]) {
      currentIndex = i;
      break;
    }
  }

  const filterData = [...curList.slice(currentIndex - 50, currentIndex)];
  if (filterData.length > 0) {
    filteredList = filterData;
    $("#table_data")[0].innerHTML = "";
    filteredList.map((item) => {
      $("#table_data").append(settableRowData(item));
    });
  } else {
    alert("No More Data");
  }
}

function getNextData() {


  let currentIndex;

  for (let i = 0; i < curList.length; i++) {
    if (curList[i].name === filteredList[filteredList.length - 1].name) {
      currentIndex = i;
      break;
    }
  }

  const filterData = [...curList.slice(currentIndex, currentIndex + 50)];

  if (filterData.length > 0) {

    filteredList = filterData;
    $("#table_data")[0].innerHTML = "";
    filteredList.map((item) => {
      $("#table_data").append(settableRowData(item));
    });
  } else {
    alert("No More Data");
  }
}

function formSelect(order_id) {
  const documentId = '#' + order_id
  const selectValue = $(documentId).find(":selected").text()
  if (selectValue === "Edit") window.location.href = `/order-review?id=${order_id}`
  else if (selectValue === "Delete") {
    frappe.call({
      method: "frappe.client.set_value",
      args: {
        doctype: "Delivery Dashboard Form",
        name: order_id,
        fieldname: "order_status",
        value: "Cancelled",
      },
      callback: function (r) { alert('Cancelled') }
    });
  }
  else if (selectValue === "Delivered") {
    frappe.call({
      method: "frappe.client.set_value",
      args: {
        doctype: "Delivery Dashboard Form",
        name: order_id,
        fieldname: "order_status",
        value: "Delivered",
      },
      callback: function (r) { alert('Delivered') }
    });
  }
}

function settableRowData(item) {
  return `<tr id="data">
    <td>
      <div class="form-check form-check-primary"><input type="checkbox" class="form-check-input export-data" row-id="${item.name}">
    </td>
</div>
<td id="ecom_order_no"><a href="/order-review?id=${item.name}">${item.ecom_order_no}</a></td>
<td id="customer">${item.end_user_name}</td>
<td id="customer_mobile_no">${item.end_user_phone_number}</td>
<td id="delivery_date">${item.delivery_date_and_preferred_timing}</td>
<td id="total_order_amount">${item.total_order_amount}</td>
<td>
<label class="badge badge-info">${item.order_status}</label>
</td>
<td>
<select style="width: 5rem;height: 2rem;" onchange="formSelect('${item.name}')" id="${item.name}">
<option></option>
<option value="Edit">Edit</option>
<option value="Delete">Delete</option>
<option value="Delivered">Delivered</option>
</select>
</td>
</tr>`;
}
