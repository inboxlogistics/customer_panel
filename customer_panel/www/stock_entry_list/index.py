from __future__ import unicode_literals

import frappe
from frappe import _
from inbox_portal.inbox_portal.report.stock_balance_with_volume.stock_balance_with_volume  import execute
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
    customer = frappe.get_doc("Customer", "SINWAN TRADING - WABA International Commercial Co.")
    logged_in_user = "waba@inbox.com.qa"  #frappe.session.user
    user = frappe.get_doc("User", logged_in_user)
    context.doc = customer
    frappe.form_dict.new = 0
    frappe.form_dict.name = customer.name
    # customer_name = get_customer()
    customer_name = "SINWAN TRADING - WABA International Commercial Co."
    print("---calling context----")
    total_orders = frappe.db.count('Delivery Dashboard Form', {'client_name': customer_name, 'docstatus': 1})
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
    context.data = get_stock_entry_data()

@frappe.whitelist(allow_guest=True)
def get_stock_entry_data():
    try:
        customer_name = "SINWAN TRADING - WABA International Commercial Co."
        # customer_name = get_customer()
        conditions = ""
        '''
        if from_date :
            conditions += f" and posting_date  <= date('{from_date}')"
        
        if to_date :
            conditions += f" and posting_date  >= date('{to_date}')"
        '''
        sql = f"""

        SELECT 
        `tabStock Entry`.`name`,
        `tabStock Entry`.`stock_entry_type`,
        `tabStock Entry`.`purpose`,
        `tabStock Entry`.`posting_date`,
        `tabStock Entry`.`total_item_volume_all` as "total_volume"
        FROM
        `tabStock Entry`
        WHERE
        `tabStock Entry`.`customer_cf` = '{customer_name}' and `tabStock Entry`.`docstatus` = 1
        
        """
        data = frappe.db.sql(sql,as_dict=1) or []
        return data
    except Exception as e:
        frappe.msgprint(e)