import React, { useState } from 'react';

const InvoiceForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    billTo: '',
    shipTo: '',
    invoiceNumber: '',
    date: '',
    dueDate: '',
    subject: '',
    lineItems: [{ description: '', quantity: 1, unitPrice: 0 }],
    tax: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLineItemChange = (index, e) => {
    const { name, value } = e.target;
    const newLineItems = formData.lineItems.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setFormData({ ...formData, lineItems: newLineItems });
  };

  const addLineItem = () => {
    setFormData({
      ...formData,
      lineItems: [...formData.lineItems, { description: '', quantity: 1, unitPrice: 0 }]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Invoice Details</h2>
      <input
        type="text"
        name="billTo"
        placeholder="Bill To"
        value={formData.billTo}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="shipTo"
        placeholder="Ship To"
        value={formData.shipTo}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="invoiceNumber"
        placeholder="Invoice Number"
        value={formData.invoiceNumber}
        onChange={handleInputChange}
        required
      />
      <input
        type="date"
        name="date"
        placeholder="Date"
        value={formData.date}
        onChange={handleInputChange}
        required
      />
      <input
        type="date"
        name="dueDate"
        placeholder="Due Date"
        value={formData.dueDate}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleInputChange}
        required
      />

      <h3>Line Items</h3>
      {formData.lineItems.map((item, index) => (
        <div key={index}>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={item.description}
            onChange={(e) => handleLineItemChange(index, e)}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={item.quantity}
            onChange={(e) => handleLineItemChange(index, e)}
            required
          />
          <input
            type="number"
            name="unitPrice"
            placeholder="Unit Price"
            value={item.unitPrice}
            onChange={(e) => handleLineItemChange(index, e)}
            required
          />
        </div>
      ))}
      <button type="button" onClick={addLineItem}>Add Line Item</button>

      <input
        type="number"
        name="tax"
        placeholder="Tax (%)"
        value={formData.tax}
        onChange={handleInputChange}
        required
      />

      <button type="submit">Generate Invoice</button>
    </form>
  );
};

export default InvoiceForm;
