// // src/utils/sendMail.js
// import nodemailer from 'nodemailer';

// export const sendMail = async ({ to, subject, html }) => {
//   console.log(`to=>`,to);
  
//   try {
//     const transporter = nodemailer.createTransport({
//       host: 'smtp.zoho.in', // Zoho Mail SMTP server
//       port: 465, // Use 587 if you're using TLS
//       secure: true, // Use TLS (true for SSL, false for TLS)
//       auth: {
//         user:'souravdas23@zohomail.in',// process.env.MAIL_USER || 'souravdas23@zohomail.in', // Your Zoho Mail email
//         pass: 'V9zVPc6eq7iV',// process.env.MAIL_PASS, // Zoho Mail app-specific password
//       },
//       tls: {
//         rejectUnauthorized: false, // Disable rejection of unauthorized certs
//       },
//     });

//     const mailOptions = {
//       from: `"CS_MANAGE 📚" <${process.env.MAIL_USER}>`,
//       to,
//       subject,
//       html, // Can be plain text or HTML
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log('📬 Email sent:', info.messageId);
//   } catch (err) {
//     console.error('❌ Mail send failed:', err.message);
//     throw err;
//   }
// };
import nodemailer from 'nodemailer';

export const sendMail = async ({ to, subject, html }) => {
  console.log(`Sending email to: ${to}`);
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.in',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER || 'souravdas23@zohomail.in',
        pass: process.env.MAIL_PASS || 'V9zVPc6eq7iV',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `"CS_MANAGE 📚" <${process.env.MAIL_USER || 'souravdas23@zohomail.in'}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('📬 Email sent:', info.messageId);
    return info;
  } catch (err) {
    console.error('❌ Mail send failed:', err.message);
    throw err;
  }
};