var requestJSON = require('request-json');

var debug = require('debug')('aether:registry');

export default class ServiceRegistryProxy {
  constructor(config) {
    this.server = config["service-registry"]["server"];
    this.port = config["service-registry"]["port"];
    this.request = requestJSON.createClient(`http://${this.server}:${this.port}/`);
  }

  register(path, address) {
    // Assume address is a fully formed URL including the protocol.
    this.request.post(`/api/registry/register/${path}`, { address: address },
      (err, res, body) => {
        console.log(err);
        console.log(res);
        console.log(body);
      }
    );
  }

  get(path) {
    this.request.get(`get/${path}`, (err, res, body) => {
      console.log(body);
    });
  }
}
