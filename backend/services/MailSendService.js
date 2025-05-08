const nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3fa54e3cb796f9",
    pass: "74f0b2fde808b1"
  }
});

const sender = {
  address: "hello@example.com",
  name: "Mailtrap Test",
};

async function sendFavoriteNotification(userEmail, productTitle) {
  try {
    await transport.sendMail({
      from: sender,
      to: [userEmail],
      subject: "Produto favoritado com sucesso!",
      text: `Você favoritou o produto: ${productTitle}`,
      category: "Favorito",
      sandbox: true,
    });
    console.log("E-mail de favorito enviado com sucesso!");
  } catch (err) {
    console.error("Erro ao enviar e-mail de favorito:", err);
  }
}

module.exports = sendFavoriteNotification;