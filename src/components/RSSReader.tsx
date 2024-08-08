"use client";

import { useState } from "react";
import RSSForm from "./RSSForm";
import RSSFeed from "./RSSFeed";

export default function RSSReader() {
  const [url, setUrl] = useState("");

  return (
    <div>
      <RSSForm onSubmit={setUrl} />
      {url && <RSSFeed url={url} />}
    </div>
  );
}
