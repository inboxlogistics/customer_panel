import frappe
from frappe import _


def get_context(context):
    if frappe.session.user=='Guest':
        frappe.throw(_("You need to be logged in to access this page"), frappe.PermissionError)
    
    user = frappe.get_doc('User', frappe.session.user)
    context.user_full_name = user.full_name
    context.user_email = user.email
    context.user_image = user.user_image 