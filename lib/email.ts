// Email service using EmailJS
import emailjs from "@emailjs/browser"

// Initialize EmailJS with your public key
export function initEmailJS() {
  emailjs.init("kVB5XVghVv9z4MdLy")
}

export async function sendOrderConfirmationEmail(orderData: any) {
  try {
    // Create a simple string of order items for the email
    const orderItemsText = orderData.items
      .map((item: any) => `${item.name} x ${item.quantity} = ${(item.price * item.quantity).toLocaleString()} PKR`)
      .join("\n")

    // Prepare template parameters that match EmailJS template variables
    const templateParams = {
      to_email: orderData.customerInfo.email,
      customer_name: orderData.customerInfo.name,
      order_id: orderData.orderId || "N/A",
      order_items: orderItemsText,
      total_amount: orderData.total.toLocaleString(),
      delivery_address: orderData.customerInfo.address,
      customer_phone: orderData.customerInfo.phone,
      customer_email: orderData.customerInfo.email,
    }

    console.log("Sending order confirmation email with params:", templateParams)

    // Send email using your EmailJS credentials
    const response = await emailjs.send("service_n7l0238", "template_99x8f38", templateParams)

    console.log("Order confirmation email sent successfully:", response)
    return { success: true }
  } catch (error) {
    console.error("Order confirmation email sending failed:", error)
    return { success: false, error }
  }
}

export async function sendWelcomeEmail(userEmail: string, userName: string) {
  try {
    // Prepare template parameters for welcome email
    const templateParams = {
      to_email: userEmail,
      customer_name: userName,
      customer_email: userEmail,
    }

    console.log("Sending welcome email with params:", templateParams)

    // For now, use the same template - you can create a separate welcome template later
    const response = await emailjs.send("service_n7l0238", "template_99x8f38", templateParams)

    console.log("Welcome email sent successfully:", response)
    return { success: true }
  } catch (error) {
    console.error("Welcome email sending failed:", error)
    return { success: false, error }
  }
}
