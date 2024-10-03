export function pagesMerger(pages) {
  const merged = {};

  pages.forEach(({ page_num, page_text }) => {
    // If the page_num already exists, append the content
    if (merged[page_num]) {
      merged[page_num].page_content.push(page_text);
    } else {
      // Otherwise, create a new entry with page_content as an array
      merged[page_num] = {
        page_num,
        page_content: [page_text],
      };
    }
  });

  // Convert the merged object back into an array format
  return Object.values(merged);
}
