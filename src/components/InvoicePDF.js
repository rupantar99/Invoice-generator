import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  header: { fontSize: 12, marginBottom: 20 },
  item: { flexDirection: 'row', justifyContent: 'space-between' },
  bold: { fontWeight: 'bold' },
  smallText: { fontSize: 8 },
});

const InvoicePDF = ({ data }) => {
  const calculateTotal = () => {
    const subtotal = data.lineItems.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
    const total = subtotal + (subtotal * data.tax / 100);
    return { subtotal, total };
  };

  const totals = calculateTotal();

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Invoice</Text>
          <Text>Bill To: {data.billTo}</Text>
          <Text>Ship To: {data.shipTo}</Text>
          <Text>Invoice Number: {data.invoiceNumber}</Text>
          <Text>Date: {data.date}</Text>
          <Text>Due Date: {data.dueDate}</Text>
          <Text>Subject: {data.subject}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.bold}>Line Items</Text>
          {data.lineItems.map((item, index) => (
            <View style={styles.item} key={index}>
              <Text style={item.description.length > 50 ? styles.smallText : {}}>{item.description}</Text>
              <Text>Quantity : {item.quantity}</Text>
              <Text>Price : {item.unitPrice}</Text>
              <Text>Total Price : {item.quantity * item.unitPrice}</Text>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.bold}>Summary</Text>
          <Text>Subtotal: {totals.subtotal}</Text>
          <Text>Tax: {data.tax}%</Text>
          <Text>Total: {totals.total}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
