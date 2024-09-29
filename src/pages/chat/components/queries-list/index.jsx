import { Button, Typography } from "antd";
import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ContextModal } from "./components";

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
        my-5 relative w-full overflow-y-auto lg:w-1/2 
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
            group-hover:blur-sm
            w-full h-fit p-5 rounded-lg shadow-primary/10
            hover:!blur-0 hover:bg-surface hover:shadow-md
            transition-all ease-in-out duration-500
            "
        >
          <Typography.Paragraph className="text-base font-bold w-full capitalize">
            {`${query?.question}?`}
          </Typography.Paragraph>
          <Typography.Paragraph
            ellipsis={{
              rows: 4,
              expandable: "collapsible",
              symbol: "Read more",
            }}
            className="text-xs font-light w-full"
            copyable
          >
            {query?.answer}
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
