const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.post("/", async (req, res) => {
  const message = req.body.message?.text || "";

  if (message.includes("deploy develop")) {
    const githubToken =  ${{ secrets.PAT_TOKEN }};
    const repo = "RafaCervaLiver13/google-chat-bot ";
    const workflow = "myBag.yml";

    try {
      await axios.post(
        `https://api.github.com/repos/${repo}/actions/workflows/${workflow}/dispatches`,
        {
          ref: "develop",
        },
        {
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github+json",
          }
        }
      );

      return res.json({ text: "✅ Despliegue iniciado." });
    } catch (err) {
      return res.json({ text: "❌ Error al lanzar el workflow." });
    }
  }

  res.json({ text: "Comando no reconocido." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bot escuchando en puerto ${PORT}`);
});
