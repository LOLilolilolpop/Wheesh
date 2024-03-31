const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'daddymad9@gmail.com',
        pass: 'KobeBryant@0824'
    }
});

exports.sendScheduledEmail = functions.pubsub.schedule('* * * * *').onRun(async (context) => {
    const scheduledEmailsRef = admin.firestore().collection('scheduledEmails');

    try {
        const snapshot = await scheduledEmailsRef.get();
        const now = new Date(); // Get current date and time
        const currentTime = now.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format

        snapshot.forEach(async (doc) => {
            const data = doc.data();
            const { email, subject, message, date } = data;

            // Check if the scheduled date matches the current date
            if (date === currentTime) {
                // Send email
                await transporter.sendMail({
                    from: 'daddymad9@gmail.com',
                    to: email,
                    subject: subject,
                    text: message
                });

                // Delete the document from Firestore after sending the email
                await doc.ref.delete();
            }
        });
    } catch (error) {
        console.error('Error sending scheduled emails:', error);
    }
});
