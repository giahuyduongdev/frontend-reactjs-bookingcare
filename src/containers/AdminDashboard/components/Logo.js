import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-domv6";
// material
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object,
};

export default function Logo({ sx }) {
  return (
    <RouterLink to="/">
      <Box
        component="img"
        src="https://raw.githubusercontent.com/giahuyduongdev/sharing-host-files-bookingcare/refs/heads/main/logo/smart-banner.png"
        sx={{ width: 40, height: 40, ...sx }}
      />
    </RouterLink>
  );
}
