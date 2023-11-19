from __future__ import unicode_literals

import frappe
from frappe import _
# from stripe import Order
from yaml import load

no_cache = 1

def get_context(context):
    print("------print get context----")
    logged_in_user = frappe.session.user
    if logged_in_user=='Guest':
        frappe.throw(_("You need to be logged in to access this page"), frappe.PermissionError)
    userpermission_list = frappe.get_all('User Permission',filters={'user':logged_in_user,'allow':'Customer'},fields=['for_value'])
    if(len(userpermission_list)<=0):
        frappe.throw(_("No Customer Record Found for your Login"), frappe.PermissionError)

    customer_name = userpermission_list[0].for_value
    customer = frappe.get_doc("Customer", customer_name)
    user = frappe.get_doc("User", logged_in_user)
    context.doc = customer
    frappe.form_dict.new = 0
    frappe.form_dict.name = customer.name
    print("---calling context----")
    total_orders = frappe.db.count('Delivery Dashboard Form', {'client_name': customer_name, 'docstatus': 1})
    context.total_new_orders = frappe.db.count('Delivery Dashboard Form', {'client_name': customer_name, 'docstatus': 1, 'order_status': 'New'})
    total_balance = frappe.get_all('GL Entry', filters={'is_cancelled': 0,'party': customer_name}, fields=['sum(debit -  credit)'])
    context.customer_name = customer_name
    context.total_orders = total_orders
    context.total_delivered = frappe.db.count('Delivery Dashboard Form', {'client_name': customer_name, 'docstatus': 1, 'order_status': ["in", ['Delivered']]})
    context.total_balance = total_balance[0]['sum(debit -  credit)']
    context.customer_image = frappe.db.get_value("Customer", customer_name, "image_str") # comment don't delete please
    context.total_balance = total_balance[0]['sum(debit -  credit)']
    context.user_full_name = user.full_name
    context.user_email = user.email
    context.user_image = user.user_image 