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
      .replace(/^# (.+)$/gm, '<h1>$1</h1>') // Convert h1
      .replace(/^## (.+)$/gm, '<h2>$1</h2>') // Convert h2
      .replace(/^### (.+)$/gm, '<h3>$1</h3>') // Convert h3
      .replace(/^#### (.+)$/gm, '<h4>$1</h4>') // Convert h4
      .replace(/^##### (.+)$/gm, '<h5>$1</h5>') // Convert h5
      .replace(/^###### (.+)$/gm, '<h6>$1</h6>') // Convert h6
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>') // Convert links
      .replace(/`(.+?)`/g, '<code>$1</code>') // Convert inline code
      .replace(/```([\s\S]+?)```/g, '<pre>$1</pre>') // Convert code block
      .replace(/^\- (.+)$/gm, '<li>$1</li>') // Convert list item
      .replace(/^\* (.+)$/gm, '<li>$1</li>') // Convert list item (alternative)
      .replace(/^\d+\. (.+)$/gm, '<li>$1</li>') // Convert numbered list item
      .replace(/^\|(.+?)\|/gm, (match, p1) => { // Convert table row
        const cells = p1.trim().split('|').filter(cell => !!cell.trim());
        const htmlCells = cells.map(cell => `<td>${cell.trim()}</td>`).join('');
        return `<tr>${htmlCells}</tr>`;
      })
      .replace(/^\|(.+?)\|/gm, '<tr><td>$1</td></tr>') // Convert table row (alternative)
      .replace(/^\>\s(.+)$/gm, '<blockquote>$1</blockquote>') // Convert blockquote
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2"/>') // Convert image
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') // Convert bold
      .replace(/\*(.+?)\*/g, '<em>$1</em>') // Convert italic
      .replace(/\n{2,}/g, '<br/>') // Convert line breaks
      .replace(/(?:\r\n|\r|\n)/g, '<br/>') // Convert line breaks (alternative)
      .replace(/^\-\-\-$/gm, '<hr/>') // Convert horizontal rule
      .replace(/\^\[youtube:(.*?)\]/g, '<iframe width="560" height="315" src="https://www.youtube.com/embed/$1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'); // Convert YouTube video
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

| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |

---

^[youtube:VIDEO_ID]
`;

export default MarkdownPreviewer;
