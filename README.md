# psi-lab-4

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
