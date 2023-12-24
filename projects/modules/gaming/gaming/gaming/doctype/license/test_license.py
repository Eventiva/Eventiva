# Copyright (c) 2023, Eventiva and contributors
# For license information, please see license.txt

from frappe.tests.utils import FrappeTestCase

from .license import License


class TestLicense(FrappeTestCase):
    def test_dummy(self):
        license = License()
        self.assertTrue(isinstance(license, License), "License object creation failed.")
