import React from 'react';
import InvoiceSingleView from '@subsections/PrintInvoiceSections/PrintPreview/InvoiceSingleView';
import InvoiceMultipleView from '@subsections/PrintInvoiceSections/PrintPreview/InvoiceMultipleView';
import { convertDate } from '@utils/methods';

const PrintPreviewSection = ({ data = [], selectedRows = [], invoiceDetails }) => {
  if (selectedRows.length === 0) return null;

  const isMultiple = selectedRows.length > 1 || invoiceDetails.multipleMachines;
  const summaryRow = data[selectedRows[0]] || {};

  if (isMultiple) {
    const totalAmount = selectedRows.reduce((sum, index) => {
      const amount = parseFloat(data[index]?.["AMOUNT"] || 0);
      return sum + amount;
    }, 0);

    const netVat = invoiceDetails.withVat ? parseFloat(totalAmount / 1.12 || 0).toFixed(2) :0;
    const lessVat = invoiceDetails.withVat ? parseFloat(netVat * 0.12 || 0).toFixed(2) : 0;
    const lessWithholdingTax = parseFloat(invoiceDetails?.lessWithholdingTax || 0).toFixed(2);

    const values = [
      totalAmount,
      lessVat,
      netVat,
      0,
      0,
      lessWithholdingTax,
      totalAmount,
    ];

    return (
      <div id="print-preview" style={{ display: 'none' }}>
        <InvoiceMultipleView
          summaryRow={summaryRow}
          invoiceDetails={invoiceDetails}
          values={values}
          convertDate={convertDate}
        />
      </div>
    );
  } else {
    const amount = parseFloat(summaryRow["AMOUNT"] || 0);
    const netVat = invoiceDetails.withVat ? parseFloat(amount / 1.12 || 0).toFixed(2) :0;
    const lessVat = invoiceDetails.withVat ? parseFloat(netVat * 0.12 || 0).toFixed(2) : 0;
    const lessWithholdingTax = parseFloat(invoiceDetails?.lessWithholdingTax || 0).toFixed(2);

    const values = [
      amount,
      lessVat,
      netVat,
      0,
      0,
      lessWithholdingTax,
      amount,
    ];

    return (
      <div id="print-preview" style={{ display: 'none' }}>
        <InvoiceSingleView
          row={summaryRow}
          invoiceDetails={invoiceDetails}
          values={values}
          convertDate={convertDate}
        />
      </div>
    );
  }
};

export default React.memo(PrintPreviewSection);
