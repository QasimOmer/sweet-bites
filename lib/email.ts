// Email service using EmailJS
import emailjs from "@emailjs/browser"

// Initialize EmailJS with your public key
export function initEmailJS() {
  emailjs.init("kVB5XVghVv9z4MdLy")
}

export async function sendOrderConfirmationEmail(orderData: any) {
  try {
    // Format order items for the template
    const formattedItems = orderData.items.map((item: any) => ({
      name: item.name,
      quantity: item.quantity,
      price: (item.price * item.quantity).toLocaleString(),
      image_url: item.image || "/placeholder.svg",
    }))

    // Prepare template parameters
    const templateParams = {
      customer_name: orderData.customerInfo.name,
      customer_email: orderData.customerInfo.email,
      order_id: orderData.orderId || "N/A",
      orders: formattedItems,
      total: orderData.total.toLocaleString(),
      delivery_address: orderData.customerInfo.address,
      phone: orderData.customerInfo.phone,
      to_email: orderData.customerInfo.email, // EmailJS needs this
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
    // Prepare template parameters
    const templateParams = {
      customer_name: userName,
      customer_email: userEmail,
      to_email: userEmail, // EmailJS needs this
    }

    console.log("Sending welcome email with params:", templateParams)

    // Send email using your EmailJS credentials
    // You'll need to create a welcome template in EmailJS and get its ID
    const response = await emailjs.send("service_n7l0238", "template_99x8f38", templateParams)

    console.log("Welcome email sent successfully:", response)
    return { success: true }
  } catch (error) {
    console.error("Welcome email sending failed:", error)
    return { success: false, error }
  }
}
