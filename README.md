# bonnacafe

## Site da lanchonete

### Comandos para subir as alterações da máquina local para o GitHub

Perfeito 👏 — esse é **o cenário ideal** de trabalho com Git e GitHub:

- 💻 **sua máquina local (VS Code)** → desenvolve e faz _commits/push_ para o **GitHub**
- 🌐 **sua VPS (Ubuntu)** → apenas faz _pull_ para atualizar o código que está rodando lá

Vamos configurar isso direitinho passo a passo 👇

---

## 🧩 1️⃣ Na sua máquina local (VS Code)

Você já fez o mais importante — o commit e push funcionaram.
Mas vale revisar o básico:

1. No terminal do seu projeto local, confirme o repositório remoto:

   ```bash
   git remote -v
   ```

   Deve aparecer algo como:

   ```
   origin  git@github.com:seu-usuario/seu-repo.git (fetch)
   origin  git@github.com:seu-usuario/seu-repo.git (push)
   ```

2. Quando quiser enviar alterações para o GitHub:

   ```bash
   git add .
   git commit -m "Atualização X"
   git push origin main
   ```

💡 Dica: se o nome da sua branch for `master` ou algo diferente de `main`, ajuste o comando conforme.

---

## 🧰 2️⃣ Na VPS (usuário `ubuntu`)

Agora a VPS será o **ambiente de deploy**, ou seja, ela só vai **buscar atualizações** do GitHub.

1. Vá até o diretório onde quer manter o projeto:

   ```bash
   cd /opt/docker/seu-projeto
   ```

2. Se ainda não clonou o repositório lá:

   ```bash
   git clone git@github.com:seu-usuario/seu-repo.git .
   ```

   > O `.` no final serve para clonar direto dentro da pasta atual.

3. Depois, para atualizar a qualquer momento:

   ```bash
   git pull origin main
   ```

Isso vai baixar **somente as alterações** que você fez na sua máquina local e subiu para o GitHub.

---

## 🔐 3️⃣ Garantindo que o SSH está certo na VPS

Como você agora usa o **usuário `ubuntu`**, verifique se ele tem a **chave SSH configurada no GitHub**.

No VPS:

```bash
cat ~/.ssh/id_ed25519.pub
```

Copie a chave e adicione no GitHub em
➡️ **Settings → SSH and GPG keys → New SSH key**

Depois teste:

```bash
ssh -T git@github.com
```

Saída esperada:

```
Hi seu-usuario! You've successfully authenticated, but GitHub does not provide shell access.
```

---

## ⚙️ 4️⃣ Fluxo de trabalho completo

| Ação                | Local                | Comando                            |
| ------------------- | -------------------- | ---------------------------------- |
| Editar código       | **VS Code (seu PC)** | editar arquivos                    |
| Commitar alterações | VS Code terminal     | `git add . && git commit -m "msg"` |
| Enviar para GitHub  | VS Code terminal     | `git push origin main`             |
| Atualizar VPS       | VPS (SSH)            | `git pull origin main`             |

---

## 💡 5️⃣ Dicas extras

- Se o código na VPS é usado por containers, depois de dar o `git pull`, você pode:

  ```bash
  docker-compose down && docker-compose up -d
  ```

  Isso recarrega o container com o novo código.

- Se quiser automatizar isso (deploy automático), dá pra usar **GitHub Actions** para fazer o _deploy_ na VPS via SSH — mas isso é opcional.

---

Quer que eu te mostre **como automatizar esse `git pull` + `docker-compose up -d`** com um script (tipo `deploy.sh`) que você executa com um único comando?
