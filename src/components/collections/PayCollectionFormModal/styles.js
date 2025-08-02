const styles = {
  modalWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      xs: "90%",   // small screens
      sm: 500,     // tablets
      md: 600,     // medium screens
      lg: 700,     // large screens
    },
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  },
  title: {
    mb: 2,
    fontWeight: 600,
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 2,
  },
  header: {
    backgroundColor: "#f5f5f5",
    borderRadius: 2,
    padding: 2,
    marginBottom: 3,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e0e0e0",
  },
  formField: {
    flex: {
      xs: "1 1 100%",         // Full width on small screens
      sm: "1 1 calc(50% - 8px)", // Half width on tablets and up
    },
    minWidth: {
      xs: "100%",
      sm: "calc(50% - 8px)",
    },
  },
  fullWidthField: {
    flex: "1 1 100%",
  },
  buttonGroup: {
    mt: 3,
    display: "flex",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    gap: 1,
  },
  invoiceInfoLabel: {
    fontWeight: 600,
  },

  invoiceInfoText: {
    marginBottom: 1,
  },

  invoiceInfoTextLast: {
    marginBottom: 2,
  }
};

export default styles;
