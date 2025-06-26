import React from 'react';
import { convertDate } from '@utils/methods';

const PrintPreviewSection = ({ data = [], selectedRows = [], invoiceDetails }) => {
  if (selectedRows.length === 0) return null;

  return (
    <div id="print-preview" style={{ display: 'none' }}>
      {selectedRows.map((index) => {
        const row = data[index];
        const values = [
          parseFloat(row["AMOUNT"] || 0),
          0,
          0,
          0,
          0,
          0,
          parseFloat(row["AMOUNT"] || 0),
        ];

        return (
          <div className="invoice-preview" key={index}>
            <div className="invoice-row">
              {/* left column */}
              <div className="left-column">
                {/* client details */}
                <div className="client-details">
                  <div className="invoice-text">{row["CLIENT"]}</div>
                  <div className="invoice-text">{invoiceDetails.tinNumber}</div>
                  <div className="invoice-text">{invoiceDetails.fullAddress}</div>
                </div>

                {/* invoice breakdown details */}
                <div className="invoice-breakdown-details">
                  <div className="invoice-text">Business Style: {invoiceDetails.businessStyle}</div>
                  <div className="invoice-text">Printer Model: {invoiceDetails.printerModel}</div>
                  <div className="invoice-text">Printer Rental Billing for{invoiceDetails.billingDate}</div>
                  <div className="invoice-text">Pages Consumed: {invoiceDetails.pagesConsumed}</div>
                  <div className="invoice-text">Rate Per Page: {invoiceDetails.ratePerPage}</div>
                </div>
              </div>

              {/* right column */}
              <div className="right-column">
                {/* invoice details */}
                <div className="invoice-details">
                  <div>{convertDate(row["INVOICE DATE"])}</div>
                  <div>{invoiceDetails.rd}</div>
                  <div>{row["INVOICE MONTH"]}</div>
                  <div>{row["CATEGORY"]}</div>
                </div>

                {/* amount section */}
                <div className="amount-section">
                  {values.map((val, idx) => (
                    <div key={idx} style={{ fontWeight: idx === values.length - 1 ? 'bold' : 'normal' }}>
                      {val.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(PrintPreviewSection);
