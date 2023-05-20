
const Fastify = require("fastify");
const fastifyCors = require("fastify-cors");
const http = require("http");
const { initDB } = require("./db");
const ToDo = require("./db/models/ToDo.model");

const port = process.env.PORT || '3000';

const fastify = Fastify({logger:true});

fastify.get("/test", (req, res) => {
  return "KKKKKK" 
});


const start = async () => {
  try {
    await fastify.listen(port);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
start();
initDB();


fastify.post("/items", async (req, res) => {
  const todo = await ToDo.create({
    id: req.body.id,
    title: req.body.title,
  });
  return todo;
});

fastify.get("/items", async (_, res) => {
  try {
    const todoList = await ToDo.findAll(); //SELECT * FROM "ToDos"
    return todoList;//res.json({ todoList });
  } catch (error) {
    return error.message;
  }
});

fastify.get("/items/:id", async (req, res) => {
  try {
    const todo = await ToDo.findByPk(req.params.id);
    if (todo === null) {
      return "not found";
    } else {
      return todo;
    }
  } catch (error) {
    return error.message;
  }
});

fastify.patch("/items/:id", async (req, res) => {
  try {
    const todo = await ToDo.findByPk(req.params.id);
    if (todo === null) {
      return "not found";
    } else {
      await ToDo.update(
        {
          title: req.body.title,
          description:req.body.description
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      return todo;
    }
  } catch (error) {
    return error.message;
  }
});

fastify.delete("/items", async (req, res) => {
  try {
    await ToDo.destroy({ where: {} });
    return "ok";
  } catch (error) {
    return error.message;
  }
});

fastify.delete("/items/:id", async (req, res) => {
  try {
    const todo = await ToDo.findByPk(req.params.id);
    if (todo === null) {
      return "not found"
    } else {
      await ToDo.destroy({
        where: {
          id: req.params.id,
        },
      });
    }
    return todo;
  } catch (error) {
    return error.message;
  }
});

