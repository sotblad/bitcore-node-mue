Muecore Node
============

A MonetaryUnit full node for building applications and services with Node.js. A node is extensible and can be configured to run additional services. At the minimum a node has an interface to [MonetaryUnit Core (mued) v0.12.1.x](https://github.com/muecoin/MUECore/tree/v0.12.1.x) for more advanced address queries. Additional services can be enabled to make a node more useful such as exposing new APIs, running a block explorer and wallet service.

## Usages

### As a standalone server

```bash
git clone https://github.com/muecoin/bitcore-node-mue
cd bitcore-node-mue
./bin/bitcore-node-mue start
```

When running the start command, it will seek for a .muecore folder with a bitcore-node-mue.json conf file.
If it doesn't exist, it will create it, with basic task to connect to mued.

Some plugins are available :

- Insight-API : `./bin/bitcore-node-mue addservice muecoin/insight-api-mue
- Insight-UI : `./bin/bitcore-node-mue addservice muecoin/insight-ui-mue`

You also might want to add these index to your mue.conf file :
```
-addressindex
-timestampindex
-spentindex
```

### As a library

```bash
npm install muecoin/bitcore-node-mue
```

```javascript
const bitcore-mue = require('bitcore-node-mue');
const config = require('./bitcore-node-mue.json');

let node = bitcore.scaffold.start({ path: "", config: config });
node.on('ready', function() {
    //MonetaryUnit core started
    mued.on('tx', function(txData) {
        let tx = new bitcore.lib.Transaction(txData);
    });
});
```

## Prerequisites

- MonetaryUnit Core (mued) (v0.12.1.x) with support for additional indexing *(see above)*
- Node.js v0.10, v0.12, v4 or v5
- ZeroMQ *(libzmq3-dev for Ubuntu/Debian or zeromq on OSX)*
- ~20GB of disk storage
- ~1GB of RAM

## Configuration

Bitcore-Mue includes a Command Line Interface (CLI) for managing, configuring and interfacing with your Bitcore-Mue Node.

```bash
bitcore-node-mue create -d <mue-data-dir> mynode
cd mynode
bitcore-node-mue install <service>
bitcore-node-mue install https://github.com/yourname/helloworld
bitcore-node-mue start
```

This will create a directory with configuration files for your node and install the necessary dependencies.

Please note that [MonetaryUnit Core](https://github.com/muecoin/MUECore/tree/master) needs to be installed first.

For more information about (and developing) services, please see the [Service Documentation](docs/services.md).

## Add-on Services

There are several add-on services available to extend the functionality of Bitcore:

- [Insight API](https://github.com/muecoin/insight-api-mue/tree/master)
- [Insight UI](https://github.com/muecoin/insight-ui-mue/tree/master)
- [Bitcore Wallet Service](https://github.com/muecoin/bitcore-wallet-service-mue/tree/master)

## Documentation

- [Upgrade Notes](docs/upgrade.md)
- [Services](docs/services.md)
  - [Mued](docs/services/mued.md) - Interface to MonetaryUnit Core
  - [Web](docs/services/web.md) - Creates an express application over which services can expose their web/API content
- [Development Environment](docs/development.md) - Guide for setting up a development environment
- [Node](docs/node.md) - Details on the node constructor
- [Bus](docs/bus.md) - Overview of the event bus constructor
- [Release Process](docs/release.md) - Information about verifying a release and the release process.


## Setting up dev environment (with Insight)

Prerequisite : Having a mued node already runing `mued --daemon`.

Bitcore-node-mue : `git clone https://github.com/muecoin/bitcore-node-mue -b develop`
Insight-api (optional) : `git clone https://github.com/muecoin/insight-api-mue -b develop`
Insight-UI (optional) : `git clone https://github.com/muecoin/insight-ui-mue -b develop`

Install them :
```
cd bitcore-node-mue && npm install \
 && cd ../insight-ui-mue && npm install \
 && cd ../insight-api-mue && npm install && cd ..
```

Symbolic linking in parent folder :
```
npm link ../insight-api-mue
npm link ../insight-ui-mue
```

Start with `./bin/bitcore-node-mue start` to first generate a ~/.bitcore-mue/bitcore-node-mue.json file.
Append this file with `"muecoin/insight-ui-mue"` and `"muecoin/insight-api-mue"` in the services array.

## Contributing

Please send pull requests for bug fixes, code optimization, and ideas for improvement. For more information on how to contribute, please refer to our [CONTRIBUTING](https://github.com/muecoin/bitcore-mue/blob/master/CONTRIBUTING.md) file.

## License

Code released under [the MIT license](https://github.com/muecoin/bitcore-node-mue/blob/master/LICENSE).

Copyright 2013-2015 BitPay, Inc.

- bitcoin: Copyright (c) 2009-2015 Bitcoin Core Developers (MIT License)
