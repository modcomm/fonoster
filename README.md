
# YAPS [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Programmable%20Voice%20&url=https://github.com/fonoster/yaps&via=fonoster&hashtags=voip,sip,webrtc,telephony)

YAPS stands for **Y**et **A**nother **P**hone **S**ystem, and like the name states it is mainly a telephony system; while currently focused on Voice over Internet Protocol(VoIP) and PSTN, its power lies in its ability to be easily extended with ARI applications and rich RESTful APIs.

[![Join the chat at https://gitter.im/fonoster/yaps](https://badges.gitter.im/fonoster/yaps.svg)](https://gitter.im/fonoster/yaps?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

:warning: Not yet production ready

## Deployment

### Docker Compose

<img src="https://github.com/fonoster/yaps/blob/master/docs/images/compose.png" width="120">

You must have docker and docker-compose to run this platform

&#10122; Run using docker-compose

```bash
docker-compose up
```

&#10123; Configure your endpoints

Use the information located on `bootstrap.yml` to configure your sip-phones.

### Docker Swarm

<img src="https://github.com/fonoster/yaps/blob/master/docs/images/swarm.png" height="65">

Comming soon...

### Kubernetes

<img src="https://github.com/fonoster/yaps/blob/master/docs/images/k8s.png" height="50">

Comming soon...

## Features

YAPS' main features are:

- Typical SIP Server functions; Proxy, Registrar, Location Service
- Per node Multi-Tenancy/Multi-Domain with Domain level Access Control List
- Transport: TCP, UDP, TLS, WebSocket
- Database: Redis
- Available on Docker and Kubernetes environments
- AGI/ARI application server
- Configurable routing strategies; Intra-Domain, Domain Ingress, Domain Egress and Peer Egress

## Bugs and Feedback

For bugs, questions, and discussions please use the [Github Issues](https://github.com/fonoster/yaps/issues)

> We are currently unable to place calls using UDP do to NAT issues.

## Contributing

For contributing, please see the following links:

 - [Contribution Documents](https://github.com/fonoster/yaps/blob/master/CONTRIBUTING.md)
 - [Contributors](https://github.com/fonoster/yaps/contributors)

## Authors
 - [Pedro Sanders](https://github.com/psanders)

## LICENSE
Copyright (C) 2019 by [Fonoster Inc](https://fonoster.com). MIT License (see [LICENSE](https://github.com/fonoster/yaps/blob/master/LICENSE) for details).
