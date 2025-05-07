import React, { useState } from 'react';
import { useCourse } from '../../contexts/CourseContext';
import ModuleItem from './ModuleItem';
import ModuleSequencer from './ModuleSequencer';

const ModuleManager = () => {
  const { modules, setModules, currentModule, setCurrentModule } = useCourse();
  const [moduleName, setModuleName] = useState('');
  const [showSequencer, setShowSequencer] = useState(false);

  const addModule = () => {
    if (moduleName.trim()) {
      const newModule = {
        id: Date.now().toString(),
        name: moduleName.trim(),
        lessons: [],
        description: '',
        duration: 0,
        difficulty: 'beginner',
        prerequisites: []
      };
      setModules([...modules, newModule]);
      setModuleName('');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Course Modules</h2>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
          placeholder="New Module Name"
          className="flex-1 p-2 border border-gray-300 rounded-lg"
          onKeyPress={(e) => e.key === 'Enter' && addModule()}
        />
        <button
          onClick={addModule}
          disabled={!moduleName.trim()}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg disabled:opacity-50"
        >
          Add
        </button>
      </div>

      {modules.length > 0 && (
        <button
          onClick={() => setShowSequencer(!showSequencer)}
          className="mb-4 text-sm text-blue-600 hover:text-blue-800 flex items-center"
        >
          {showSequencer ? 'Hide Sequencer' : 'Show Module Sequencer'}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showSequencer ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
          </svg>
        </button>
      )}

      {showSequencer && <ModuleSequencer />}

      <div className="space-y-3">
        {modules.map((mod) => (
          <ModuleItem 
            key={mod.id} 
            module={mod} 
            isActive={currentModule?.id === mod.id}
            onSelect={() => setCurrentModule(mod)}
          />
        ))}
      </div>
    </div>
  );
};

export default ModuleManager;