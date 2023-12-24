# Copyright (c) 2023, Eventiva and Contributors
# See license.txt

# import frappe
from frappe.tests.utils import FrappeTestCase
from .civilian import Civilian


class TestCivilian(FrappeTestCase):

	def test_instance_creation(self):
		"""
		Test that a Civilian instance can be created.
		"""
		civilian = Civilian()
		self.assertIsInstance(civilian, Civilian, "Civilian instance was not created successfully.")
