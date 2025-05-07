import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useCourse } from '../contexts/CourseContext';

const LessonPreview = () => {
  const { lessonData } = useCourse();

  if (!lessonData.title) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Lesson Preview</h2>
      
      <div className="prose max-w-none">
        <h1 className="text-2xl font-bold text-blue-700">{lessonData.title}</h1>
        
        {lessonData.objectives.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Learning Objectives</h2>
            <ul className="list-disc pl-5 space-y-1">
              {lessonData.objectives.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>
        )}

        {lessonData.summary && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Lesson Summary</h2>
            <ReactMarkdown>{lessonData.summary}</ReactMarkdown>
          </div>
        )}

        {lessonData.activities.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Learning Activities</h2>
            <ol className="list-decimal pl-5 space-y-2">
              {lessonData.activities.map((act, i) => (
                <li key={i}><ReactMarkdown>{act}</ReactMarkdown></li>
              ))}
            </ol>
          </div>
        )}

        {lessonData.keyTerms.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Key Terms</h2>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {lessonData.keyTerms.map((term, i) => (
                <React.Fragment key={i}>
                  <dt className="font-medium">{term.term}</dt>
                  <dd className="mb-2">{term.definition}</dd>
                </React.Fragment>
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonPreview;