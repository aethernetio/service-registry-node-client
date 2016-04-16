var requestJSON = require('request-json');

var debug = require('debug')('aether:registry');

export default class ServiceRegistryProxy {
  constructor(config) {
    this.host = config["service-registry"]["host"];
    this.port = config["service-registry"]["port"];
    this.request = requestJSON.createClient(`http://${this.host}:${this.port}/`);
  }

  register(path, address) {
    // Assume address is a fully formed URL including the protocol.
    this.request.post(`/api/registry/${path}`, { address: address },
      (err, res, body) => {
        if (body.result == "success") {
          debug("Registered with the service registry");
        } else {
          throw new Error(body.message);
        }
      }
    );
  }

  get(path) {
    this.request.get(`/api/registry/${path}`, (err, res, body) => {
      console.log(body);
    });
  }
}
