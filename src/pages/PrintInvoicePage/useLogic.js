import { useState, useCallback } from "react";
import * as XLSX from "xlsx";
import { generatePrintHTML } from "./printTemplate"; 

export const useLogic = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showInvoiceFormModal, setShowInvoiceFormModal] = useState(false);
  const [invoiceFormValues, setInvoiceFormValues] = useState({
    companyName: "",
    tinNumber: "",
    fullAddress: "",
    rd: "",
    businessStyle: "",
    printerModel: "",
    billingDate: "",
    pagesConsumed: "",
    ratePerPage: "",
    lessWithholdingTax: "",
  });

  // Handles the file upload and parsing
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

  // Toggles the selection of rows
  const toggleRow = useCallback((index) => {
    setSelectedRows((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  }, []);

  // Clears the search input
  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
    setFilteredData(data);
  }, [data]);

  // Perform the search when the button is clicked
  const handleSearch = useCallback((e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return setFilteredData(data);

    const lowerQuery = searchQuery.toLowerCase();
    const filtered = data.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(lowerQuery)
    );
    setFilteredData(filtered);
  }, [data, searchQuery]);

  // Print functionality
  const handlePrint = useCallback((e) => {
    e.preventDefault();

    setShowInvoiceFormModal(false);

    const printable = document.getElementById("print-preview");

    if (printable) {
      const win = window.open();

      win.document.write(generatePrintHTML(printable.innerHTML));

      win.document.close();
      win.onload = () => win.print();
    }
  }, []);

  // handle modal visibility
  const handleShowInvoiceFormModal = useCallback(() => {
    setShowInvoiceFormModal(true);
  }, []);

  // close the invoice form modal and reset values
  const handleCloseInvoiceFormModal = useCallback(() => {
    setShowInvoiceFormModal(false);
    setInvoiceFormValues({
      tinNumber: "",
      fullAddress: "",
      rd: "",
      businessStyle: "",
      printerModel: "",
      billingDate: "",
      pagesConsumed: "",
      ratePerPage: "",
      lessWithholdingTax: "",
      companyName: "",
    });
  }, []);

  // Set invoice form values
  const handleChangeInvoiceFormValues = useCallback((e) => {
    const { name, value } = e.target;
    setInvoiceFormValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  return {
    data: filteredData.length > 0 ? filteredData : data,
    selectedRows,
    showInvoiceFormModal,
    searchQuery,
    invoiceFormValues,
    setSearchQuery,
    handleChangeInvoiceFormValues,
    handleFileUpload,
    toggleRow,
    handlePrint,
    handleClearSearch,
    handleSearch,
    handleShowInvoiceFormModal,
    handleCloseInvoiceFormModal
  };
};
