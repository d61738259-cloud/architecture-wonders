/**
 * WhatsApp Integration Service for Architecture Wonders
 * Official Business Number: +91 6280 609 005
 */

const BUSINESS_PHONE_CLEAN = '916280609005';

/**
 * Creates contextual pre-filled WhatsApp click-to-chat URL
 * @param {Object} options
 * @param {string} options.type - 'calculator', 'project', 'consultation'
 * @param {Object} options.data - Dynamic details
 */
export const generateContextualWhatsAppUrl = ({ type, data = {} }) => {
  let message = '';

  switch (type) {
    case 'calculator':
      message = `Hello Architecture Wonders! I just calculated an indicative estimate on your website:\n• Area: ${data.area || 'N/A'} sq ft\n• Property: ${data.propertyType || ''} (${data.category || ''})\n• Estimated Total: ₹${data.total ? data.total.toLocaleString('en-IN') : 'N/A'}\nReference: ${data.ref || ''}\nI would like to discuss a tailored consultation.`;
      break;

    case 'project':
      message = `Hello Architecture Wonders! I am inquiring about project reference "${data.projectTitle || 'Featured Project'}" located in ${data.location || 'Tri-city'}. I would like to explore a similar design for my home.`;
      break;

    case 'service':
      message = `Hello Architecture Wonders! I would like to enquire about your "${data.serviceName || 'Design'}" services for my residential property in ${data.location || 'Zirakpur/Chandigarh/Mohali'}.`;
      break;

    case 'general':
    default:
      message = `Hello Architecture Wonders team! I would like to schedule an architectural and interior design consultation for my property.`;
      break;
  }

  const encodedMessage = encodeURIComponent(message.trim());
  return `https://wa.me/${BUSINESS_PHONE_CLEAN}?text=${encodedMessage}`;
};

/**
 * Sends automated WhatsApp notification to administrator if Cloud API credentials are provided.
 * Gracefully logs status if credentials are unset.
 */
export const notifyAdminViaWhatsApp = async (enquiryData) => {
  const token = process.env.WHATSAPP_API_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const recipientPhone = process.env.ADMIN_NOTIFICATION_PHONE || BUSINESS_PHONE_CLEAN;

  if (!token || !phoneNumberId) {
    console.log(
      `[WhatsApp Service] WhatsApp Cloud API credentials not configured in environment (WHATSAPP_API_TOKEN / WHATSAPP_PHONE_NUMBER_ID). Notification skipped for Enquiry Ref: ${enquiryData.referenceNumber}. Contextual wa.me customer links remain 100% active.`
    );
    return {
      sent: false,
      reason: 'Missing API credentials in environment',
    };
  }

  try {
    const textBody = `🚨 *New Enquiry Received - Architecture Wonders*\nRef: ${enquiryData.referenceNumber}\nName: ${enquiryData.name}\nPhone: ${enquiryData.phone}\nType: ${enquiryData.enquiryType}\n${
      enquiryData.calculatorBreakdown?.estimatedGrandTotal
        ? `Estimate: ₹${enquiryData.calculatorBreakdown.estimatedGrandTotal.toLocaleString('en-IN')}`
        : ''
    }`;

    const res = await fetch(`https://graph.facebook.com/v18.0/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: recipientPhone,
        type: 'text',
        text: { body: textBody },
      }),
    });

    const result = await res.json();
    return { sent: true, result };
  } catch (error) {
    console.error('[WhatsApp Service Error]', error.message);
    return { sent: false, error: error.message };
  }
};
