import React from 'react';
import { convertDate } from '@utils/methods';

const PrintPreviewSection = ({ data = [], selectedRows = [] }) => {
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
              <div className="left-column">
                <div className="client-name">{row["CLIENT"]}</div>
              </div>

              <div className="right-column">
                <div className="invoice-details">
                  <div>{convertDate(row["INVOICE DATE"])}</div>
                  {/*<div>RDG26</div>*/}
                  <div>{row["INVOICE MONTH"]}</div>
                  <div>{row["CATEGORY"]}</div>
                </div>

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
