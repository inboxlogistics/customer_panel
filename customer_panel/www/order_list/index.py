from __future__ import unicode_literals

import frappe
from frappe import _
from frappe.utils import today
# from stripe import Order
from yaml import load


def get_context(context):
    print("------print get context----")
    # if frappe.session.user=='Guest':
    #     frappe.throw(_("You need to be logged in to access this page"), frappe.PermissionError)

    # context.show_sidebar=True
    # if frappe.db.exists("Customer", {'email_id': frappe.session.user}):
    #    
    #     context.doc = customer
    #     frappe.form_dict.new = 0
    # customer = frappe.get_doc("Customer", "SINWAN TRADING - WABA International Commercial Co.")
    # logged_in_user = "waba@inbox.com.qa"  #frappe.session.user

    user = frappe.get_doc("User", frappe.session.user)
    
    cust_list = frappe.get_list('Customer')
   
    if cust_list:
        customer = frappe.get_doc('Customer', cust_list[0].name)
        print(customer)
        context.doc = customer
        frappe.form_dict.new = 0
        frappe.form_dict.name = customer.name
   
        print("---calling context----")
        total_orders = frappe.db.count('Delivery Dashboard Form', {'client_name': customer.name, 'docstatus': 1})
        total_balance = frappe.get_all('GL Entry', filters={'is_cancelled': 0,'party': customer.name}, fields=['sum(debit -  credit)'])
        context.customer_name = customer.name
        context.total_orders = total_orders
        context.total_delivered = frappe.db.count('Delivery Dashboard Form', {'client_name': customer.name, 'docstatus': 1, 'order_status': ["in", ['Delivered']]})
        context.total_balance = total_balance[0]['sum(debit -  credit)']
        context.customer_image = frappe.db.get_value("Customer", customer.name, "image_str") # comment don't delete please
        context.total_balance = total_balance[0]['sum(debit -  credit)']
        context.user_full_name = user.full_name
        context.user_email = user.email
        context.user_image = user.user_image 
        # data, order_count = get_delivery_dashboard_list(customer)
        # context.data = data
        # context.order_count = order_count

@frappe.whitelist()
def get_delivery_dashboard_list(customer=None, from_date=None, to_date=None):
    print("-----get delivery dashboard list---")
    #customer_name = get_customer()
    if not customer:
        cust_list = frappe.get_list('Customer')
        customer = cust_list[0] if cust_list else None
    
    if not from_date:
        from_date = today()

    if not to_date:
        to_date = today()
    
    orderlist = frappe.db.get_all("Delivery Dashboard Form",
        filters={
            'client_name': customer.get('name'),
            'docstatus': 1,
            'delivery_date_and_preferred_timing': [">=", from_date],
            'delivery_date_and_preferred_timing': ["<=", to_date]
        },
        fields = [
            "name","end_user_name","end_user_phone_number",  "ecom_order_no", 
            "delivery_date_and_preferred_timing", "total_order_amount",
            "order_status"
        ],
        order_by = "creation desc",
    )
    order_count = len(orderlist)
    return orderlist,order_count