const Koa = require('koa');
const staticServer = require('koa-static');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');

const app = new Koa(); 
app.use(staticServer(__dirname + '/dist'));

const index = require('./server/routers/index.js');


app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

// app.use(cors());


// routes
app.use(index.routes(), index.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

app.listen(3000, () => {
    console.log(`listening localhost:3000`);
});
