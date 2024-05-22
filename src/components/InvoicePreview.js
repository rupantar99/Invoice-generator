import React from 'react';

const InvoicePreview = ({ data }) => {
  const calculateTotal = () => {
    const subtotal = data.lineItems.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
    const total = subtotal + (subtotal * data.tax / 100);
    return { subtotal, total };
  };

  const totals = calculateTotal();

  return (
    <div className="invoice-preview">
      <h2>Invoice Preview</h2>
      <p><strong>Bill To:</strong> {data.billTo}</p>
      <p><strong>Ship To:</strong> {data.shipTo}</p>
      <p><strong>Invoice Number:</strong> {data.invoiceNumber}</p>
      <p><strong>Date:</strong> {data.date}</p>
      <p><strong>Due Date:</strong> {data.dueDate}</p>
      <p><strong>Subject:</strong> {data.subject}</p>
      <h3>Line Items</h3>
      {data.lineItems.map((item, index) => (
        <div key={index}>
          <p>Item Desc :{item.description}</p>
          <p>Quantity : {item.quantity}</p>
          <p>Unit Price : {item.unitPrice}</p>
          <p>Total Price : {item.quantity * item.unitPrice}</p>
        </div>
      ))}
      <h3>Summary</h3>
      <p>Subtotal: {totals.subtotal}</p>
      <p>Tax: {data.tax}%</p>
      <p>Total: {totals.total}</p>
    </div>
  );
};

export default InvoicePreview;
