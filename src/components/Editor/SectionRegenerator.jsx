import React, { useState } from 'react';
import { useCourse } from '../../contexts/CourseContext';
import { generateLesson } from '../../api/openai';

const SectionRegenerator = ({ section }) => {
  const [loading, setLoading] = useState(false);
  const { lessonData, setLessonData } = useCourse();
  
  const labels = {
    title: 'Title',
    objectives: 'Objectives',
    summary: 'Summary',
    activities: 'Activities'
  };

  const handleRegenerate = async () => {
    setLoading(true);
    try {
      const generated = await generateLesson(lessonData.title || 'lesson');
      if (generated) {
        setLessonData({
          ...lessonData,
          [section]: generated[section] || lessonData[section]
        });
      }
    } catch (err) {
      console.error('Regeneration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleRegenerate}
      disabled={loading}
      className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded flex items-center"
      title={`Regenerate ${labels[section]}`}
    >
      {loading ? (
        <svg className="animate-spin h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <svg className="h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )}
      {labels[section]}
    </button>
  );
};

export default SectionRegenerator;