import React, { createContext, useState, useContext } from 'react';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [lessonData, setLessonData] = useState({
    title: '',
    objectives: [],
    summary: '',
    activities: [],
    keyTerms: [],
    duration: 30, // minutes
    difficulty: 'beginner'
  });

  const [modules, setModules] = useState([]);
  const [currentModule, setCurrentModule] = useState(null);

  const addLessonToModule = (moduleId, lesson) => {
    setModules(prev => prev.map(mod => 
      mod.id === moduleId 
        ? { ...mod, lessons: [...mod.lessons, lesson] } 
        : mod
    ));
  };

  return (
    <CourseContext.Provider value={{
      lessonData,
      setLessonData,
      modules,
      setModules,
      currentModule,
      setCurrentModule,
      addLessonToModule
    }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => useContext(CourseContext);