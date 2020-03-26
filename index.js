'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server({
    port: 3010,
    host: 'localhost',
    routes: {
        cors: true
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }
});

let users = [{surname: "Jan", name: "Kos", address: "Cracov"},
    {surname: "Ziutek", name: "Czarny", address: "Cracov"},
    {surname: "Obviously", name: "Black", address: "Cracov"},
    {surname: "Upredictable", name: "Koala", address: "Cracov"},
    {surname: "Fliflo", name: "Damdam", address: "Cracov"},
    {surname: "Apprehend", name: "Condemned", address: "Cracov"}];

server.route({
    method: "GET",
    path: "/",
    handler: (req, rsp) => {
        return users
    },
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }
});

server.route({
    method: "PUT",
    path: "/",
    handler: (req, rsp) => {
        console.log('Put request data', req.payload.editUserValues);
        users = users.filter(function(el) {return JSON.stringify(el) !== JSON.stringify(req.payload.deleteUserValues)});
        console.log(users);
        return users
    },
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }
});

server.route({
    method: "DELETE",
    path: "/",
    handler: (req, rsp) => {

        console.log('Delete request data', req.payload.deleteUserValues);
        users = users.filter(function(el) {return JSON.stringify(el) !== JSON.stringify(req.payload.deleteUserValues)});
        console.log(users);

        return users
    },
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }
});

server.route({
    method: "POST",
    path: "/",
    handler: (req, rsp) => {

        console.log('Request data', req.payload.newUserValues);

        users.push(req.payload.newUserValues);
        console.log(users);
        return (users)
    },
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }
});

console.log('Server starting...');