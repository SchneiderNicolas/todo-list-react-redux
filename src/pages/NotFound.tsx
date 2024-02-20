import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const NotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const onClickBackHome = () => navigate("/");

  return (
    <Container
      component="section"
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <Box textAlign="center">
        <Typography
          variant="h1"
          component="h2"
          gutterBottom
          sx={{ color: "#FFFFFF" }}
        >
          404
        </Typography>
        <Typography variant="h5" sx={{ mb: 2, color: "#FFFFFF" }}>
          Sorry, we couldn't find this page.
        </Typography>
        <Typography sx={{ mb: 3, color: "#FFFFFF" }}>
          But don't worry, you can find plenty of other things on our homepage.
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FF7051",
            "&:hover": { backgroundColor: "#e6643c" },
          }}
          onClick={onClickBackHome}
        >
          Back to homepage
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
