from __future__ import unicode_literals

import frappe  , uuid,json
from frappe import _, msgprint
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
    context.item_code_list =  get_item_code()

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

@frappe.whitelist(allow_guest=True)
def get_customer():
    logged_in_user = frappe.session.user
    userpermission_list = frappe.get_all('User Permission',filters={'user':logged_in_user,'allow':'Customer'},fields=['for_value'])
    if(len(userpermission_list)<=0):
        frappe.throw(_("No Customer Record Found for your Login"), frappe.PermissionError)
    customer_name = userpermission_list[0].for_value
    return customer_name
@frappe.whitelist(allow_guest=True)
def save_order_delivery(end_user_name,
                        end_user_phone_number,
                        delivery_date_and_preferred_timing,
                        location,
                        building_no,
                        zone_no,
                        street,
                        notes,
                        arr
                        ):
    customer_name = get_customer()
    doc = frappe.get_doc({'doctype':'Delivery Dashboard Form'})
    
    doc.client_name= str(customer_name)
    doc.order_status="New"
    doc.end_user_name=str(end_user_name)
    doc.end_user_phone_number=str(end_user_phone_number)
    doc.delivery_date_and_preferred_timing=str(delivery_date_and_preferred_timing)
    # doc.delivery_time_range=str(delivery_time_range)
    doc.location=str(location)
    doc.building_no=str(building_no)
    doc.zone_no=str(zone_no)
    doc.street=str(street)
    doc.notes=str(notes)
    doc.total_discounts=0
    data =json.loads(arr)
    for i in data:
        # return int(i[2])
        if len(i)==0:
            sumqty=0
            sumvolume=0
            totalprice=0
        else:
            doc.append("ecommerce_item",{"item_code":str(i[5]),"volume":str(i[8]),"uom":str(i[4]),"qty":str(i[2]),"amount":str(i[3]),"description":i[1]})
            arrqty=[]
            arrqty.append(int(i[2]))
            sumqty=sum(arrqty)
            arrvolume=[]
            arrvolume.append(float(i[7]))
            sumvolume=sum(arrvolume)
            arrprice=[]
            arrprice.append(float(i[6]))
            totalprice=sum(arrprice)
    doc.total_volume= sumvolume
    doc.total_qty=sumqty
    doc.collection_amount=totalprice
    doc.save()
    return "SaveOrder"

@frappe.whitelist(allow_guest=True)
def selectItemCodeData(item_code):
    alldata=frappe.db.sql("""SELECT `tabItem`.item_name,`tabItem`.stock_uom ,`tabItem Barcode`.barcode, `tabItem`.volume_cf FROM tabItem INNER JOIN `tabItem Barcode` ON `tabItem Barcode`.parent =`tabItem`.name  WHERE  `tabItem`.name =%s """,item_code)
    return alldata
