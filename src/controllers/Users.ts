import { Request, Response } from "express";
import prisma from "../Prisma";

class UsersController {

    static async index(req: Request, res: Response) {
        try {
            
            const busca_users = await prisma.usuarios.findMany()

            if (!busca_users) {
                return res.status(500).json({"erro": "erro ao buscar usuarios"})
            }

            return res.json(busca_users)

        } catch (error) {
            return res.status(500).json({"erro": "erro ao buscar usuarios"})
        }
    }

    static async show(req: Request, res: Response) {
        try {

            const { email } = req.params

            if (!email || email == 'public') {
                return res.status(401).json({ "error": "email ausente" })
            }

            let busca_links = await prisma.usuarios.findFirst({
                where: {
                    email: email
                },
                include: {
                    links: {
                        orderBy: {
                            id: "desc"
                        }
                    }
                }
            })

            return res.json({
                email: email,
                links: busca_links?.links.filter(item => item.tipo == 'link'),
                files: busca_links?.links.filter(item => item.tipo == 'file')
            })

        } catch (error) {
            return res.status(400).json(error)
        }
    }
}

export default UsersController