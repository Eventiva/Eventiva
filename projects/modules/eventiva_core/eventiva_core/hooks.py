app_name = "eventiva_core"
app_title = "Eventiva Core"
app_publisher = "Eventiva"
app_description = "Envision a future with effortless event planning and management"
app_email = "eventiva.application@eventiva.co.uk"
app_license = "mit"
# required_apps = []

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/eventiva_core/css/eventiva_core.css"
# app_include_js = "/assets/eventiva_core/js/eventiva_core.js"

# include js, css files in header of web template
# web_include_css = "/assets/eventiva_core/css/eventiva_core.css"
# web_include_js = "/assets/eventiva_core/js/eventiva_core.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "eventiva_core/public/scss/website"

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
# app_include_icons = "eventiva_core/public/icons.svg"

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
#	"methods": "eventiva_core.utils.jinja_methods",
#	"filters": "eventiva_core.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "eventiva_core.install.before_install"
# after_install = "eventiva_core.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "eventiva_core.uninstall.before_uninstall"
# after_uninstall = "eventiva_core.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "eventiva_core.utils.before_app_install"
# after_app_install = "eventiva_core.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "eventiva_core.utils.before_app_uninstall"
# after_app_uninstall = "eventiva_core.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "eventiva_core.notifications.get_notification_config"

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
#		"eventiva_core.tasks.all"
#	],
#	"daily": [
#		"eventiva_core.tasks.daily"
#	],
#	"hourly": [
#		"eventiva_core.tasks.hourly"
#	],
#	"weekly": [
#		"eventiva_core.tasks.weekly"
#	],
#	"monthly": [
#		"eventiva_core.tasks.monthly"
#	],
# }

# Testing
# -------

# before_tests = "eventiva_core.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
#	"frappe.desk.doctype.event.event.get_events": "eventiva_core.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
#	"Task": "eventiva_core.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["eventiva_core.utils.before_request"]
# after_request = ["eventiva_core.utils.after_request"]

# Job Events
# ----------
# before_job = ["eventiva_core.utils.before_job"]
# after_job = ["eventiva_core.utils.after_job"]

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
#	"eventiva_core.auth.validate"
# ]
