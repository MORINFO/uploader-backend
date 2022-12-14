import 'dotenv/config'
import express from "express";
import Routes from "./Routes";
import cors from "cors"

const app = express()

app.use(express.json())

app.use(cors({
    origin: ["https://morinfo.com.br", "https://encurta.morinfo.com.br", "http://localhost:3000", "https://e.morinfo.com.br", "https://em.fly.dev"]
}))

app.get("/home", async (req, res) => {

    return res.json({ "message": "helloupdate" })
})

app.use(Routes)

app.listen(process.env.PORT, () => { console.log('servidor aberto!') })