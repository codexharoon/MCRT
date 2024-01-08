const {addFeedbackQuery} = require('../Models/contactUsModel')
const transporter = require('../Config/nodeMailerConfig')
const addFeedbackAndSendEmail = async (req, res) => {
  try {
    const { userName, Email, Phone, Message } = req.body;

    // Add feedback to the database
    const newFeedback = await addFeedbackQuery({ userName, Email, Phone, Message });
    const mailOptions = {
      from: process.env.TEST_EMAIL, 
      to: process.env.RECPECIENT_EMAIL, 
      subject: `New Feeback recieved from ${newFeedback.userName}`,
      text: `
        New feedback received:
        User: ${newFeedback.userName}
        Email: ${newFeedback.Email}
        Phone: ${newFeedback.Phone}
        Message: ${newFeedback.Message}
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Error sending email' });
      }
      console.log('Email sent:', info.response);
      res.status(201).json({ message: 'Feedback added and email sent successfully', feedback: newFeedback });
    });
  } catch (error) {
    console.error('Error adding feedback:', error);
    res.status(500).json({ error: 'Error adding feedback' });
  }
};

module.exports = {
  addFeedbackAndSendEmail,
};

