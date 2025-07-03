// react
import React from 'react';

const InvoiceSingleView = ({ row, invoiceDetails, values, convertDate }) => {
  const rowClient = row["CLIENT"] === "Batangas P.Burgos (CBS)" ? "China Bank Savings - Branches" : row["CLIENT"];
  const specialAddress = rowClient === "China Bank Savings - Branches" ? "6772 VGP Center Ayala Ave. Makati City" : invoiceDetails.fullAddress;

  return (
    <div className="invoice-preview">
      <div className="invoice-row">
        <div className="left-column">
          <div className="client-details">
            <div className="invoice-text">{rowClient}</div>
            <div className="invoice-text">{invoiceDetails.tinNumber}</div>
            <div className="invoice-text">{specialAddress}</div>
          </div>
          <div className="invoice-breakdown-details">
            <div className="invoice-text-details">Business Style: {invoiceDetails.businessStyle}</div>
            <div className="invoice-text-details">Printer Rental Billing for: {invoiceDetails.billingDate}</div>
            <div className="invoice-text-details">Printer Model: {invoiceDetails.printerModel}</div>

            {/* If category is not RTP hide this fields */}
            { row["CATEGORY"] === "RTP" && (
              <>
                <div className="invoice-text-details">Pages Consumed: {invoiceDetails.pagesConsumed}</div>
                <div className="invoice-text-details">Rate Per Page: {invoiceDetails.ratePerPage}</div>
              </>
            )}
          </div>
        </div>

        <div className="right-column">
          <div className="invoice-details">
            <div>{convertDate(row["INVOICE DATE"])}</div>
            <div>{invoiceDetails.rd}</div>
            <div>{row["INVOICE MONTH"]}</div>
            <div>{row["CATEGORY"]}</div>
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

export default React.memo(InvoiceSingleView);
