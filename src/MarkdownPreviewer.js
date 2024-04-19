// MarkdownPreviewer.js
import React, { useState } from 'react';

const MarkdownPreviewer = () => {
  const [markdown, setMarkdown] = useState(defaultMarkdown);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  const convertToHtml = (markdownText) => {
    // Simple Markdown to HTML conversion
    return markdownText
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/```([\s\S]+?)```/g, '<pre>$1</pre>')
      .replace(/^\- (.+)$/gm, '<li>$1</li>')
      .replace(/^\> (.+)$/gm, '<blockquote>$1</blockquote>')
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2"/>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <h2 className="text-center">Editor</h2>
          <textarea
            id="editor"
            className="form-control"
            value={markdown}
            onChange={handleChange}
            rows="15"
          ></textarea>
        </div>
        <div className="col-md-6">
          <h2 className="text-center">Preview</h2>
          <div
            id="preview"
            className="preview-box border p-3"
            dangerouslySetInnerHTML={{ __html: convertToHtml(markdown) }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// Default Markdown text with examples
const defaultMarkdown = `
# Heading 1
## Heading 2
[Link](https://www.example.com)
\`inline code\`
\`\`\`
// code block
function add(a, b) {
  return a + b;
}
\`\`\`
- List item 1
- List item 2

> Blockquote

![Image](https://via.placeholder.com/150)
**Bold Text**
`;

export default MarkdownPreviewer;
