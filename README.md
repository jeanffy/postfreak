# Postfreak

This is an example of using `.hhtp` files to automate calling a REST API.

The [httpYac](https://httpyac.github.io) is used to executed `.http` files.

# Usage

Copy the `requests/.env.dist` file to create an environment (in the same folder). The name of the environment will be the file extension (for example the file `.env.foo` will represent the "foo" environment).

Fill in the values of the variables in the newly created file (or use default).

- get version info `npx httpyac requests/base.http -e foo -n get-version`
- v1
  - get public route `npx httpyac requests/v1.http -e foo -n get-public`
  - get users `npx httpyac requests/v1.http -e foo -n get-users`
  - create user `npx httpyac requests/v1.http -e foo -n create-user`
  - get user `npx httpyac requests/v1.http -e foo -n get-user`

# Demo server

A demo server is implemented in the `src` directory.

> Warning: this demo server is here only for demonstration purpose and is not meant to be secure nor optimized. Don't use it as a starting point.

# VSCode

Requests can be triggered directly from VSCode using the plugin https://httpyac.github.io/guide/installation_vscode.html.
