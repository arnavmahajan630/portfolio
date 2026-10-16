import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const recipientEmail = "arnavmahajan630@gmail.com";
    const subject = `[Portfolio Transmission] from ${name}`;
    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    // 1. Discord Webhook (instant notification if configured)
    if (process.env.DISCORD_WEBHOOK_URL) {
      try {
        await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            embeds: [
              {
                title: "⚡ New Transmission Received",
                color: 0xff5a1f, // Amber
                fields: [
                  { name: "Sender", value: `${name} (${email})`, inline: true },
                  { name: "Date", value: new Date().toLocaleString(), inline: true },
                  { name: "Message", value: message },
                ],
                footer: { text: "Arnav Mahajan Portfolio Terminal" },
              },
            ],
          }),
        });
      } catch (err) {
        console.error("Discord webhook dispatch error:", err);
      }
    }

    // 2. Resend API (if RESEND_API_KEY is configured)
    if (process.env.RESEND_API_KEY) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || "portfolio@resend.dev",
            to: recipientEmail,
            reply_to: email,
            subject: subject,
            html: `
              <div style="font-family: monospace; background: #0b0c0a; color: #ece6d3; padding: 24px; border-radius: 8px;">
                <h2 style="color: #ff5a1f; margin-top: 0;">New Transmission from Portfolio</h2>
                <p><strong>Sender:</strong> ${name} &lt;${email}&gt;</p>
                <div style="background: #131510; border-left: 3px solid #ff5a1f; padding: 16px; margin: 20px 0; border-radius: 4px;">
                  <p style="white-space: pre-wrap; margin: 0;">${message}</p>
                </div>
                <p style="color: #a39e8c; font-size: 11px;">Sent from portfolio terminal</p>
              </div>
            `,
          }),
        });

        if (res.ok) {
          return NextResponse.json({
            success: true,
            provider: "resend",
            message: "Transmission delivered directly to Arnav's inbox.",
          });
        }
      } catch (err) {
        console.error("Resend error:", err);
      }
    }

    // 3. Formspree Endpoint (if custom configured)
    if (process.env.FORMSPREE_ENDPOINT) {
      try {
        const res = await fetch(process.env.FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            message,
            _subject: subject,
          }),
        });

        if (res.ok) {
          return NextResponse.json({
            success: true,
            provider: "formspree",
            message: "Transmission delivered directly to Arnav's inbox.",
          });
        }
      } catch (err) {
        console.error("Formspree error:", err);
      }
    }

    // 4. Web3Forms (if WEB3FORMS_ACCESS_KEY configured)
    if (process.env.WEB3FORMS_ACCESS_KEY) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: process.env.WEB3FORMS_ACCESS_KEY,
            name,
            email,
            message,
            subject,
            from_name: "Portfolio Contact Form",
          }),
        });

        if (res.ok) {
          return NextResponse.json({
            success: true,
            provider: "web3forms",
            message: "Transmission delivered successfully.",
          });
        }
      } catch (err) {
        console.error("Web3Forms error:", err);
      }
    }

    // 5. FormSubmit.co (Zero-setup direct email delivery to arnavmahajan630@gmail.com)
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Referer: "https://portfolio.local",
          Origin: "https://portfolio.local",
        },
        body: JSON.stringify({
          name,
          email,
          _replyto: email,
          _subject: subject,
          message,
          _template: "table",
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data && (data.success === "true" || data.success === true)) {
        return NextResponse.json({
          success: true,
          provider: "formsubmit",
          message: "Transmission delivered directly to Arnav's inbox.",
        });
      } else if (data && data.message && data.message.includes("Activation")) {
        // FormSubmit sent a 1-time activation link to Arnav's email
        return NextResponse.json({
          success: true,
          provider: "formsubmit_activation",
          message: "Transmission dispatched! (Activation link sent to arnavmahajan630@gmail.com)",
        });
      }
    } catch (err) {
      console.error("FormSubmit direct delivery error:", err);
    }

    // 6. Fallback: Log to console and provide mailto link
    console.log(`[CONTACT TRANSMISSION] From: ${name} (${email})\nMessage: ${message}`);

    return NextResponse.json({
      success: true,
      provider: "mailto_fallback",
      mailtoUrl,
      message: "Ready to transmit directly to Arnav's inbox.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred while sending transmission." },
      { status: 500 }
    );
  }
}
