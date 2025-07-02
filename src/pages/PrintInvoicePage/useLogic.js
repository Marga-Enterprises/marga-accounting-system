// react
import { useState, useCallback, useRef } from "react";

// redux
import { useDispatch } from "react-redux";
import { marga } from "@redux/combineActions";

// xlsx
import * as XLSX from "xlsx";

// print template
import { generatePrintHTML } from "./printTemplate"; 


export const useLogic = () => {
  // hooks
  const dispatch = useDispatch();
  const loadingRef = useRef(null);

  // states
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      try {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const jsonData = XLSX.utils.sheet_to_json(ws, { defval: "" });

        setData(jsonData);
      } catch (error) {
        console.error("Error parsing Excel file:", error);
      } finally {
        loadingRef.current = false;
        setLoading(false);
      }
    };

    reader.onerror = (err) => {
      console.error("File reading error:", err);
      loadingRef.current = false;
      setLoading(false);
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


  // handle modal visibility and fetch department information
  const handleShowInvoiceFormModal = useCallback((data, selectedRows) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    // Safety check
    if (!data || selectedRows.length === 0 || !data[selectedRows[0]]) {
      console.error("Invalid data or selection");
      loadingRef.current = false;
      setLoading(false);
      return;
    }

    const payload = {
      clientDepartmentName: data[selectedRows[0]].CLIENT,
    };

    console.log("Fetching department by name:", payload);

    dispatch(marga.clientdepartment.getClientDepartmentByNameAction(payload))
      .then((res) => {
        if (res.success) {
          const client = res.data.client || {};
          const formValues = {
            tinNumber: client.client_tin || "",
            fullAddress: res.data.client_department_address || "",
            businessStyle: client.client_business_style || "",
          };

          if (selectedRows.length > 1) {
            formValues.companyName = client.client_name || "";
          }

          setInvoiceFormValues(formValues);
        } else {
          console.error("Failed to fetch department:", res.payload);
        }
      })
      .catch((error) => {
        console.error("Error fetching department:", error);
      })
      .finally(() => {
        loadingRef.current = false;
        setLoading(false);
        setShowInvoiceFormModal(true);
      });
  }, [dispatch]);


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
    loading,
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
