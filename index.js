const express = require("express");
const app = express();

// rotas
app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

// porta da Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
