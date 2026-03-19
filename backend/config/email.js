const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, text) => {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev", // keep this for now
      to: [to], // ✅ MUST be array
      subject: subject,
      html: `<p>${text}</p>`,
    });

    console.log("Resend Response:", response); // 🔥 IMPORTANT

  } catch (error) {
    console.error("Resend error:", error);
    throw new Error("Email sending failed");
  }
};

module.exports = sendEmail;