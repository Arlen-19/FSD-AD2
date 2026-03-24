import React from 'react'
import "../styles/EndScreen.css";
import { useNavigate } from 'react-router-dom';

export default function EndScreen() {

    const navigate = useNavigate();

  return (
    <div className='content'>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for shopping with us. Your order has been placed and is being processed.</p>
        <p>You will receive a confirmation email shortly with the details of your order.</p>
        <p>We appreciate your business and hope to see you again soon!</p>
        <button className='homeButton' onClick={() => window.location.href = "/"} >
            Back to Home
        </button>
    </div>
  )
}
