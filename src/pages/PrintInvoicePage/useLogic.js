// react
import { useState, useRef, useCallback } from "react";
import * as XLSX from "xlsx";

// print template
import { generatePrintHTML } from "./printTemplate.js";

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

      win.document.write(generatePrintHTML(printable.innerHTML));

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
