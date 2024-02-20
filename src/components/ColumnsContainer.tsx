import React, { ReactNode } from "react";
import { Box } from "@mui/material";

interface ColumnsContainerProps {
  children: ReactNode;
}

const ColumnsContainer = ({ children }: ColumnsContainerProps) => (
  <Box
    sx={{
      display: "flex",
      overflowX: "auto",
      overflowY: "hidden",
      height: "100vh",
      gap: "16px",
      padding: "8px",
      "&::-webkit-scrollbar": {
        height: "8px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: "4px",
      },
    }}
  >
    {children}
  </Box>
);

export default ColumnsContainer;
