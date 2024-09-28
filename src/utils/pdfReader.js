import * as pdfjsLib from "pdfjs-dist";
// Set the path to the worker script
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.6.82/pdf.worker.min.mjs`;

function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);

    reader.readAsArrayBuffer(file);
  });
}

export async function pdfReader(file, onFailure) {
  try {
    // READ FILE AS "ArrayBuffer"
    const arrayBuffer = await readFileAsArrayBuffer(file);

    // CONVERTING "ArrayBuffer TO TYPED ARRAY
    const typedArray = new Uint8Array(arrayBuffer);

    // LOAD TYPED ARRAY USING "pdfjsLib" AS A PDF DOCUMENT
    const pdf = await pdfjsLib.getDocument(typedArray).promise;

    let pdfContent = [];

    // LOOP THROUGH EACH PAGE/ARRAY-ELEMENT IN THE PDF DOCUMENT
    for (let i = 1; i <= pdf.numPages; i++) {
      // GET CURRENT PAGE/ARRAY-ELEMENT
      const pageContent = await pdf.getPage(i);

      // EXTRACT TEXT-CONTENT ELEMENTS FROM THAT PAGE/ARRAY-ELEMENT
      const textContent = await pageContent.getTextContent();

      // EXTRACT TEXT FROM EACH TEXT-CONTENT ELEMENT CONCATENATE INTO A STRING
      const rawPageText = textContent.items.map((item) => item.str).join(" ");

      // TEXT PREPROCESSING (remove special characters, extra spaces, etc.)
      const preProcessedText = rawPageText
        .replace(/\n/g, " ") // Replace newlines with spaces
        .replace(/\s+/g, " ") // Replace multiple spaces with a single space
        .trim()
        .toLowerCase(); // Convert to lowercase

      // APPENDING THE PAGE/ARRAY-ELEMENT TEXT INTO THE OVERALL DOCUMENT TEXT VARIABLE
      pdfContent.push({ page_num: `${i}`, page_text: preProcessedText });
    }

    // RETURNING LIST OF OBJECTS OF THE PROCESSED PDF
    return pdfContent;
  } catch (error) {
    onFailure && onFailure();
    // THROW ERROR WHILE EXTRACTING THE TEXT FROM PDF
    throw new Error(error);
  }
}
