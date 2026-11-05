const app = require('./app')
const pool = require('./config/database')

const PORT = process.env.PORT || 3000

async function startServer() {
    try {
        const connection = await pool.getConnection()
        console.log("Conexão com MySQL estabelecida! ✔️")

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT} 🚀`)
        })
    } catch (erro) {
        console.erro("Erro ao conectar ao banco de dados:", erro)
        process.exit(1)
    }
}

startServer()