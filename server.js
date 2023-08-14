import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use((req, res, next) => {
  setTimeout(next, 500);
});
server.use('/api', router);
server.listen(3055, () => {
  // eslint-disable-next-line no-console
  console.log('JSON Server is running');
});
