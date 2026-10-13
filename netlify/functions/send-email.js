// netlify/functions/send-email.js


exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  const { templateType, from_name, from_email, subject, budget, message, to_email } = JSON.parse(event.body);

  // Map the incoming type to the correct environment variable
  const templateMap = {
    'contact': process.env.EMAILJS_CONTACT_TEMPLATE_ID,
    'support': process.env.EMAILJS_SUPPORT_TEMPLATE_ID
  };

  const selectedTemplate = templateMap[templateType];

  if (!selectedTemplate) {
    return { statusCode: 400, body: "Invalid template type" };
  }

  const data = {
    service_id: process.env.EMAILJS_SERVICE_ID,
    template_id: selectedTemplate, // Use the mapped ID
    user_id: process.env.EMAILJS_PUBLIC_KEY,
    accessToken: process.env.EMAILJS_PRIVATE_KEY,
    template_params: {
      from_name: from_name,
      from_email: from_email,
      message: message,
      subject: subject,
      budget: budget,
      to_email: to_email
    }
  };

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const resultText = await response.text(); 
    console.log("EmailJS Response:", resultText); // Check this in Netlify Function Logs

    
    return response.ok 
      ? { statusCode: 200, body: "Sent!" } 
      : { statusCode: response.status, body: await response.text() };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};
