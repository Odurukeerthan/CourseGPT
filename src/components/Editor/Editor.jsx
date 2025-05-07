import React from 'react';
import { useCourse } from '../../contexts/CourseContext';
import SectionRegenerator from './SectionRegenerator';

const Editor = () => {
  const { lessonData, setLessonData } = useCourse();

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Lesson Editor</h2>
        <div className="flex gap-2">
          <SectionRegenerator section="title" />
          <SectionRegenerator section="objectives" />
          <SectionRegenerator section="summary" />
          <SectionRegenerator section="activities" />
        </div>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            value={lessonData.title}
            onChange={(e) => setLessonData({...lessonData, title: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Objectives */}
        <div>
          <label className="block font-medium mb-1">Learning Objectives</label>
          {lessonData.objectives.map((obj, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                value={obj}
                onChange={(e) => {
                  const newObj = [...lessonData.objectives];
                  newObj[i] = e.target.value;
                  setLessonData({...lessonData, objectives: newObj});
                }}
                className="flex-1 p-2 border border-gray-300 rounded-lg"
                placeholder={`Objective ${i + 1}`}
              />
              <button 
                onClick={() => {
                  const newObj = lessonData.objectives.filter((_, idx) => idx !== i);
                  setLessonData({...lessonData, objectives: newObj});
                }}
                className="text-red-500 hover:text-red-700 p-2"
              >
                ×
              </button>
            </div>
          ))}
          <button 
            onClick={() => setLessonData({
              ...lessonData, 
              objectives: [...lessonData.objectives, '']
            })}
            className="mt-2 text-blue-600 hover:text-blue-800 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Objective
          </button>
        </div>

        {/* Summary */}
        <div>
          <label className="block font-medium mb-1">Lesson Summary</label>
          <textarea
            value={lessonData.summary}
            onChange={(e) => setLessonData({...lessonData, summary: e.target.value})}
            className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Detailed lesson content..."
          />
        </div>

        {/* Activities */}
        <div>
          <label className="block font-medium mb-1">Learning Activities</label>
          {lessonData.activities.map((act, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <textarea
                value={act}
                onChange={(e) => {
                  const newAct = [...lessonData.activities];
                  newAct[i] = e.target.value;
                  setLessonData({...lessonData, activities: newAct});
                }}
                className="flex-1 p-2 border border-gray-300 rounded-lg"
                placeholder={`Activity ${i + 1}`}
                rows="2"
              />
              <button 
                onClick={() => {
                  const newAct = lessonData.activities.filter((_, idx) => idx !== i);
                  setLessonData({...lessonData, activities: newAct});
                }}
                className="text-red-500 hover:text-red-700 p-2"
              >
                ×
              </button>
            </div>
          ))}
          <button 
            onClick={() => setLessonData({
              ...lessonData, 
              activities: [...lessonData.activities, '']
            })}
            className="mt-2 text-blue-600 hover:text-blue-800 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Activity
          </button>
        </div>

        {/* Key Terms */}
        <div>
          <label className="block font-medium mb-1">Key Terms</label>
          <div className="space-y-2">
            {lessonData.keyTerms.map((term, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={term.term}
                  onChange={(e) => {
                    const newTerms = [...lessonData.keyTerms];
                    newTerms[i].term = e.target.value;
                    setLessonData({...lessonData, keyTerms: newTerms});
                  }}
                  className="flex-1 p-2 border border-gray-300 rounded-lg"
                  placeholder="Term"
                />
                <input
                  value={term.definition}
                  onChange={(e) => {
                    const newTerms = [...lessonData.keyTerms];
                    newTerms[i].definition = e.target.value;
                    setLessonData({...lessonData, keyTerms: newTerms});
                  }}
                  className="flex-1 p-2 border border-gray-300 rounded-lg"
                  placeholder="Definition"
                />
                <button 
                  onClick={() => {
                    const newTerms = lessonData.keyTerms.filter((_, idx) => idx !== i);
                    setLessonData({...lessonData, keyTerms: newTerms});
                  }}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setLessonData({
              ...lessonData, 
              keyTerms: [...lessonData.keyTerms, {term: '', definition: ''}]
            })}
            className="mt-2 text-blue-600 hover:text-blue-800 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Term
          </button>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Duration (minutes)</label>
            <input
              type="number"
              value={lessonData.duration}
              onChange={(e) => setLessonData({
                ...lessonData, 
                duration: Math.max(5, parseInt(e.target.value) || 30)
              })}
              className="w-full p-2 border border-gray-300 rounded-lg"
              min="5"
              step="5"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Difficulty</label>
            <select
              value={lessonData.difficulty}
              onChange={(e) => setLessonData({
                ...lessonData, 
                difficulty: e.target.value
              })}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;