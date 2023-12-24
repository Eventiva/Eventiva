# Copyright (c) 2023, Eventiva and Contributors
# See license.txt

# import frappe
import frappe
from frappe.tests.utils import FrappeTestCase


class TestDiscordCommand(FrappeTestCase):

	def test_creation(self):
		"""Test the creation of a DiscordCommand document."""
		# Setup
		test_command = 'test_command'
		test_description = 'A test command'

		# Execution
		discord_command = frappe.get_doc({
			'doctype': 'DiscordCommand',
			'command': test_command,
			'description': test_description
		})
		discord_command.insert()

		# Assertion
		self.assertTrue(discord_command.name)
		self.assertEqual(discord_command.command, test_command)
		self.assertEqual(discord_command.description, test_description)

		# Cleanup
		frappe.delete_doc('DiscordCommand', discord_command.name, force=1)

	# Add additional test methods here
