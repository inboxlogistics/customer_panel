import frappe


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