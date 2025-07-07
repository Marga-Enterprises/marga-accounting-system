// react
import { useState, useCallback, useRef, useEffect } from "react";

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
  const [clientDepartmentName, setClientDepartmentName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [finalPrintData, setFinalPrintData] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [showInvoiceFormModal, setShowInvoiceFormModal] = useState(false);

  const [invoiceFormValues, setInvoiceFormValues] = useState({
    departmentId: "",
    clientId: "",
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
    withVat: true,
    multipleMachines: false,
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


  // Fetch client department details by name
  const handleFetchDetailsOfClient = useCallback((clientDepartmentName, selectedRows) => {
    if (!clientDepartmentName || !selectedRows.length) return;

    const payload = { clientDepartmentName };

    dispatch(marga.clientdepartment.getClientDepartmentByNameAction(payload))
      .then((res) => {
        if (res.success) {
          const client = res.data.client || {};

          const formValues = {
            departmentId: res.data.id || "",
            clientId: res.data.client_department_client_id || "",
            tinNumber: client.client_tin || "",
            fullAddress: res.data.client_department_address || "",
            businessStyle: client.client_business_style || "",
          };

          if (selectedRows.length > 1 || invoiceFormValues.multipleMachines) {
            formValues.companyName = client.client_name || "";
            formValues.fullAddress = client.client_billing_address || "";
          }

          setInvoiceFormValues((prev) => ({
            ...prev,
            ...formValues,
          }));
        } else {
          console.error("Failed to fetch department:", res.payload);
        }
      })
      .catch((error) => {
        console.error("Error fetching department:", error);
      });
  }, [dispatch, invoiceFormValues.multipleMachines]);


  // save the invoice details 
  const handleSaveInvoiceDetails = useCallback(() => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    dispatch(marga.billing.createBillingAction(finalPrintData))
      .then((res) => {
        if (res.success) {
          console.log("Invoice saved successfully:", res.data);
          handleCloseInvoiceFormModal();
        } else {
          console.error("Failed to save invoice:", res.payload);
        }
      })
      .catch((error) => {
        console.error("Error saving invoice:", error);
      })
      .finally(() => {
        loadingRef.current = false;
        setLoading(false);
      });
  }, [dispatch, finalPrintData]);


  // Print functionality
  const handlePrint = useCallback((e) => {
    e.preventDefault();

    // Optional check
    if (!finalPrintData.billing_invoice_number) {
      console.warn("Final print data not ready");
      return;
    }

    handleSaveInvoiceDetails(finalPrintData);
    setShowInvoiceFormModal(false);

    const printable = document.getElementById("print-preview");

    if (printable) {
      const win = window.open();
      win.document.write(generatePrintHTML(printable.innerHTML));
      win.document.close();
      win.onload = () => win.print();
    }
  }, [finalPrintData]);


  // handle modal visibility
  const handleShowInvoiceFormModal = useCallback((data, selectedRows) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    if (!data || selectedRows.length === 0 || !data[selectedRows[0]]) {
      console.error("Invalid data or selection");
      loadingRef.current = false;
      setLoading(false);
      return;
    }

    const clientName = data[selectedRows[0]].CLIENT.toUpperCase();

    handleFetchDetailsOfClient(clientName, selectedRows);
    setClientDepartmentName(clientName);

    setShowInvoiceFormModal(true);
    loadingRef.current = false;
    setLoading(false);
  }, [handleFetchDetailsOfClient]);


  // close the invoice form modal and reset values
  const handleCloseInvoiceFormModal = useCallback(() => {
    setShowInvoiceFormModal(false);
    setInvoiceFormValues({
      tinNumber: "",
      departmentId: "",
      clientId: "",
      fullAddress: "",
      rd: "",
      businessStyle: "",
      printerModel: "",
      billingDate: "",
      pagesConsumed: "",
      ratePerPage: "",
      lessWithholdingTax: "",
      companyName: "",
      withVat: true,
      multipleMachines: false,
    });
  }, []);


  // Set invoice form values
  const handleChangeInvoiceFormValues = useCallback((e) => {
    const { name, value } = e.target;
    setInvoiceFormValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  // use effect functions
  useEffect(() => {
    if (!showInvoiceFormModal || !clientDepartmentName || selectedRows.length === 0) return;

    handleFetchDetailsOfClient(clientDepartmentName, selectedRows);
  }, [invoiceFormValues.multipleMachines]);

  console.log("finalPrintData:", finalPrintData); 

  return {
    data: filteredData.length > 0 ? filteredData : data,
    loading,
    selectedRows,
    showInvoiceFormModal,
    searchQuery,
    invoiceFormValues,
    setSearchQuery,
    setFinalPrintData,
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
