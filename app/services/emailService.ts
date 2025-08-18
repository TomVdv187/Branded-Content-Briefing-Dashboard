'use client';

// Email service configuration
const EMAIL_SERVICE_CONFIG = {
  // For production, you'd use a real email service like SendGrid, Mailgun, or Resend
  apiKey: process.env.NEXT_PUBLIC_EMAIL_API_KEY || 'demo-key',
  fromEmail: 'hello@contentcraft.com',
  fromName: 'ContentCraft Team'
};

export interface EmailTemplate {
  subject: string;
  htmlContent: string;
  textContent: string;
}

export interface WelcomeEmailData {
  userName: string;
  userEmail: string;
  planName: string;
  loginUrl: string;
}

// Email templates
export const EMAIL_TEMPLATES = {
  welcome: (data: WelcomeEmailData): EmailTemplate => ({
    subject: `🚀 Welcome to ContentCraft, ${data.userName}!`,
    htmlContent: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to ContentCraft</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
        }
        .container {
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 32px;
        }
        .logo {
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            width: 60px;
            height: 60px;
            border-radius: 12px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 16px;
        }
        .logo svg {
            width: 32px;
            height: 32px;
            color: white;
        }
        h1 {
            color: #1e293b;
            margin: 0 0 8px 0;
            font-size: 28px;
            font-weight: 700;
        }
        .subtitle {
            color: #64748b;
            font-size: 16px;
            margin: 0;
        }
        .content {
            margin: 32px 0;
        }
        .highlight-box {
            background: linear-gradient(135deg, #eff6ff, #f0f9ff);
            border: 1px solid #bfdbfe;
            border-radius: 8px;
            padding: 24px;
            margin: 24px 0;
        }
        .plan-badge {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            text-transform: capitalize;
        }
        .features-list {
            list-style: none;
            padding: 0;
            margin: 20px 0;
        }
        .features-list li {
            padding: 8px 0;
            position: relative;
            padding-left: 32px;
        }
        .features-list li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #22c55e;
            font-weight: bold;
            font-size: 16px;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
            color: white;
            text-decoration: none;
            padding: 14px 28px;
            border-radius: 8px;
            font-weight: 600;
            text-align: center;
            margin: 20px 0;
        }
        .footer {
            margin-top: 40px;
            padding-top: 24px;
            border-top: 1px solid #e2e8f0;
            color: #64748b;
            font-size: 14px;
            text-align: center;
        }
        .social-links {
            margin: 16px 0;
        }
        .social-links a {
            color: #64748b;
            text-decoration: none;
            margin: 0 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                    <path d="M2 17L12 22L22 17"/>
                    <path d="M2 12L12 17L22 12"/>
                </svg>
            </div>
            <h1>Welcome to ContentCraft!</h1>
            <p class="subtitle">Your AI-powered content creation journey begins now</p>
        </div>

        <div class="content">
            <p>Hi <strong>${data.userName}</strong>,</p>
            
            <p>🎉 Welcome to ContentCraft! We're thrilled to have you join our community of publishers, marketers, and content creators who are transforming briefings into compelling stories.</p>
            
            <div class="highlight-box">
                <h3 style="margin-top: 0; color: #1e293b;">Your ${data.planName} Plan is Ready!</h3>
                <span class="plan-badge">${data.planName} Plan</span>
                
                <ul class="features-list">
                    ${data.planName === 'Free' ? `
                        <li>5 content generations per month</li>
                        <li>Article creation and optimization</li>
                        <li>Basic SEO features</li>
                        <li>Email support</li>
                    ` : data.planName === 'Professional' ? `
                        <li>Unlimited content generation</li>
                        <li>All platforms (Article, Social, Newsletter)</li>
                        <li>Advanced analytics and optimization</li>
                        <li>Priority support</li>
                        <li>Custom voice & tone settings</li>
                    ` : `
                        <li>Everything in Professional</li>
                        <li>API access and custom integrations</li>
                        <li>White-label options</li>
                        <li>Dedicated account manager</li>
                        <li>Priority feature requests</li>
                    `}
                </ul>
            </div>

            <h3>🚀 Getting Started is Easy:</h3>
            <ol style="padding-left: 20px;">
                <li><strong>Upload or paste your briefing</strong> - Our AI will extract key information automatically</li>
                <li><strong>Choose your content format</strong> - Article, social media posts, newsletters, and more</li>
                <li><strong>Review and customize</strong> - Edit tone, style, and messaging to match your brand</li>
                <li><strong>Publish everywhere</strong> - Export or publish directly to your favorite platforms</li>
            </ol>

            <div style="text-align: center; margin: 32px 0;">
                <a href="${data.loginUrl}" class="cta-button">Start Creating Content →</a>
            </div>

            <p>Have questions? Our support team is here to help you make the most of ContentCraft. Just reply to this email or visit our help center.</p>

            <p>Here's to creating amazing content together!</p>
            
            <p style="margin-top: 32px;">
                Best regards,<br>
                <strong>The ContentCraft Team</strong><br>
                <span style="color: #64748b;">Transforming briefings into compelling stories</span>
            </p>
        </div>

        <div class="footer">
            <div class="social-links">
                <a href="#" style="text-decoration: none;">Help Center</a>
                <a href="#" style="text-decoration: none;">Feature Updates</a>
                <a href="#" style="text-decoration: none;">Contact Support</a>
            </div>
            <p>
                ContentCraft - AI-Powered Content Creation<br>
                © 2024 ContentCraft. All rights reserved.
            </p>
            <p style="font-size: 12px; color: #94a3b8;">
                You received this email because you signed up for ContentCraft.<br>
                If you didn't create this account, please contact our support team.
            </p>
        </div>
    </div>
</body>
</html>`,
    textContent: `
Welcome to ContentCraft, ${data.userName}!

Thank you for joining ContentCraft! We're excited to help you transform briefings into compelling stories.

Your ${data.planName} Plan is now active and ready to use.

Getting Started:
1. Upload or paste your briefing - Our AI will extract key information automatically
2. Choose your content format - Article, social media posts, newsletters, and more  
3. Review and customize - Edit tone, style, and messaging to match your brand
4. Publish everywhere - Export or publish directly to your favorite platforms

Start creating: ${data.loginUrl}

Need help? Just reply to this email - our support team is here to help!

Best regards,
The ContentCraft Team

---
ContentCraft - AI-Powered Content Creation
© 2024 ContentCraft. All rights reserved.
`
  })
};

// Email service implementation
export class EmailService {
  private async sendEmail(to: string, template: EmailTemplate): Promise<boolean> {
    try {
      // In production, you'd integrate with a real email service
      // For now, we'll simulate sending and log the email
      console.log('📧 Email sent to:', to);
      console.log('Subject:', template.subject);
      console.log('Content preview:', template.textContent.substring(0, 200) + '...');
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll show a success message
      // In production, replace this with actual email service integration:
      /*
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to,
          subject: template.subject,
          html: template.htmlContent,
          text: template.textContent
        })
      });
      return response.ok;
      */
      
      return true; // Simulate success for demo
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }

  async sendWelcomeEmail(emailData: WelcomeEmailData): Promise<boolean> {
    const template = EMAIL_TEMPLATES.welcome(emailData);
    return this.sendEmail(emailData.userEmail, template);
  }

  async sendPaymentSuccessEmail(emailData: WelcomeEmailData & { transactionId: string }): Promise<boolean> {
    const template: EmailTemplate = {
      subject: `🎉 Payment Confirmed - Welcome to ContentCraft ${emailData.planName}!`,
      htmlContent: `<h1>Payment Successful!</h1><p>Your ${emailData.planName} subscription is now active.</p><p>Transaction ID: ${emailData.transactionId}</p>`,
      textContent: `Payment Successful! Your ${emailData.planName} subscription is now active. Transaction ID: ${emailData.transactionId}`
    };
    return this.sendEmail(emailData.userEmail, template);
  }
}

// Export singleton instance
export const emailService = new EmailService();