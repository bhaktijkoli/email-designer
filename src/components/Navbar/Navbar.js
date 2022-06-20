import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import * as React from "react";

const Navbar = ({
  saveJSON,
  importJSON,
  exportToJSON,
  exportToHTML,
  handleCopyHTMLToClipboard,
}) => {
  const [exportAnchorEl, setExportAnchorEl] = React.useState(null);
  const handleExportClick = React.useCallback((event) => {
    setExportAnchorEl(event.currentTarget);
  }, []);
  const handleExportToJSON = React.useCallback(() => {
    exportToJSON();
  }, [exportToJSON]);
  const handleExportToHTML = React.useCallback(() => {
    exportToHTML();
  }, [exportToHTML]);
  return (
    <AppBar sx={{ backgroundColor: "#FFF", color: "#130f40" }} position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Email Designer
        </Typography>
        <Box>
          <Button
            sx={{ mr: 2 }}
            onClick={saveJSON}
            variant="contained"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
          <Button
            sx={{ mr: 2 }}
            onClick={importJSON}
            variant="contained"
            startIcon={<ImportExportIcon />}
          >
            Import
          </Button>
          <Button
            onClick={handleExportClick}
            variant="contained"
            startIcon={<SaveAltIcon />}
          >
            Export
          </Button>
        </Box>
      </Toolbar>
      <Menu
        id="export-menu"
        anchorEl={exportAnchorEl}
        open={exportAnchorEl !== null}
        onClose={() => setExportAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "export-button",
        }}
      >
        <MenuItem onClick={handleExportToJSON}>Export JSON</MenuItem>
        <MenuItem onClick={handleExportToHTML}>Export HTML</MenuItem>
        <MenuItem
          onClick={() => {
            setExportAnchorEl(null);
            handleCopyHTMLToClipboard();
          }}
        >
          Copy HTML to Clipboard
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
