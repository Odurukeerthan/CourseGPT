import React from 'react';
import { useCourse } from '../contexts/CourseContext';

const ExportOptions = () => {
  const { modules } = useCourse();

  const exportPDF = () => {
    // Create a printable HTML content
    let content = `
      <html>
        <head>
          <title>Course Content</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
            h1 { color: #2d3748; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; }
            h2 { color: #4a5568; margin-top: 30px; }
            h3 { color: #718096; margin-top: 20px; }
            ul { margin: 10px 0; }
            li { margin-bottom: 5px; }
          </style>
        </head>
        <body>
          <h1>Course Content</h1>
    `;
    
    modules.forEach((mod, i) => {
      content += `<h2>Module ${i + 1}: ${mod.name}</h2>`;
      if (mod.description) content += `<p>${mod.description}</p>`;
      
      mod.lessons.forEach((lesson, j) => {
        content += `<h3>Lesson ${j + 1}: ${lesson.title}</h3>`;
        if (lesson.objectives.length > 0) {
          content += `<p><strong>Learning Objectives:</strong></p><ul>`;
          lesson.objectives.forEach(obj => content += `<li>${obj}</li>`);
          content += `</ul>`;
        }
        if (lesson.summary) content += `<p>${lesson.summary}</p>`;
      });
    });

    content += `</body></html>`;

    // Open a new window with the content
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.open();
    printWindow.document.write(content);
    printWindow.document.close();

    // Wait for content to load before printing
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-3">Export Options</h2>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={exportPDF}
          disabled={modules.length === 0}
          className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded text-sm flex items-center disabled:opacity-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
          PDF
        </button>
      </div>
    </div>
  );
};

export default ExportOptions;