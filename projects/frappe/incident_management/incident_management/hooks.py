###
# @format
# -----
# Project: @eventiva/eventiva
# File: hooks.py
# Path: \projects\modules\incident_management\incident_management\hooks.py
# Created Date: Sunday, January 14th 2024
# Author: Jonathan Stevens, jonathan@resnovas.com
# Github: https://github.com/TGTGamer
# -----
# Contributing: Please read through our contributing guidelines.
# Included are directions for opening issues, coding standards,
# and notes on development. These can be found at
# https://github.com/eventiva/eventiva/blob/develop/CONTRIBUTING.md
# -----
# Code of Conduct: This project abides by the Contributor Covenant, v2.0
# Please interact in ways that contribute to an open, welcoming, diverse,
# inclusive, and healthy community. Our Code of Conduct can be found at
# https://github.com/eventiva/eventiva/blob/develop/CODE_OF_CONDUCT.md
# -----
# Copyright (c) 2024 Resnovas - All Rights Reserved
# LICENSE: GNU General Public License v2.0 or later (GPL-2.0-or-later)
# -----
# This program has been provided under confidence of the copyright holder and
# is licensed for copying, distribution and modification under the terms
# of the GNU General Public License v2.0 or later (GPL-2.0-or-later) published as the License,
# or (at your option) any later version of this license.
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License v2.0 or later for more details.
# You should have received a copy of the GNU General Public License v2.0 or later
# along with this program. If not, please write to: jonathan@resnovas.com,
# or see https://www.gnu.org/licenses/old-licenses/gpl-2.0-standalone.html
# -----
# This project abides by the GPL Cooperation Commitment.
# Before filing or continuing to prosecute any legal proceeding or claim
# (other than a Defensive Action) arising from termination of a Covered
# License, we commit to extend to the person or entity ('you') accused
# of violating the Covered License the following provisions regarding
# cure and reinstatement, taken from GPL version 3.
# For further details on the GPL Cooperation Commitment please visit
# the official website: https://gplcc.github.io/gplcc/
# -----
# DELETING THIS NOTICE AUTOMATICALLY VOIDS YOUR LICENSE
###

app_name = "incident_management"
app_title = "Incident Management"
app_publisher = "Eventiva"
app_description = "Manage Incidents and Investigations"
app_email = "incident.management.application@eventiva.co.uk"
app_license = "mit"
# required_apps = []

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/incident_management/css/incident_management.css"
# app_include_js = "/assets/incident_management/js/incident_management.js"

# include js, css files in header of web template
# web_include_css = "/assets/incident_management/css/incident_management.css"
# web_include_js = "/assets/incident_management/js/incident_management.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "incident_management/public/scss/website" 

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "incident_management/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
#	"methods": "incident_management.utils.jinja_methods",
#	"filters": "incident_management.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "incident_management.install.before_install"
# after_install = "incident_management.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "incident_management.uninstall.before_uninstall"
# after_uninstall = "incident_management.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "incident_management.utils.before_app_install"
# after_app_install = "incident_management.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "incident_management.utils.before_app_uninstall"
# after_app_uninstall = "incident_management.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "incident_management.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
#	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
#	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
#	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
#	"*": {
#		"on_update": "method",
#		"on_cancel": "method",
#		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
#	"all": [
#		"incident_management.tasks.all"
#	],
#	"daily": [
#		"incident_management.tasks.daily"
#	],
#	"hourly": [
#		"incident_management.tasks.hourly"
#	],
#	"weekly": [
#		"incident_management.tasks.weekly"
#	],
#	"monthly": [
#		"incident_management.tasks.monthly"
#	],
# }

# Testing
# -------

# before_tests = "incident_management.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
#	"frappe.desk.doctype.event.event.get_events": "incident_management.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
#	"Task": "incident_management.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["incident_management.utils.before_request"]
# after_request = ["incident_management.utils.after_request"]

# Job Events
# ----------
# before_job = ["incident_management.utils.before_job"]
# after_job = ["incident_management.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
#	{
#		"doctype": "{doctype_1}",
#		"filter_by": "{filter_by}",
#		"redact_fields": ["{field_1}", "{field_2}"],
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_2}",
#		"filter_by": "{filter_by}",
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_3}",
#		"strict": False,
#	},
#	{
#		"doctype": "{doctype_4}"
#	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
#	"incident_management.auth.validate"
# ]
