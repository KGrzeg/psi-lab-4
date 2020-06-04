const chalk = require("chalk");
const net = require("net");
const readline = require("readline");
const udp = require("dgram");
const { performance } = require("perf_hooks");
const { toFixed, getTime } = require("./utils");

const defaultIp = "127.0.0.1";
const defaultPort = 2137;
const latencyPrecision = 3;

let rl, startTime;

function sendMessage(client, msg, protocol, port, ip) {
  switch (protocol) {
    case "tcp": {
      console.log(chalk`{grey ${getTime()} >>> }{white ${msg}}`);
      startTime = performance.now();
      client.write(msg);
      break;
    }
    case "udp": {
      startTime = performance.now();
      client.send(msg, port, ip, (error) => {
        if (error) {
          console.log(chalk`{red Error occured}`);
          client.close();
        } else {
          console.log(chalk`{grey ${getTime()} >>> }{white ${msg}}`);
        }
      });
    }
  }
}

function createSocket(protocol, port, ip) {
  switch (protocol) {
    case "tcp": {
      const client = new net.Socket();

      client.connect(port, ip, () => {
        console.log(chalk`Connected to {yellow ${ip}:${port}}`);
        process.stdout.write("> ");

        rl.on("line", (text) => {
          sendMessage(client, text, "tcp");
        });
      });

      client.on("data", (data) => {
        const latency = performance.now() - startTime;
        console.log(
          chalk`{grey ${getTime()} <<< }{white ${data.toString()}} {grey in ${toFixed(
            latency,
            latencyPrecision
          )}ms}`
        );
        process.stdout.write("> ");
      });

      client.on("close", () => {
        console.log(chalk`{red Connection closed}`);
        process.exit(0);
      });

      client.on("error", (error) => {
        console.log(chalk`{red Error occured ({grey ${error.message}})}`);
        console.log("Connection closed");
        process.exit(1);
      });

      return client;
    }
    case "udp": {
      const client = udp.createSocket("udp4");

      client.on("message", (msg) => {
        const latency = performance.now() - startTime;
        console.log(
          chalk`{grey ${getTime()} <<< }{white ${msg.toString()}} {grey in ${toFixed(
            latency,
            latencyPrecision
          )}ms}`
        );
        process.stdout.write("> ");
      });

      client.on("error", (error) => {
        console.log(chalk`{red Error occured ({grey ${error.message}})}`);
        console.log("Connection closed");
        process.exit(1);
      });

      process.stdout.write("> ");
      rl.on("line", (text) => {
        sendMessage(client, text, "udp", port, ip);
      });

      return client;
    }
  }
}

function main() {
  if (process.argv.length <= 2) {
    console.log('$ client-ethernet.js <"tcp"|"udp"> [ip] [port]');
    process.exit(0);
  }

  rl = readline.createInterface({
    input: process.stdin,
  });

  const ip = process.argv[3] || defaultIp;
  const port = process.argv[4] || defaultPort;

  if (process.argv[2] == "udp") {
    createSocket("udp", port, ip);
  } else {
    createSocket("tcp", port, ip);
  }
}

main();
