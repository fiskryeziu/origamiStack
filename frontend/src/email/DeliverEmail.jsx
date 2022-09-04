import moment from 'moment'
import React from 'react'
const wrapper = {
  backgroundColor: '#f7f7f7',
}
const container = {
  minWidth: '500px',
  maxWidth: '500px',
  backgroundColor: '#ffffff',
  margin: ' 0 auto',
}
const headerText = {
  padding: '1em',
  maxWidth: '100%',
  backgroundColor: ' #F25C05',
  color: ' #F2F2F2',
  textAlign: ' center',
}
const table = {
  margin: '0 auto',
  width: ' 350px',
}
const td = {
  textAlign: ' left',
  padding: '.5em',
  border: '2px solid #e5e5e5',
  color: '#636363',
}
const th = {
  textAlign: ' left',
  padding: '.5em',
  border: '2px solid #e5e5e5',
  color: '#636363',
}

const h3 = {
  color: '#F25C05',
}
// const fontColor = {
//   color: '#777674',
// }
export default function InlineLink({ order, name }) {
  return (
    <>
      <div className="wrapper" style={wrapper}>
        <span style={{ opacity: '0' }} />
        <div className="container" style={container}>
          <div className="headerText" style={headerText}>
            <h1>Thank you for your order </h1>
          </div>
          <div
            className="textContent"
            style={{ margin: '0 2em', color: '#777674' }}
          >
            <p>Hi {order.user.name},</p>
            <p>We have processed your order, and it will reach you soon..</p>
          </div>
          <div style={{ margin: '0 2em' }}>
            <h3 style={h3}>
              [Order #{order._id}] ({moment(order.paidAt).format('LL')})
            </h3>
            <div className="productDiv">
              <table style={table}>
                <thead>
                  <tr>
                    <th style={th}>Product</th>
                    <th style={th}>Quantity</th>
                    <th style={th}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((item) => (
                    <tr key={item.product}>
                      <td style={td}>{item.name}</td>
                      <td style={td}>{item.qty}</td>
                      <td style={td}>{item.price}€</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="subTotal">
              <table style={table}>
                <tr>
                  <th style={th}>Subtotal:</th>
                  <td style={td}>
                    {order.totalPrice - order.shippingPrice - order.taxPrice}€
                  </td>
                </tr>
                <tr>
                  <th style={th}>Payment Method</th>
                  <td style={td}>{order.paymentMethod}</td>
                </tr>
                <tr>
                  <th style={th}>Total</th>
                  <td style={td}>{order.totalPrice}€</td>
                </tr>
              </table>
            </div>
          </div>
          <div className="billingAddress" style={{ margin: '0 2em' }}>
            <h3 style={h3}>Billing Address</h3>
            <div style={{ padding: '0 2em', color: '#777674' }}>
              <p>{order.user.name}</p>
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.country}</p>
              <p>{order.shippingAddress.city}</p>
              <p>{order.shippingAddress.postalCode}</p>
              <p>+38349123456</p>
              <p>{order.email}</p>
            </div>
          </div>
          <div className="footerText" style={{ margin: '0 2em' }}>
            <p style={{ textAlign: 'center', color: '#777674' }}>
              Best wishes, Origami Handmade
            </p>
          </div>
        </div>
      </div>
      <span style={{ opacity: '0' }} />
    </>
  )
}
