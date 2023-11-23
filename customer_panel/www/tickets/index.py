from __future__ import unicode_literals

import frappe
from frappe import _
# from stripe import Order
from yaml import load


def get_context(context):
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
    context.customer_name = customer_name
    context.customer_image = frappe.db.get_value("Customer", customer_name, "image_str") # comment don't delete please
    context.user_full_name = user.full_name
    context.user_email = user.email
    context.user_image = user.user_image 
    # context.data = get_item_list(customer_name)