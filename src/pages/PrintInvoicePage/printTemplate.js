export const generatePrintHTML = (content) => `
  <html>
    <head>
      <title>Print Invoice</title>
      <style>
        * {
          box-sizing: border-box;
        }

        body {
          font-family: Arial, sans-serif;
          font-size: 14px;
          padding: 72px;
          margin: 0;
        }

        .invoice-preview {
          margin-bottom: 160px;
          position: relative; 
        }

        .invoice-row {
          display: flex;
          justify-content: space-between;
          position: relative;
          width: 100%;
          margin-top: 3.32rem;
        }

        .left-column {
          flex: 1;
        }

        .client-details {
          position: absolute;
          top: 0;
          left: 20;
          max-width: 300px;
          text-align: left;
        }

        .invoice-breakdown-details {
          position: absolute;
          top: 130;
          left: 20;
          max-width: 500px;
          text-align: left;
          line-height: 1.4;
        }

        .invoice-text {
          font-size: 13px;
          color: #555;
          font-weight: bold;
        }

        .right-column {
          flex: 1;
          position: relative;
        }

        .invoice-details {
          position: absolute;
          top: 0;
          right: 85;
          text-align: right;
          line-height: 1.4;
          font-size: 13px;
          color: #555;
        }

        .amount-section {
          position: absolute;
          right: 40;
          top: 270; 
          text-align: right;
          font-feature-settings: "tnum";
        }

        .amount-section div {
          margin-bottom: 4px;
        }

        .amount-section div:last-child {
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      ${content}
    </body>
  </html>
`;
