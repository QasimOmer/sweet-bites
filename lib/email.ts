"use client"

// Email service using EmailJS
let emailjs: any = null
let isInitialized = false

// Initialize EmailJS with your public key
export function initEmailJS() {
  if (typeof window !== "undefined" && !isInitialized) {
    import("@emailjs/browser")
      .then((module) => {
        emailjs = module.default
        emailjs.init("kVB5XVghVv9z4MdLy")
        isInitialized = true
      })
      .catch((error) => {
        console.error("Failed to initialize EmailJS:", error)
      })
  }
}

export async function sendOrderConfirmationEmail(orderData: any) {
  try {
    // Initialize EmailJS if not already done
    if (!emailjs && typeof window !== "undefined") {
      const module = await import("@emailjs/browser")
      emailjs = module.default
      emailjs.init("kVB5XVghVv9z4MdLy")
      isInitialized = true
    }

    if (!emailjs) {
      console.log("EmailJS not available")
      return { success: false, error: "EmailJS not available" }
    }

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
    // Initialize EmailJS if not already done
    if (!emailjs && typeof window !== "undefined") {
      const module = await import("@emailjs/browser")
      emailjs = module.default
      emailjs.init("kVB5XVghVv9z4MdLy")
      isInitialized = true
    }

    if (!emailjs) {
      console.log("EmailJS not available")
      return { success: false, error: "EmailJS not available" }
    }

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
