# Tribler-debug-ui

A simple debug web interface for Tribler written in Angular.


# How to build

Ensure you have Python 3 and npm install. Next, execute the following commands from the root of this repository:

```
cd tribler_debug_ui/app
npm install
ng build --prod --base-href /debug-ui/
cd ../..
python setup.py bdist_wheel
```
