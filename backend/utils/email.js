const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Send email utility
const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return result;
    
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

// Email templates
const emailTemplates = {
  contactNotification: (contact) => ({
    subject: `New Contact: ${contact.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2c3e50;">Contact Details</h3>
          <p><strong>Name:</strong> ${contact.name}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
          <p><strong>Phone:</strong> ${contact.phone || 'Not provided'}</p>
          <p><strong>Company:</strong> ${contact.company || 'Not provided'}</p>
          <p><strong>Project Type:</strong> ${contact.projectType}</p>
          <p><strong>Budget:</strong> ${contact.budget}</p>
          <p><strong>Timeline:</strong> ${contact.timeline}</p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #2c3e50;">Subject</h3>
          <p style="background: #fff; padding: 15px; border-left: 4px solid #3498db; margin: 0;">
            ${contact.subject}
          </p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #2c3e50;">Message</h3>
          <div style="background: #fff; padding: 15px; border-left: 4px solid #27ae60; white-space: pre-wrap;">
            ${contact.message}
          </div>
        </div>
        
        <div style="background: #ecf0f1; padding: 15px; border-radius: 5px; margin-top: 20px;">
          <p style="margin: 0; font-size: 12px; color: #7f8c8d;">
            <strong>Submitted:</strong> ${new Date(contact.createdAt).toLocaleString()}<br>
            <strong>IP Address:</strong> ${contact.ipAddress}<br>
            <strong>Contact ID:</strong> ${contact._id}
          </p>
        </div>
      </div>
    `
  }),
  
  contactReply: (contact, replyMessage) => ({
    subject: `Re: ${contact.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Thank you for contacting me!</h2>
        
        <p>Hi ${contact.name},</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          ${replyMessage.replace(/\n/g, '<br>')}
        </div>
        
        <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
          <p style="font-size: 14px; color: #666;">
            <strong>Your original message:</strong><br>
            <em>Subject: ${contact.subject}</em><br>
            ${contact.message.replace(/\n/g, '<br>')}
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f1f2f6;">
          <p style="margin: 0; color: #666;">
            Best regards,<br>
            <strong>Your Name</strong>
          </p>
        </div>
      </div>
    `
  }),
  
  welcomeEmail: (user) => ({
    subject: 'Welcome to My Portfolio!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome ${user.name}!</h2>
        
        <p>Thank you for registering on my portfolio website. I'm excited to have you as part of the community!</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>What you can do:</h3>
          <ul>
            <li>Browse my latest projects</li>
            <li>Read my blog posts</li>
            <li>Get in touch through the contact form</li>
            <li>Follow my journey and updates</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
          <a href="${process.env.FRONTEND_URL}" 
             style="background: #3498db; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Visit My Portfolio
          </a>
        </div>
        
        <p style="margin-top: 30px; font-size: 14px; color: #666;">
          If you have any questions, feel free to reach out through the contact form.
        </p>
      </div>
    `
  })
};

module.exports = {
  sendEmail,
  emailTemplates,
  createTransporter
};
