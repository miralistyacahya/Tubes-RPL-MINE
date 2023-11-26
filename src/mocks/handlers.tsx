import { setupServer } from 'msw/node';
import { rest } from 'msw';

const server = setupServer(
  // Define your request handlers here
  rest.get('/cartpage', (req, res, ctx) => {
    // Your response logic
    return res(ctx.json({ message: 'Hello, World!' }));
  }),
);

export { server };
