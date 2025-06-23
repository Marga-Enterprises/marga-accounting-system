export const generatePrintHTML = (content) => `
  <html>
    <head>
      <title>Print Invoice</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          font-size: 14px;
          padding: 72px;
          margin: 0;
        }

        .invoice-preview {
          margin-bottom: 160px;
          position: relative;
          height: 100%;
        }

        .client-name {
          font-weight: bold;
          margin-bottom: 32px;
        }

        .invoice-details {
          position: absolute;
          top: 0;
          right: 0;
          text-align: right;
          line-height: 1.6;
          font-size: 13px;
          color: #555;
        }

        .amount-section {
          position: absolute;
          right: 0;
          bottom: 120px;
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
