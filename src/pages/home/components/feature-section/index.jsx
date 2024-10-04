import React from "react";
import advanceSearchImage from "../../../../assets/features-imgs/advance-search.jpg";
import conversationImage from "../../../../assets/features-imgs/conversation.jpg";
import docUploadImage from "../../../../assets/features-imgs/doc-upload.jpg";
import geminiImage from "../../../../assets/features-imgs/gemini.jpg";
import readerImage from "../../../../assets/features-imgs/reader.jpg";

const FeatureSection = () => {
  return (
    <section
      id="about-section"
      className="w-full text-secondary bg-surface body-font py-10 px-5"
    >
      <h1 className="my-4 text-4xl font-extrabold tracking-tight leading-none text-primary md:text-5xl lg:text-6xl text-center">
        Features
      </h1>
      <div className="w-full px-5 py-24 mx-auto">
        <div className="flex items-center mx-auto border-b pb-10 mb-10 border-gray-200 lg:flex-row flex-col gap-5">
          <div className="w-full lg:w-1/2 h-auto">
            <img
              src={conversationImage}
              className="w-3/4 rounded-lg shadow-lg aspect-video object-fill mx-auto"
              alt="conversation-img"
            />
          </div>
          <div className="w-auto sm:text-left text-center mt-6 sm:mt-0">
            <h2 className="text-gray-900 text-xl lg:text-4xl title-font font-bold lg:font-extrabold mb-2">
              Conversational Document Interaction
            </h2>
            <p className="leading-relaxed text-base lg:text-lg max-w-2xl">
              Ask natural language questions and receive detailed, relevant
              answers based on your document's content, making it easier to
              extract key information without reading the entire document.
            </p>
          </div>
        </div>
        <div className="flex items-center mx-auto border-b pb-10 mb-10 border-gray-200 lg:flex-row-reverse flex-col gap-5">
          <div className="w-full lg:w-1/2 h-auto">
            <img
              src={readerImage}
              className="w-3/4 rounded-lg shadow-lg aspect-video object-fill mx-auto"
              alt="reader-img"
            />
          </div>
          <div className="w-auto sm:text-left text-center mt-6 sm:mt-0">
            <h2 className="text-gray-900 text-xl lg:text-4xl title-font font-bold lg:font-extrabold mb-2">
              Efficient Reading
            </h2>
            <p className="leading-relaxed text-base lg:text-lg max-w-2xl">
              No more skimming through irrelevant sections. Dr. Source helps you
              focus on the information that matters most, saving time and
              effort.
            </p>
          </div>
        </div>
        <div className="flex items-center mx-auto border-b pb-10 mb-10 border-gray-200 lg:flex-row flex-col gap-5">
          <div className="w-full lg:w-1/2 h-auto">
            <img
              src={geminiImage}
              className="w-3/4 rounded-lg shadow-lg aspect-video object-fill mx-auto"
              alt="gemini-img"
            />
          </div>
          <div className="w-auto sm:text-left text-center mt-6 sm:mt-0">
            <h2 className="text-gray-900 text-xl lg:text-4xl title-font font-bold lg:font-extrabold mb-2">
              AI-Powered by Google Gemini
            </h2>
            <p className="leading-relaxed text-base lg:text-lg max-w-2xl">
              Leverage the power of Large Language Models like Google Gemini AI
              to provide accurate and contextual answers from your uploaded
              documents.
            </p>
          </div>
        </div>
        <div className="flex items-center mx-auto border-b pb-10 mb-10 border-gray-200 lg:flex-row-reverse flex-col gap-5">
          <div className="w-full lg:w-1/2 h-auto">
            <img
              src={docUploadImage}
              className="w-3/4 rounded-lg shadow-lg aspect-video object-fill mx-auto"
              alt="document-upload-img"
            />
          </div>
          <div className="w-auto sm:text-left text-center mt-6 sm:mt-0">
            <h2 className="text-gray-900 text-xl lg:text-4xl title-font font-bold lg:font-extrabold mb-2">
              Seamless Document Upload
            </h2>
            <p className="leading-relaxed text-base lg:text-lg max-w-2xl">
              Easily upload your PDF documents, and let Dr. Source handle the
              parsing, vectorization, and storage for fast and efficient
              querying.
            </p>
          </div>
        </div>
        <div className="flex items-center mx-auto lg:flex-row flex-col gap-5">
          <div className="w-full lg:w-1/2 h-auto">
            <img
              src={advanceSearchImage}
              className="w-3/4 rounded-lg shadow-lg aspect-video object-fill mx-auto"
              alt="advance-search-img"
            />
          </div>
          <div className="w-auto sm:text-left text-center mt-6 sm:mt-0">
            <h2 className="text-gray-900 text-xl lg:text-4xl title-font font-bold lg:font-extrabold mb-2">
              Advanced Search Capabilities
            </h2>
            <p className="leading-relaxed text-base lg:text-lg max-w-2xl">
              Using cutting-edge technologies like LangChain and Pinecome, Dr.
              Source enables precise and fast vectorized searches, helping you
              retrieve the right information quickly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
