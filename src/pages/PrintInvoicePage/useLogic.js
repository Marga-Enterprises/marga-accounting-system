// react
import { useState, useRef, useCallback } from "react";
import * as XLSX from "xlsx";

// print template
import "./printTemplate.js";

export const useLogic = () => {
  const printRef = useRef(null);

  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleFileUpload = useCallback((e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const jsonData = XLSX.utils.sheet_to_json(ws, { defval: "" });
      setData(jsonData);
    };

    reader.readAsBinaryString(file);
  }, []);

  const toggleRow = useCallback((index) => {
    setSelectedRows((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  }, []);

  const handlePrint = useCallback(() => {
    const printable = document.getElementById("print-preview");

    if (printable) {
      const win = window.open();

      win.document.write(`
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
                position: relative; /* ✅ Important for absolute children */
              }

              .invoice-row {
                display: flex;
                justify-content: space-between;
                position: relative;
                width: 100%;
              }

              .left-column {
                flex: 1;
              }

              .client-name {
                font-weight: bold;
                margin-bottom: 16px;
              }

              .right-column {
                flex: 1;
                position: relative;
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
                right: -20;
                top: 500; 
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
            ${printable.innerHTML}
          </body>
        </html>
      `);

      win.document.close();
      win.onload = () => win.print();
    }
  }, []);

  return {
    data,
    selectedRows,
    handleFileUpload,
    toggleRow,
    handlePrint,
    printRef,
  };
};
