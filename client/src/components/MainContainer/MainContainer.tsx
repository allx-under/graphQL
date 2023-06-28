import { Box, Container } from "@mui/material";
import * as React from "react";

export default function MainContainer({ children }: React.PropsWithChildren) {
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage:
          "url(https://images3.alphacoders.com/720/thumb-1920-720517.jpg)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <Container fixed maxWidth="lg">
        {children}
      </Container>
    </Box>
  );
}
