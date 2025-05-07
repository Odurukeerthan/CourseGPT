import React, { useState } from 'react';
import { useCourse } from '../../contexts/CourseContext';

const ModuleItem = ({ module, isActive, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { lessonData, addLessonToModule } = useCourse();

  return (
    <div className={`border rounded-lg overflow-hidden ${isActive ? 'border-blue-500' : 'border-gray-200'}`}>
      <div 
        className={`p-3 cursor-pointer flex justify-between items-center ${isActive ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
        onClick={() => {
          onSelect();
          setIsExpanded(!isExpanded);
        }}
      >
        <div className="font-medium">{module.name}</div>
        <div className="flex items-center">
          <span className="text-xs bg-gray-100 px-2 py-1 rounded mr-2">
            {module.lessons.length} {module.lessons.length === 1 ? 'lesson' : 'lessons'}
          </span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 text-gray-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isExpanded ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
          </svg>
        </div>
      </div>

      {isExpanded && (
        <div className="p-3 border-t bg-white">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="Module description..."
              rows="2"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select className="w-full p-1 border border-gray-300 rounded text-sm">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (min)</label>
              <input 
                type="number" 
                className="w-full p-1 border border-gray-300 rounded text-sm" 
                min="0" 
                step="5"
              />
            </div>
          </div>

          {lessonData.title && (
            <button
              onClick={() => addLessonToModule(module.id, lessonData)}
              className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm py-1 px-3 rounded border border-blue-200"
            >
              Add Current Lesson
            </button>
          )}

          {module.lessons.length > 0 && (
            <div className="mt-3 border-t pt-3">
              <h4 className="text-sm font-medium mb-2">Lessons in this module:</h4>
              <ul className="space-y-2">
                {module.lessons.map((lesson, i) => (
                  <li key={i} className="text-sm p-2 bg-gray-50 rounded">
                    {lesson.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ModuleItem;