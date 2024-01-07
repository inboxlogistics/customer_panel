$(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const order_id = urlParams.get("id");
  let itemsList;
  frappe
    .call({
      method: "customer_panel.api.get_order",
      args: { order_id },
    })
    .then((resp) => {
      console.log(resp.message);
      curFrm = resp.message;
      frappe
        .call({
          method: "customer_panel.api.get_all_items",
        })
        .then((result) => {
          itemsList = result.message;
          setValues();
        });
    });

  function setValues() {
    for (const [key, value] of Object.entries(curFrm)) {
      if (key !== "items") {
        const inputElement = `input[id="${key}"]`;
        const textElement = `textarea[id="${key}"]`;
        $(inputElement)[0]
          ? $(inputElement).val(value)
          : $(textElement).val(value);
      } else if (key === "items") {
        curFrm.items.map((item) => {
          addRow(item);
        });
      }
      console.log(`${key}: ${value}`);
    }
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
});
