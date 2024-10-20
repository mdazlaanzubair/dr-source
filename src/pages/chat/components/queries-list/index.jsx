import { Button, Empty, Input, Select, Skeleton, Typography, Spin } from "antd";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ContextModal } from "./components";
import Markdown from "react-markdown";
import { TbTrashFilled } from "react-icons/tb";
import { deleteQuery } from "../../../../redux/chat/actions";
import { FaExclamationCircle } from "react-icons/fa";

const QueriesList = () => {
  const dispatch = useDispatch();

  const {
    queries,
    selectedFile,
    isLoadingQueries,
    fileEmbeddingTime,
    queryResponseTime,
  } = useSelector((state) => state.chat);

  const [filteredQueries, setFilteredQueries] = useState([]);
  const [showContext, setShowContext] = useState(null);
  const [searchWord, setSearchWord] = useState("");
  const [searchBy, setSearchBy] = useState("BY_QUESTION");
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState({}); // Track expanded state for each query

  const handleDeleteQuery = (query_id) => {
    setIsLoading(true);
    const callback = setIsLoading(false);
    dispatch(deleteQuery(query_id, callback));
  };

  useLayoutEffect(() => {
    const arr = queries?.filter((query) => query?.file_id == selectedFile?.id);
    setFilteredQueries([...arr]);
  }, [queries, selectedFile]);

  useEffect(() => {
    if (!queries || !selectedFile) return;

    let filteredArr = queries?.filter(
      (query) => query?.file_id === selectedFile?.id
    );

    if (!searchWord?.length) {
      setFilteredQueries([...filteredArr]);
    } else {
      if (searchBy === "BY_QUESTION") {
        filteredArr = filteredArr.filter((item) =>
          item.question?.toLowerCase()?.includes(searchWord.toLowerCase())
        );
      } else {
        filteredArr = filteredArr.filter((item) =>
          item.answer?.toLowerCase()?.includes(searchWord.toLowerCase())
        );
      }
      setFilteredQueries([...filteredArr]);
    }
  }, [searchWord, searchBy]);

  // Handle expand/collapse toggle
  const toggleExpand = (queryId) => {
    setExpanded((prev) => ({
      ...prev,
      [queryId]: !prev[queryId],
    }));
  };

  return (
    <div
      className={`group
        py-5 relative w-full overflow-y-auto 
        flex flex-col items-center justify-center gap-3
        z-10 backdrop-blur-md bg-opacity-90
        ${true ? "h-auto opacity-100" : "h-0 opacity-0"}
        transition-all ease-in-out duration-1000
        `}
    >
      {isLoadingQueries &&
        filteredQueries?.length <= 0 &&
        [1, 2, 3]?.map((item) => (
          <div
            key={item}
            className="border w-full h-fit p-5 rounded-lg shadow-primary/10"
          >
            <Skeleton />
          </div>
        ))}

      {!isLoadingQueries && filteredQueries?.length > 0 && (
        <Input
          size="large"
          className="text-xs"
          allowClear
          placeholder="Search your queries"
          onChange={(e) => setSearchWord(e.target.value?.toLowerCase())}
          addonAfter={
            <Select
              id="custom-select-id"
              options={[
                { label: "by question", value: "BY_QUESTION" },
                { label: "by answer", value: "BY_ANSWER" },
              ]}
              value={searchBy}
              onChange={(value) => setSearchBy(value)}
            />
          }
        />
      )}

      {queryResponseTime > 0 && (
        <div className="flex w-full items-center text-sm p-3 bg-blue-100 text-blue-600 border border-blue-600 rounded-md gap-2">
          <FaExclamationCircle />
          <p>
            {`Computing time for document retrieval and response generation is ${(
              queryResponseTime / 1000
            ).toFixed(1)}s`}
          </p>
        </div>
      )}

      {fileEmbeddingTime > 0 && (
        <div className="flex w-full items-center text-sm p-3 bg-blue-100 text-blue-600 border border-blue-600 rounded-md gap-2">
          <FaExclamationCircle />
          <p>
            {`Computing time for document vector embedding is ${(
              fileEmbeddingTime / 1000
            ).toFixed(1)}s`}
          </p>
        </div>
      )}

      {!isLoadingQueries &&
        filteredQueries?.length > 0 &&
        filteredQueries?.map((query) => (
          <div
            key={query?.id}
            className="
            border border-secondary/10 group-hover:border-transparent
            w-full h-fit p-5 rounded-lg shadow-primary/10
           bg-background hover:shadow
            transition-all ease-in-out duration-500
            "
            onClick={() => toggleExpand(query?.id)}
          >
            <Typography.Paragraph
              ellipsis={
                expanded[query?.id]
                  ? false // Do not truncate if expanded
                  : {
                      rows: 2,
                      expandable: false,
                      symbol: <span style={{ color: "blue" }}>Show more</span>,
                    } // Truncate to 2 lines if not expanded
              }
              className="text-xs text-primary font-bold w-full capitalize"
            >
              {`${query?.question}`}
            </Typography.Paragraph>

            <Typography.Paragraph
              className="text-secondary text-xs font-light w-full"
              ellipsis={
                expanded[query?.id]
                  ? false // Do not truncate if expanded
                  : {
                      rows: 9,
                      expandable: false,
                      symbol: <span style={{ color: "blue" }}>Show more</span>,
                    } // Truncate to 9 lines if not expanded
              }
            >
              <Markdown>{query?.answer}</Markdown>
            </Typography.Paragraph>

            <div className="flex items-center justify-between gap-3">
              <Button
                type="primary"
                variant="outlined"
                size="small"
                className="text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowContext(query?.context);
                }}
              >
                Document reference
              </Button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteQuery(query?.id);
                }}
                className="hover:text-red-700 text-red-600 transition-all ease-in-out duration-500"
              >
                {isLoading ? <Spin size="small" /> : <TbTrashFilled />}
              </button>
            </div>
          </div>
        ))}

      {!isLoadingQueries && filteredQueries?.length <= 0 && (
        <div className="border w-full h-fit p-5 rounded-lg shadow-primary/10">
          <p className="text-xs font-bold w-full capitalize mb-0 pb-0">
            <Empty description={"No Queries"} />
          </p>
        </div>
      )}

      <ContextModal
        showContext={showContext}
        closeHandler={() => setShowContext(null)}
      />
    </div>
  );
};

export default QueriesList;
