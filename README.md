# Introduction

This is an express.js application that has no purpose but being a demo for other more significant projects.


# Install and Run

The app doesn't have to be configured much for installation. The most important things will be
in `Dockerfile` and `.env`.


## Building

Building the docker image is straight forward enough.
Just follow these easy steps:

  * Configure your environment variables
  * Execute the `docker build -t <image-name> .` command
  * Run the container with `docker run --name=<container-name> -p <port:port> <image-name>`

You could run the container with `-d` to run it in detached mode.

## Database

I am using Postgresql for this demo. You can use whatever you like. It's up to you. :)

In my case I am running Postgres as a separate container.

`docker run --name=<container-name> -e <env vars> -p <port:port> postgres:latest`

## Networking

You might want to run it in a network since you'll need a way to access the postgres database anyway.

To create a docker network you have to run this command

`docker network create <network-name>`

To check if you created it you can run

`docker network ls`

Now you need to add your Postgres database container to this local network as well as the express app container.

`docker network connect <network-name> <container-name>`
