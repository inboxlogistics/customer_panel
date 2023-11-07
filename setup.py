from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in customer_panel/__init__.py
from customer_panel import __version__ as version

setup(
	name="customer_panel",
	version=version,
	description="Customer Panel",
	author="rawasrazak3@gmail.com",
	author_email="rawasrazak3@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
