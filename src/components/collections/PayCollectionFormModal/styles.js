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
