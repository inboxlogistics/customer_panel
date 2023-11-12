import frappe

@frappe.whitelist(allow_guest=True)
def create_lead(first_name, email):
    lead = frappe.get_doc({
        "doctype": "Lead",
        "lead_name": frappe.generate_hash("", 10),
        "lead_name": first_name,
        "email_id": email,
        # Add more fields as needed
    })
    lead.insert(ignore_permissions=True)
    return lead.name
