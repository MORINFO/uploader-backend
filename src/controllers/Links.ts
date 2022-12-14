import { Request, Response } from "express";
import prisma from "../Prisma";

export class LinksController {

    static async index(req: Request, res: Response) {
        try {

            const busca_links = await prisma.links.findMany({
                orderBy: {
                    created_at: "desc"
                },
                take: 100
            })

            if (!busca_links) {
                return res.status(500).json({ "erro": "erro ao buscar links" })
            }



            return res.json(busca_links)

        } catch (error) {
            return res.status(500).json({ "erro": "erro ao buscar links" })
        }
    }

    static async show(req: Request, res: Response) {
        try {

            const { link } = req.params

            if (!link) {
                return res.status(401).json({ "error": "link ausente" })
            }

            let busca_links = await prisma.links.findFirst({
                where: {
                    link_encurtado: link
                }
            })

            if (!busca_links) {
                return res.status(404).json({ "error": "link inexistente" })
            }

            await prisma.links.update({
                where: {
                    id: busca_links.id
                },
                data: {
                    clicks: busca_links.clicks + 1
                }
            })

            return res.json(busca_links)

        } catch (error) {
            return res.status(400).json(error)
        }
    }

    static async update(req: Request, res: Response) {
        try {

            const { link } = req.params

            if (!link) {
                return res.status(401).json({ "error": "link ausente" })
            }

            let busca_links = await prisma.links.findFirst({
                where: {
                    link_encurtado: link
                }
            })

            if (!busca_links) {
                return res.status(404).json({ "error": "link inexistente" })
            }

            await prisma.links.update({
                where: {
                    id: busca_links.id
                },
                data: {
                    clicks: busca_links.clicks + 1
                }
            })

            return res.json({"message": "cliques atualizados!"})

        } catch (error) {
            return res.status(400).json(error)
        }
    }

    static async store(req: Request, res: Response) {

        try {

            let { email, nome, link, tamanho, tamanho_completo, caminho, tipo } = req.body

            email ? email : email = 'public'

            if (!link) {
                return res.status(401).json({ "error": "link ausente" })
            }

            if (email) {

                let busca_usuarios = await prisma.usuarios.findFirst({
                    where: {
                        email: email
                    }
                })

                if (!busca_usuarios) {
                    await prisma.usuarios.create({
                        data: {
                            email: email
                        }
                    })
                }
            }

            console.log(link)
            const cria_link = await prisma.links.create({
                data: {
                    email: email,
                    tipo: tipo,
                    nome: nome,
                    link: link,
                    link_encurtado: (Math.random().toString(36).substring(2)),
                    tamanho: tamanho,
                    tamanho_completo: tamanho_completo,
                    caminho: caminho
                }
            })

            return res.json(cria_link)

        } catch (error) {
            console.log(error)
            return res.status(400).json(error)
        }
    }

    static async destroy(req: Request, res: Response) {

        try {
            let { email, id } = req.query

            console.log(email, id)

            let busca_links = await prisma.links.findFirst({
                where: {
                    id: Number(id),
                    email: String(email)
                }
            })

            if (!busca_links) {
                return res.status(404).json({ "error": "link não encontrado" })
            }

            await prisma.links.delete({
                where: {
                    id: busca_links?.id,
                }
            })

            return res.json({ "message": "link deletado" })
        } catch (error) {
            return res.status(500)
        }

    }
}

export default LinksController