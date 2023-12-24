# Copyright (c) 2023, Eventiva and Contributors
# See license.txt

# import frappe
from frappe.tests.utils import FrappeTestCase


class TestCivilian(FrappeTestCase):
    def test_dummy(self):
        civilian = Civilian()
        self.assertTrue(isinstance(civilian, Civilian), "Civilian object creation failed.")
