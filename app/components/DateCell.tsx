import React from "react";
import { useEffect, useState } from "react";

export default function DateCell({ iso }: { iso: string }) {
  const [text, setText] = useState("");
  useEffect(() => {
    setText(new Date(iso).toLocaleString("pt-BR"));
  }, [iso]);
  return <span>{text}</span>;
}
