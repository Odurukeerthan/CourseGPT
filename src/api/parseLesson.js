// First define defaultLesson as a function
const defaultLesson = () => ({
    title: '',
    objectives: [],
    summary: '',
    activities: [],
    keyTerms: [],
    duration: 30,
    difficulty: 'beginner'
  });
  
  export const parseLesson = (data) => {
    if (!data) return defaultLesson();
  
    // If data is already parsed (from API)
    if (typeof data === 'object') {
      return {
        ...defaultLesson(), // Spread default values first
        title: data.title || '',
        objectives: Array.isArray(data.objectives) ? data.objectives : [],
        summary: data.summary || '',
        activities: Array.isArray(data.activities) ? data.activities : [],
        keyTerms: Array.isArray(data.keyTerms) ? data.keyTerms : [],
        duration: data.duration || 30,
        difficulty: ['beginner', 'intermediate', 'advanced'].includes(data.difficulty) 
          ? data.difficulty 
          : 'beginner'
      };
    }
  
    // Fallback for unexpected formats
    return defaultLesson();
  };
  
  // For backward compatibility
  export default parseLesson;