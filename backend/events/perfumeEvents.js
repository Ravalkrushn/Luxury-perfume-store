const EventEmitter = require("events");

class PerfumeEmitter extends EventEmitter { }

const perfumeEmitter = new PerfumeEmitter();


perfumeEmitter.on("perfumeAdded", (data) => {
  console.log("EVENT: Perfume Added →", data.name);
});

perfumeEmitter.on("perfumeUpdated", (id) => {
  console.log("EVENT: Perfume Updated → ID:", id);
});

perfumeEmitter.on("perfumeDeleted", (id) => {
  console.log("EVENT: Perfume Deleted → ID:", id);
});

module.exports = perfumeEmitter;
