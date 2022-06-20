import * as React from "react";
import { Navbar } from "../components";
import EmailEditor from "react-email-editor";
import { Box } from "@mui/material";
import FileSaver from "file-saver";
import { toast } from "react-toastify";

const HomePage = () => {
  const emailEditorRef = React.useRef(null);

  const handleOnReady = () => {
    try {
      const data = JSON.parse(localStorage.getItem("design"));
      emailEditorRef.current?.editor.loadDesign(data);
    } catch (_) {}
  };

  const saveJSON = () => {
    emailEditorRef.current?.saveDesign((data) => {
      localStorage.setItem("design", JSON.stringify(data));
      toast("Saved");
    });
  };

  const importJSON = () => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = "text/json,text/txt";
    inputElement.style.display = "none";
    inputElement.addEventListener("change", (e) => {
      const input = e.target;
      if (input.files && input.files.length > 0) {
        // Get File
        const file = input.files[0];
        const reader = new FileReader();
        reader.addEventListener("load", (event) => {
          const result = event.target?.result;
          try {
            const design = JSON.parse(String(result));
            emailEditorRef.current?.loadDesign(design);
          } catch (error) {}
        });
        reader.readAsText(file);
      }
      inputElement.remove();
    });
    document.body.append(inputElement);
    inputElement.click();
  };

  const exportToJSON = () => {
    emailEditorRef.current?.saveDesign((data) => {
      const blob = new Blob([JSON.stringify(data)], {
        type: "text/plain;charset=utf-8",
      });
      FileSaver.saveAs(blob, "design.json");
    });
  };

  const exportToHTML = () => {
    emailEditorRef.current?.exportHtml((data) => {
      const { html } = data;
      const blob = new Blob([html], { type: "text/plain;charset=utf-8" });
      FileSaver.saveAs(blob, "design.html");
    });
  };

  const handleCopyHTMLToClipboard = () => {
    emailEditorRef.current?.exportHtml((data) => {
      const { html } = data;
      navigator.clipboard.writeText(html).then(() => {
        toast("Copied to Clipboard");
      });
    });
  };

  return (
    <>
      <Navbar
        saveJSON={saveJSON}
        importJSON={importJSON}
        exportToJSON={exportToJSON}
        exportToHTML={exportToHTML}
        handleCopyHTMLToClipboard={handleCopyHTMLToClipboard}
      />
      <Box sx={{ mt: "64px" }}>
        <EmailEditor
          ref={emailEditorRef}
          onReady={handleOnReady}
          editorId="editor"
          style={{ height: "calc(100vh - 64px)" }}
        />
      </Box>
    </>
  );
};

export default HomePage;
