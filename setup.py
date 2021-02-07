import os

from distutils.util import convert_path
from setuptools import setup, find_packages


ns = {}
with open(convert_path('tribler_debug_ui/__init__.py')) as fp:
    exec(fp.read(), ns)


def find_files(directory):
    return [os.path.join('..', path, fn) for (path, _, fns) in os.walk(directory) for fn in fns]


setup(
    name='tribler_debug_ui',
    version=ns['__version__'],
    packages=find_packages(),
    package_data={'': find_files('tribler_debug_ui/app/dist')},
    install_requires=["aiohttp"]
)
