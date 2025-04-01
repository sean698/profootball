export const decodeHtmlEntities = (str) => {
    const doc = new DOMParser().parseFromString(str, 'text/html');
    return doc.documentElement.textContent;
  };
  