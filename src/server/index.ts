import { db } from './db';
import { publicProcedure, router } from './trpc';
import { z } from 'zod';

export const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    return db.post.findMany();
  }),
  addTodo: publicProcedure
    .input(z.object({ title: z.string(), description: z.string() }))
    .mutation((req) => {
      const addTodo = db.post.create({
        data: {
          title: req.input.title,
          description: req.input.description,
        },
      });
      return addTodo;
    }),
  deleteTodo: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation((req) => {
      return db.post.delete({ where: { id: req.input.id } });
    }),
});
export type AppRouter = typeof appRouter;
