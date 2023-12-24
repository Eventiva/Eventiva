from frappe.tests.utils import FrappeTestCase

from .license import License


class TestLicense(FrappeTestCase):
    def test_instance_creation(self):
        """
        Test that a License instance can be created.
        """
        license = License()
        self.assertIsInstance(license, License, "License instance was not created successfully.")
