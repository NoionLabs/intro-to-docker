% Introduction To Docker
% Jordan Schatz
% Thursday, 27. October 2016

## About the slides

These slides are more cliff notes then presentation. Their purpose is simply to
be faster than whiteboarding. This will be an interactive session, and we will
be jumping between to the command line a lot. If you would like a copy of the
slides to follow along with you clone a copy from:

[https://github.com/NoionLabs/intro-to-docker.git](https://github.com/NoionLabs/intro-to-docker.git)

## Containers vs VMs

- Hardware ⟶ VMs ⟶ Containers

## Docker Engine & Docker CLI

### &nbsp;

### Dockerfiles and the registry

### What is a docker image / why are they?

### Different Base OS's
  - [Ubuntu](https://hub.docker.com/_/ubuntu/)
  - [CentOS](https://hub.docker.com/_/centos/)
  - [Debian](https://hub.docker.com/_/debian/)
  - [Alpine](https://hub.docker.com/_/alpine/)
  - [Busybox](https://hub.docker.com/_/busybox/)

### _or_ jump straight to an application or stack
  - [PHP](https://hub.docker.com/_/php/)
  - [NodeJS](https://hub.docker.com/_/node/)
  - [PostgreSQL](https://hub.docker.com/_/postgres/)
  - _etc_

### Scratch image and minimal images

```dockerfile
FROM scratch
```

_or_

<center>
See the Alpine based images
(ie [mhart/node](https://hub.docker.com/r/mhart/alpine-node/) )
</center>

### Dockerfile Context
### Client server model
### Image inheritance
### "Hacks" (the good kind)

- Sharing image layers
- Context free images
- .dockerignore

### Dockerfiles are portable

- Any machine should be able to build them.
- The registry can build them for you

### The short list of Dockerfile commands

- FROM
- MAINTAINER
- RUN
- ADD/COPY*
- WORKDIR
- CMD
- ENV

### A note about Add/Copy

Although ADD and COPY are functionally similar, generally speaking, COPY is
preferred. That’s because it’s more transparent than ADD. COPY only supports the
basic copying of local files into the container, while ADD has some features
(like local-only tar extraction and remote URL support) that are not immediately
obvious. Consequently, the best use for ADD is local tar file auto-extraction
into the image, as in ADD rootfs.tar.xz /.

[See docker best practice docs →](https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/#/add-or-copy)

## Docker is like git

### What is a repository?

<center>
REPOSITORY / IMAGE : TAG
</center>

### Docker Pull

```bash
docker pull alpine:3.4
```

### Docker Commit

```bash
docker run -it alpine:3.4 sh
# Edit the image (suggestion: rm -rf /)
docker commit CONTAINER-HASH bad-idea
docker images | grep bad-idea
```

### Docker Push

```bash
docker push REPOSITORY-NAME
```

### Docker Tag

```bash
docker tag bad-idea bad-idea:v3
docker images | grep bad-idea
```

## Runtime Config

### 12 Factor App Pattern

<center>
[12Factor.net](https://12factor.net/)
</center>

### Environment Variables

- Why is this a good idea again?
- _Demo_

### Level up with Docker Compose

Ok, So we are getting too many commandline arguments to remember, now what?

### Docker Compose

### It's YAML (Whats YAML?, it's JSON...)

```bash
python -c 'import sys, yaml, json;
json.dump(yaml.load(sys.stdin), sys.stdout, indent=4)' \
           < docker-compose.yml
```

### Docker-compose file v1 vs v2

### Multi-Container Setups

<center>
See examples/compose-example/docker-compose.yml
</center>

### External Networking Links

```yaml
ports:
  - "outside:inside"
  - "80:80"
```

### Inter-container networking

<center>
It's simple: use DNS <br>
See examples/compose-example/dockerfiles/proxy/default.conf
</center>

## Volumes

### Dev time


### Prduction time

Limit their use, but it's ok if you do use it...

## Bits n Pieces

### Docker Machine

- Handles provisioning
- Makes it easy to switch between machines
- [Machine Export](https://www.npmjs.com/package/machine-share )

### Logging

- json-file
- syslog
- journald
- gelf
- fluentd
- awslogs
- splunk
- etwlogs
- gcplogs
- ...

<aside class="notes">
Demo logging locally <br />
Demo logging on Bobosales <br />
Remember -f
</aside>

### Stats

```bash
docker stats
```

### Fancier Monitoring

```bash
docker run \
  --volume=/:/rootfs:ro \
  --volume=/var/run:/var/run:rw \
  --volume=/sys:/sys:ro \
  --volume=/var/lib/docker/:/var/lib/docker:ro \
  --publish=8080:8080 \
  --detach=true \
  --name=cadvisor \
  google/cadvisor:latest
```

## What this means for Application Architecture

1. Microservices
2. Add-on services (PostgREST, Varnish, etc).

### And for Dev

One command, to setup the dev environment, no matter hard complicated, no matter
what project you are on, no matter what platform you are on: `docker-compose up`

### And for Ops

1. Immutable Infrastructure
2. Phoenix Servers ( [Video Martin Fowler - Infrastructure As Code](https://www.youtube.com/watch?v=ueAef9tNUck) )
3. Canary releases

## Scale **UP**

1. Docker Swarm
2. Kubernetes
3. Triton
4. Many more: AWS container services, Mesos, DC/OS, SmartOS etc.
