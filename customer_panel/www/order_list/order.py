from __future__ import unicode_literals

import frappe
from frappe import _
# from stripe import Order
from yaml import load


def get_context(context):

    print("------print get context----")
    if frappe.session.user=='Guest':
        frappe.throw(_("You need to be logged in to access this page"), frappe.PermissionError)

    user = frappe.get_doc('User', frappe.session.user)
    context.user_full_name = user.full_name
    context.user_email = user.email
    context.user_image = user.user_image

    if frappe.form_dict.get('id'):
        if frappe.db.exists('Delivery Dashboard Form', frappe.form_dict.id):
            context.doc = frappe.get_doc('Delivery Dashboard Form', frappe.form_dict.id)
        else:
            context.not_found = True

    else:

        pass
    
    

    # context.show_sidebar=True
    # if frappe.db.exists("Customer", {'email_id': frappe.session.user}):
    #    
    #     context.doc = customer
    #     frappe.form_dict.new = 0
        # customer = frappe.get_doc("Customer", "SINWAN TRADING - WABA International Commercial Co.")
        # logged_in_user = "waba@inbox.com.qa"  #frappe.session.user
        # user = frappe.get_doc("User", logged_in_user)
        # context.doc = customer
        # frappe.form_dict.new = 0
        # frappe.form_dict.name = customer.name
        # # customer_name = get_customer()
        # customer_name = "SINWAN TRADING - WABA International Commercial Co."
        # print("---calling context----")
        # total_orders = frappe.db.count('Delivery Dashboard Form', {'client_name': customer_name, 'docstatus': 1})
        # total_balance = frappe.get_all('GL Entry', filters={'is_cancelled': 0,'party': customer_name}, fields=['sum(debit -  credit)'])
        # context.customer_name = customer_name
        # context.total_orders = total_orders
        # context.total_delivered = frappe.db.count('Delivery Dashboard Form', {'client_name': customer_name, 'docstatus': 1, 'order_status': ["in", ['Delivered']]})
        # context.total_balance = total_balance[0]['sum(debit -  credit)']
        # context.customer_image = frappe.db.get_value("Customer", customer_name, "image_str") # comment don't delete please
        # context.total_balance = total_balance[0]['sum(debit -  credit)']
        # context.user_full_name = user.full_name
        # context.user_email = user.email
        # context.user_image = user.user_image
        # context.item_code_list =  get_item_code()

@frappe.whitelist(allow_guest=True)
def get_item_code():
    # customer_name= get_customer()
    customer = "SINWAN TRADING - WABA International Commercial Co."
    item_code_list = frappe.db.get_list("Item",
        filters={
            'customer': customer,
            'disabled': 0,
        },
        fields = [
            "name" 
        ]
    )
    return item_code_list