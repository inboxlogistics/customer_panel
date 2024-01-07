import frappe,json, uuid


@frappe.whitelist(allow_guest=True)
def get_delivery_dashboard_list():
    print("-----get delivery dashboard list---")
    #customer_name = get_customer()
    customer = "SINWAN TRADING - WABA International Commercial Co."
    orderlist = frappe.db.get_list("Delivery Dashboard Form",
        filters={
            'client_name': customer,
            'docstatus': 1,
            'delivery_date_and_preferred_timing': [">", "2023-10-01"]
        },
        fields = [
            "name","end_user_name", "ecom_order_no", 
            "delivery_date_and_preferred_timing", "total_order_amount",
            "order_status"
        ]
    )
    return orderlist

@frappe.whitelist(allow_guest=True)   
def get_data_delivery_dashboard(name):
    now = datetime.now()
    customer_name = get_customer()
    n=1
    data =frappe.db.sql(""" 
        SELECT name, docstatus , idx, client_name, order_status, 
            ecom_order_no, end_user_name, conutry_code, end_user_phone_number, 
            zone_no, street, building_no, unit_no, delivery_order_type, 
            delivery_date_and_preferred_timing, delivery_time_range, 
            detailed_shipping_info, attach_po, attachment_1, attachment_2, 
            do_you_want_to_add_value_added_services, collect_vas_charge, 
            `create`, notes, transport_by, coordination_name, coordination_number, 
            total_qty, total_volume, total_value_added_charges, delivery_price, 
            total_discounts, total_order_amount, collection_amount, location, 
            shopify_number, 
            address,end_user_email,customer_notes,inbox_logistics_mistake 
        FROM `tabDelivery Dashboard Form` WHERE name = %s """,((str(name))))
    return data

@frappe.whitelist()
def get_all_items():
    return frappe.get_all('Item', filters={'disabled':1},fields=['name','item_name'])

@frappe.whitelist()
def get_all_uoms(item_code):
    return frappe.db.sql(''' select ucd.uom, i.stock_uom from `tabUOM Conversion Detail` ucd join `tabItem` i
                    on ucd.parent=i.name where ucd.parent= %(item_code)s and i.name = %(item_code)s''',{"item_code": item_code},
                    as_dict=1)
   

@frappe.whitelist()
def get_barcodes_item(barcode):
    return frappe.get_all("Item Barcode", filters={'barcode':["like",barcode]},fields=['parent'], limit=1)

@frappe.whitelist()
def save_delivery_dashboard_doc(doc):
    doc = json.loads(doc) 
    cust_list = frappe.get_list('Customer')
    delivery_doc = frappe.get_doc({"doctype": "Delivery Dashboard Form", "client_name": cust_list[0].name, "end_user_name": doc.get('buyer_name'),
                                   "end_user_email": doc.get('email'), "street": doc.get('street'), "notes": doc.get('notes'),
                                   "address": doc.get('locationid'), "building_no": doc.get('building_no'), "zone_no": doc.get('zone_num'),
                                   "end_user_phone_number": doc.get('buyr_contact_num')})
    delivery_doc.delivery_date_and_preferred_timing = frappe.utils.today()
    delivery_doc.ecom_order_no= doc.get("items")[0].get('row_id')
    if doc.get("items"):
        for item in doc.get("items"):
            delivery_doc.append("ecommerce_item", {
                "item_code": item.get('item_code'),
                "uom": item.get('uom'),
                "qty": item.get('qty'),
                "rate": item.get('rate'),
                "amount": item.get('total')
            })
    delivery_doc.insert(ignore_permissions=True)
    return delivery_doc.name

@frappe.whitelist()
def get_order(order_id):
    data = {}
    if frappe.db.exists("Delivery Dashboard Form", order_id):
        doc = frappe.get_doc('Delivery Dashboard Form', order_id)
        data["buyer_name"] = doc.get('end_user_name')
        data['email'] = doc.get('end_user_email')
        data['street'] = doc.get('street')
        data['notes'] = doc.get('notes')
        data['locationid'] = doc.get('address')
        data['building_no'] = doc.get('building_no')
        data['building_no'] = doc.get('building_no')
        data['zone_num'] = doc.get('zone_no')
        data['buyr_contact_num'] = doc.get('end_user_phone_number')
        data['items'] = []
        if doc.get('ecommerce_item'):
            for item in doc.get('ecommerce_item'):
                data["items"].append({
                    "row_id": item.get('name'),
                    "sr_no": item.get('idx'),
                    "item_code": item.get('item_code'),
                    "uom": item.get('uom'),
                    "qty": item.get('qty'),
                    "rate": item.get('rate'),
                    "total": item.get('amount'),
                    "barcode": item.get('barcode'),
                    "tag": item.get('tag')
                })
    return data

