# psi-lab-4

![GitHub package.json version](https://img.shields.io/github/package-json/v/KGrzeg/psi-lab-4?style=flat-square)
![GitHub](https://img.shields.io/github/license/KGrzeg/psi-lab-4?style=flat-square)
![NodeJS](https://img.shields.io/badge/NodeJS-%23339933?style=flat-square&logo=node.js&logoColor=white)
![NodeJS](https://img.shields.io/badge/Visual%20Studio%20Code-%23007ACC?style=flat-square&logo=visual%20studio%20code)

## Wymagania:

- Środowisko NodeJS wraz z managerem zależności npm

## Instalacja

```sh
$ git clone git@github.com:KGrzeg/psi-lab-4.git
$ cd psi-lab-4
$ npm i
```

## Serwer

```sh
$ node server-ethernet.js <tcp|udp> [ip] [port]
```

### przykłady

```sh
$ node server-ethernet.js tcp
$ node server-ethernet.js udp
$ node server-ethernet.js tcp 10.0.0.1
$ node server-ethernet.js udp 192.168.0.4 9001
```

## Klient

```sh
$ node client-ethernet.js <tcp|udp> [ip] [port]
```

### przykłady

```sh
$ node client-ethernet.js tcp
$ node client-ethernet.js udp
$ node client-ethernet.js tcp 10.0.0.1
$ node client-ethernet.js udp 192.168.0.4 9001
```
