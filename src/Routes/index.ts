import { Router } from "express";
import LinksController from "../controllers/Links";
import UsersController from "../controllers/Users";

const Routes = Router()

// ------------- Rotas Links ------------- \\
Routes.get("/links", LinksController.index)
Routes.get("/link/:link", LinksController.show)
Routes.post("/cria-link", LinksController.store)
Routes.put("/link/:link", LinksController.update)
Routes.delete("/delete-link", LinksController.destroy)

// ------------- Rotas Users ------------- \\
Routes.get("/users", UsersController.index)
Routes.get("/users/:email", UsersController.show)

export default Routes