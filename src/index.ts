/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import express from 'express';

const routeMain = express.Router({});

routeMain.get('/', function (req: any, res: any) {
  res.status(200).send('Hello World!');
});

routeMain.get('/webhook', function (req: any, res: any) {
  res.status(200).send('webhook');
});

export const http = routeMain;

exports.event = (event: any, callback: any) => {
  callback();
};
