import React, { useState } from 'react';
import { useCourse } from './contexts/CourseContext';
import { generateLesson } from './api/openai';
import { parseLesson } from './api/parseLesson';
import Editor from './components/Editor/Editor';
import ModuleManager from './components/ModuleManager/ModuleManager';
import LessonPreview from './components/LessonPreview';
import ExportOptions from './components/ExportOptions';
import { CourseProvider } from './contexts/CourseContext';

function App() {
  return (
    <CourseProvider>
      <div className="container mx-auto p-6 max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-blue-700">CourseGPT</h1>
          <p className="text-gray-600">AI-Powered Course Authoring Platform</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <LessonGenerator />
            <Editor />
            <LessonPreview />
          </div>
          <div className="space-y-6">
            <ModuleManager />
            <ExportOptions />
          </div>
        </div>
      </div>
    </CourseProvider>
  );
}

const LessonGenerator = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const { setLessonData } = useCourse();

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const generatedLesson = await generateLesson(topic);
      if (!generatedLesson) {
        throw new Error('Empty response from AI');
      }
      const parsed = parseLesson(generatedLesson);
      setLessonData(parsed);
    } catch (err) {
      console.error("Generation error:", err);
      setLessonData(defaultLesson()); // Fallback to empty lesson
      alert('Failed to generate lesson. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Lesson Generator</h2>
      <div className="flex gap-2">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic (e.g., Photosynthesis)"
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !topic.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg disabled:opacity-50 flex items-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : 'Generate'}
        </button>
      </div>
    </div>
  );
};

export default App;