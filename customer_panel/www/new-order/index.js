$(() => {
  $(document).on("change", "input", (e) => {
    setValues(e);
  });
  $(document).on("change", "textarea", (e) => {
    setValues(e);
  });

  // handle final submit
  $(document).on("click", "a[href='#finish']", (e) => {
    e.preventDefault();

    frappe
      .call({
        method: "customer_panel.api.save_delivery_dashboard_doc",
        args: { doc: curFrm },
      })
      .then((resp) => {
        resp.message.name ? alert("Order Submitted") : "";
      });
  });
  // qty trigger
  $(document).on("change", "input[data-fieldname='qty']", (e) => {
    const row_id = $(e.target).attr("row_id");
    const data_id = $(e.target).attr("data-id");
    const element = `[data-id="${row_id}-total"]`;
    curFrm.items.map((item) => {
      if (item.row_id === row_id && item.rate) {
        item.total = item.qty * item.rate;
        $(element).val(item.total);
      }
    });
  });

  // rate trigger
  $(document).on("change", "input[data-fieldname='rate']", (e) => {
    const row_id = $(e.target).attr("row_id");
    const data_id = $(e.target).attr("data-id");
    const element = `[data-id="${row_id}-total"]`;

    curFrm.items.map((item) => {
      if (item.row_id === row_id && item.qty) {
        item.total = item.qty * item.rate;
        $(element).val(item.total);
      }
    });
  });

  // Barcode trigger
  $(document).on("change", "input[data-fieldname='barcode']", (e) => {
    const row_id = $(e.target).attr("row_id");
    const data_id = $(e.target).attr("data-id");
    const element = `[data-id="${row_id}-item_code"]`;

    frappe
      .call({
        method: "customer_panel.api.get_barcodes_item",
        args: { barcode: e.target.value },
      })
      .then((resp) => {
        if (resp.message && resp.message.length > 0) {
          curFrm.items.map((item) => {
            if (item.row_id === row_id && item.barcode) {
              $(element).val(resp.message[0].parent).trigger("change");
            }
          });
        }
      });
  });

  // item_code trigger
  $(document).on("change", "input[data-fieldname='item_code']", (e) => {
    const row_id = $(e.target).attr("row_id");
    const data_id = $(e.target).attr("data-id");
    const element = `[data-id="${row_id}-uom"]`;
    if (e.target.value) {
      frappe
        .call({
          method: "customer_panel.api.get_all_uoms",
          args: { item_code: e.target.value },
        })
        .then((resp) => {
          if (resp.message && resp.message.length > 0) {
            curFrm.items.map((item) => {
              if (item.row_id === row_id) {
                $(element).val(resp.message[0].stock_uom).trigger("change");

                let options = "";
                resp.message?.map((item) => {
                  options += `<option value ="${item.uom}"></option>`;
                });
                $(element).parent().append(`<datalist id="${row_id}-uom">
                ${options}
              </datalist>
              `);
              }
            });
          }
        });
    }
  });

  let itemsList;

  function setValues(e) {
    if (!$(e.target).attr("row_id")) {
      const countryCode =
        e.target.type === "tel"
          ? $(
              $(
                $("#" + e.target.id)
                  .prev()
                  .find("ul li.iti__active")[0]
              ).children()[2]
            ).text()
          : "";
      const value =
        e.target.type === "checkbox"
          ? $(e.target).is(":checked")
          : e.target.value;
      curFrm[e.target.id] = `${countryCode}${value}`;
    } else {
      const row_id = $(e.target).attr("row_id");
      const fieldname = $(e.target).attr("data-fieldname");

      const value =
        e.target.type === "checkbox"
          ? $(e.target).is(":checked")
          : e.target.value;
      curFrm.items.map((item) => {
        if (item.row_id === row_id) {
          item[fieldname] = value;
        }
      });
    }
  }

  $(document).on("click", "#addTableRow", () => addRow());

  $(document).on("click", "#deleteTableRow", () => {
    let totalRows = curFrm?.items;

    let deleteRows = totalRows?.filter((item) => item.row_check === true);

    if (!(deleteRows && deleteRows.length > 0)) {
      alert("Please select atleast one row");
      throw "Please select atleast one row";
    }

    let finalRows = totalRows.filter((item) => !deleteRows.includes(item));

    curFrm.items = [];

    finalRows.map((item, idx) => {
      item.sr_no = idx + 1;
      curFrm.items.push(item);
    });

    refreshTable();
  });

  function refreshTable() {
    $("#tbl_order_item tbody")[0].innerHTML = "";
    curFrm?.items.map((item) => {
      addRow(item);
    });
  }

  function addRow(item) {
    let row_id;
    if (!item) {
      row_id = generateUID();
      item = {};
    } else {
      row_id = item.row_id;
    }

    let addcontrols = `<tr>
      <td><div class ='items_checkbox' ><input type='checkbox' row_id = "${row_id}" data-fieldname="row_check" data-id="${row_id}-row_check" style="height: 20px;min-width: 20px;"/>
      ${
        item.sr_no
          ? item.sr_no
          : curFrm?.items && curFrm?.items.length > 0
          ? curFrm.items.length + 1
          : 1
      } 
      </div></td>
      <td> 
      <input type="text" row_id = "${row_id}" data-fieldname="tag" ${
      item.tag ? setInputValue(item.tag) : ""
    } data-id="${row_id}-tag"/>
      </td>
      <td style="width:150px;"> 
      <input type="text" row_id = "${row_id}" ${
      item.item_code ? setInputValue(item.item_code) : ""
    } data-fieldname="item_code" list="${row_id}-item_code" data-id="${row_id}-item_code"/> 
      ${addDataList(row_id)}
     
      </td>
      <td> 
      <input type="text" row_id = "${row_id}" data-fieldname="barcode" ${
      item.barcode ? setInputValue(item.barcode) : ""
    } data-id="${row_id}-barcode"/>
      </td>
      <td> 
      <input type="text" row_id = "${row_id}" data-fieldname="qty" ${
      item.qty ? setInputValue(item.qty) : ""
    } data-id="${row_id}-qty"/>
      </td>
      <td> 
      <input type="text" row_id = "${row_id}" data-fieldname="uom" ${
      item.uom ? setInputValue(item.uom) : ""
    } data-id="${row_id}-uom" list="${row_id}-uom"/>
      </td>
      <td> 
      <input type="text" row_id = "${row_id}" data-fieldname="rate" ${
      item.rate ? setInputValue(item.rate) : ""
    } data-id="${row_id}-rate"/>
      </td>
      <td> 
      <input type="text" row_id = "${row_id}" data-fieldname="total" readonly ${
      item.total ? setInputValue(item.total) : ""
    } data-id="${row_id}-total"/>
      </td>
      <td> 
      <select row_id = "${row_id}" data-fieldname="vas" ${
      item.vas ? setInputValue(item.vas) : ""
    } data-id="${row_id}-vas">
      <option value="No"> No </option>
      <option value="Yes"> Yes </option>
      </select>
      </td>
      
      
      </tr>
      `;

    $("#tbl_order_item tbody").append(addcontrols);

    item.row_id
      ? ""
      : curFrm.items.push({
          row_id: row_id,
          sr_no: item.sr_no
            ? item.sr_no
            : curFrm?.items && curFrm?.items.length > 0
            ? curFrm.items.length + 1
            : 1,
        });
  }
  const generateUID = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const setInputValue = (value) => {
    return `value="${value}"`;
  };

  function addDataList(row_id) {
    return ` <datalist id="${row_id}-item_code">
    ${itemsList?.map((item) => {
      return (
        "<option value='" +
        item.name +
        "'><span>" +
        item.item_name +
        "</span>" +
        "</option>"
      );
    })}
    </datalist>`;
  }

  frappe.call({ method: "customer_panel.api.get_all_items" }).then((resp) => {
    itemsList = resp.message;
    addRow();
  });
});
