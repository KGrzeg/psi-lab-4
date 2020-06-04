const chalk = require("chalk");
const net = require("net");
const udp = require("dgram");

const defaultIp = "127.0.0.1";
const defaultPort = 2137;

const { getTime } = require("./utils");

function runServer(protocol, port, ip) {
  switch (protocol) {
    case "tcp": {
      const server = net.createServer((socket) => {
        console.log(
          chalk`Recevied connection from {yellow ${socket.remoteAddress}:${socket.remotePort}}`
        );

        socket.on("data", (data) => {
          console.log(
            chalk`{grey ${getTime()} <<< from} {yellow ${
              socket.remoteAddress
            }:${socket.remotePort}} {white ${data.toString()}}`
          );

          socket.write(data);
          console.log(
            chalk`{grey ${getTime()} >>>   to} {yellow ${
              socket.remoteAddress
            }:${socket.remotePort}} {white ${data.toString()}}`
          );
        });

        socket.on("close", (error) => {
          if (error) {
            console.log(chalk`{red Error occured}`);
            socket.close();
          } else {
            console.log(
              chalk`Closed connection from {yellow ${socket.remoteAddress}:${socket.remotePort}}`
            );
          }
        });
      });

      server.listen(port, ip);
      console.log(
        chalk`Server {yellow ${protocol}} listen on {yellow ${ip}:${port}}`
      );

      return server;
    }
    case "udp": {
      const server = udp.createSocket("udp4");

      server.on("message", (msg, info) => {
        console.log(
          chalk`{grey ${getTime()} <<< from} {yellow ${info.address}:${
            info.port
          }} {white ${msg.toString()}}`
        );

        server.send(msg, info.port, info.address, (error) => {
          if (error) {
            server.close();
          } else {
            console.log(
              chalk`{grey ${getTime()} >>>   to} {yellow ${info.address}:${
                info.port
              }} {white ${msg.toString()}}`
            );
          }
        });
      });

      server.on("listening", () => {
        const address = server.address();
        const port = address.port;
        const ip = address.address;
        console.log(
          chalk`Server {yellow ${protocol}} listen on {yellow ${ip}:${port}}`
        );
      });

      server.on("close", () => {
        console.log(chalk`{red Socket is closed !}`);
      });

      server.bind(port, ip);
      return server;
    }
  }
}

function main() {
  if (process.argv.length <= 2) {
    console.log('$ server-ethernet.js <"tcp"|"udp"> [ip] [port]');
    process.exit(0);
  }

  const ip = process.argv[3] || defaultIp;
  const port = process.argv[4] || defaultPort;

  if (process.argv[2] == "udp") {
    runServer("udp", port, ip);
  } else {
    runServer("tcp", port, ip);
  }
}

main();
