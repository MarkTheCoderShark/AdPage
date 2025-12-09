import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, address } = req.body;

    if (!name || !email || !phone || !address) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const { data, error } = await resend.emails.send({
      from: 'Sacramento PMG <noreply@notyoungfashion.com>',
      to: ['hello@sacramentopmg.com'],
      subject: `New Rental Analysis Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #047857; border-bottom: 2px solid #047857; padding-bottom: 10px;">
            New Rental Analysis Request
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 12px; background-color: #f5f5f4; font-weight: bold; width: 140px;">Name</td>
              <td style="padding: 12px; background-color: #fafaf9;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px; background-color: #f5f5f4; font-weight: bold;">Email</td>
              <td style="padding: 12px; background-color: #fafaf9;">
                <a href="mailto:${email}" style="color: #047857;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; background-color: #f5f5f4; font-weight: bold;">Phone</td>
              <td style="padding: 12px; background-color: #fafaf9;">
                <a href="tel:${phone}" style="color: #047857;">${phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px; background-color: #f5f5f4; font-weight: bold;">Property Address</td>
              <td style="padding: 12px; background-color: #fafaf9;">${address}</td>
            </tr>
          </table>

          <p style="margin-top: 30px; padding: 15px; background-color: #ecfdf5; border-radius: 8px; color: #065f46;">
            This lead was submitted through the Google Ads landing page.
          </p>

          <hr style="margin-top: 30px; border: none; border-top: 1px solid #e7e5e4;">
          <p style="color: #78716c; font-size: 12px;">
            Sacramento Property Management Group<br>
            (916) 767-0216
          </p>
        </div>
      `,
      replyTo: email,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
