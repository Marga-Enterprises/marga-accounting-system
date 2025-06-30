// react
import React from 'react';

const InvoiceMultipleView = ({ summaryRow, invoiceDetails, values, convertDate }) => {
  return (
    <div className="invoice-preview">
      <div className="invoice-row">
        <div className="left-column">
          <div className="client-details">
            <div className="invoice-text">{invoiceDetails.companyName}</div>
            <div className="invoice-text">{invoiceDetails.tinNumber}</div>
            <div className="invoice-text">{invoiceDetails.fullAddress}</div>
          </div>
          <div className="invoice-breakdown-details">
            <div className="invoice-text-details">Business Style: {invoiceDetails.businessStyle}</div>
            <div className="invoice-text-details">Printer Rental Billing for: {invoiceDetails.billingDate}</div>
          </div>
        </div>

        <div className="right-column">
          <div className="invoice-details">
            <div>{convertDate(summaryRow["INVOICE DATE"])}</div>
            <div>{invoiceDetails.rd}</div>
            <div>{summaryRow["INVOICE MONTH"]}</div>
            <div>{summaryRow["CATEGORY"]}</div>
          </div>
          <div className="amount-section">
            {values.map((val, idx) => (
              <div key={idx} style={{ fontWeight: idx === values.length - 1 ? 'bold' : 'normal' }}>
                {parseFloat(val).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(InvoiceMultipleView);
