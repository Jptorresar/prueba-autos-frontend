import React from "react";

const JsonViewer = ({ data }) => {
  return (
    <pre style={{ background: "#f0f0f0", padding: "1em", borderRadius: "5px" }}>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
};

export default JsonViewer;
