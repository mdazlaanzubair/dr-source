import { Button, Typography } from "antd";
import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ContextModal } from "./components";
import Markdown from "react-markdown";

const QueriesList = () => {
  const { queries, selectedFile } = useSelector((state) => state.chat);

  const [filteredQueries, setFilteredQueries] = useState([]);
  const [showContext, setShowContext] = useState(null);

  useLayoutEffect(() => {
    const arr = queries?.filter((query) => query?.file_id == selectedFile?.id);
    setFilteredQueries([...arr]);
  }, [queries, selectedFile]);

  return (
    <div
      className={`group
        py-5 relative w-full overflow-y-auto lg:w-1/2 
        flex flex-col items-center justify-center gap-3
        z-10 backdrop-blur-md bg-opacity-90
        ${true ? "h-auto opacity-100" : "h-0 opacity-0"}
        transition-all ease-in-out duration-1000
        `}
    >
      {filteredQueries?.map((query) => (
        <div
          key={query?.id}
          className="
            group-hover:opacity-50
            w-full h-fit p-5 rounded-lg shadow-primary/10
            hover:!opacity-100 hover:bg-surface hover:shadow-md
            transition-all ease-in-out duration-500
            "
        >
          <Typography.Paragraph
            ellipsis={{
              rows: 2,
              expandable: "collapsible",
              symbol: <small className="text-xs">Expand</small>,
            }}
            className="text-xs font-bold w-full capitalize"
          >
            {`${query?.question}?`}
          </Typography.Paragraph>
          <Typography.Paragraph
            ellipsis={{
              rows: 9,
              expandable: "collapsible",
              symbol: "View answer",
            }}
            className="text-xs font-light w-full"
            copyable
          >
            <Markdown>{query?.answer}</Markdown>
          </Typography.Paragraph>
          <Button
            type="primary"
            variant="outlined"
            size="small"
            className="text-xs"
            onClick={() => setShowContext(query?.context)}
          >
            Document reference
          </Button>
        </div>
      ))}

      <ContextModal
        showContext={showContext}
        closeHandler={() => setShowContext(null)}
      />
    </div>
  );
};

export default QueriesList;
