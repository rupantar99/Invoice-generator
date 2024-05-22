import React, { useState } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import InvoicePDF from './components/InvoicePDF';
import { PDFDownloadLink } from '@react-pdf/renderer';
import './styles.css';

function App() {
  const [invoiceData, setInvoiceData] = useState(null);

  const handleFormSubmit = (data) => {
    setInvoiceData(data);
  };

  return (
    <div className="App">
      <InvoiceForm onFormSubmit={handleFormSubmit} />
      {invoiceData && <InvoicePreview data={invoiceData} />}
      {invoiceData && (
        <div className="download-button">
          <PDFDownloadLink document={<InvoicePDF data={invoiceData} />} fileName="invoice.pdf">
            {({ loading }) => (
              <button className="download-btn">
              {loading ? 'Loading document...' : 'Download PDF'}
              </button>
              )}
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
}

export default App;
