"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
// import MDEditor from "@uiw/react-md-editor";

// import "react-quill/dist/quill.snow.css";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor = ({ value, onChange }: EditorProps) => {
  const MDEditor = useMemo(
    () => dynamic(() => import("@uiw/react-md-editor"), { ssr: false }),
    []
  );

  const onEditorChange = (value: string | undefined) => {
    onChange(value || "");
  };

  return (
    <div className="bg-white">
      <MDEditor value={value} onChange={onEditorChange} />
    </div>
  );
};

export default Editor;

// TIMESTAMP: 2021-10-06T20:00:00Z 5.11.59 https://youtu.be/Big_aFLmekI?t=18719
