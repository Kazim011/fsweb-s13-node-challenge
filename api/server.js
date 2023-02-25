const express = require("express");

// Sunucunuzu yapılandırın
// Eylem routerınızı /api/actions/actions-router.js içinde oluşturun
// Proje roterlarınızı /api/projects/projects-router.js içinde oluşturun
// Bu dosyanın içinde `server.listen()` YAPMAYIN!

const projectsRouter = require("./projects/projects-router");
const actionRouter = require("./actions/actions-router");

const server = express();

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionRouter);

module.exports = server;
