import app from './app';
import middlewares from './middlewares';
import router from './routes';

const port = process.env.PORT || 4000;

app.use(middlewares);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
  console.log(`service on ${port} ...`);
});
