# Copyright (c) 2023, Eventiva and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class License(Document):
	def __init__(self, *args, **kwargs) -> None:
		super().__init__(*args, **kwargs)

	pass
