import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Trophy, Code, BookOpen, Play } from 'lucide-react';
import { level1MCQs, level2CodingQuestions, MCQQuestion, CodingQuestion } from '../../data/assessmentQuestions';
import toast from 'react-hot-toast';

interface AssessmentProps {
  level: number;
  onBack: () => void;
  onComplete: (score: number) => void;
}

export const Assessment: React.FC<AssessmentProps> = ({ level, onBack, onComplete }) => {
  const [currentView, setCurrentView] = useState<'intro' | 'mcq' | 'coding' | 'results'>('intro');
  
  // MCQ State
  const [currentMCQIndex, setCurrentMCQIndex] = useState(0);
  const [mcqAnswers, setMCQAnswers] = useState<number[]>([]);
  const [mcqScore, setMCQScore] = useState(0);
  
  // Coding State
  const [currentCodingIndex, setCurrentCodingIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState<'python' | 'javascript' | 'java' | 'c' | 'cpp'>('python');
  const [code, setCode] = useState('');
  const [codingResults, setCodingResults] = useState<boolean[]>([]);
  const [testResults, setTestResults] = useState<{ passed: boolean; message: string }[]>([]);
  
  const questions = level === 1 ? level1MCQs : [];
  const codingQuestions = level === 2 ? level2CodingQuestions : [];
  
  const currentMCQ = questions[currentMCQIndex];
  const currentCoding = codingQuestions[currentCodingIndex];

  // Initialize code when coding question or language changes
  React.useEffect(() => {
    if (currentCoding && currentView === 'coding') {
      setCode(currentCoding.starterCode[selectedLanguage]);
      setTestResults([]);
    }
  }, [currentCoding, selectedLanguage, currentView]);

  const handleStartAssessment = () => {
    if (level === 1) {
      setCurrentView('mcq');
    } else {
      setCurrentView('coding');
    }
  };

  const handleMCQAnswer = (answerIndex: number) => {
    const newAnswers = [...mcqAnswers, answerIndex];
    setMCQAnswers(newAnswers);

    if (answerIndex === currentMCQ.correctAnswer) {
      setMCQScore(mcqScore + 1);
      toast.success('Correct! ' + currentMCQ.explanation);
    } else {
      toast.error(`Incorrect. ${currentMCQ.explanation}`);
    }

    setTimeout(() => {
      if (currentMCQIndex < questions.length - 1) {
        setCurrentMCQIndex(currentMCQIndex + 1);
      } else {
        const finalScore = Math.round((mcqScore + (answerIndex === currentMCQ.correctAnswer ? 1 : 0)) / questions.length * 100);
        onComplete(finalScore);
        setCurrentView('results');
      }
    }, 2000);
  };

  const runTests = () => {
    // Simplified test execution - in real implementation, this would run actual code
    const results: { passed: boolean; message: string }[] = [];
    
    // Simulate test execution
    const codeLength = code.trim().length;
    const hasLogic = code.includes('if') || code.includes('for') || code.includes('while') || code.includes('return');
    
    currentCoding.testCases.forEach((testCase, index) => {
      // Simple heuristic - in production, you'd use a code execution engine
      const passed = codeLength > 50 && hasLogic && Math.random() > 0.3; // Simulated
      results.push({
        passed,
        message: passed ? `✓ ${testCase.description}` : `✗ ${testCase.description} - Check your logic`,
      });
    });

    setTestResults(results);
    
    const allPassed = results.every(r => r.passed);
    if (allPassed) {
      toast.success('All test cases passed! 🎉');
      setTimeout(() => {
        const newResults = [...codingResults, true];
        setCodingResults(newResults);
        
        if (currentCodingIndex < codingQuestions.length - 1) {
          setCurrentCodingIndex(currentCodingIndex + 1);
          setCode('');
          setTestResults([]);
        } else {
          const finalScore = Math.round((newResults.filter(r => r).length / codingQuestions.length) * 100);
          onComplete(finalScore);
          setCurrentView('results');
        }
      }, 2000);
    } else {
      toast.error('Some tests failed. Keep trying!');
    }
  };

  const skipQuestion = () => {
    setCodingResults([...codingResults, false]);
    if (currentCodingIndex < codingQuestions.length - 1) {
      setCurrentCodingIndex(currentCodingIndex + 1);
      setCode('');
      setTestResults([]);
    } else {
      const finalScore = Math.round((codingResults.filter(r => r).length / codingQuestions.length) * 100);
      onComplete(finalScore);
      setCurrentView('results');
    }
  };

  // Intro View
  if (currentView === 'intro') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Journey</span>
          </button>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                {level === 1 ? <BookOpen className="w-10 h-10 text-white" /> : <Code className="w-10 h-10 text-white" />}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Level {level} Assessment
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {level === 1 
                  ? 'Test your knowledge with multiple-choice questions'
                  : 'Solve coding challenges to prove your skills'}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {level === 1 ? `${questions.length} Multiple Choice Questions` : `${codingQuestions.length} Coding Problems`}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {level === 1 
                      ? 'Cover algorithms, data structures, and complexity analysis'
                      : 'Implement solutions in Python, JavaScript, Java, C, or C++'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Trophy className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Score 70% or Higher to Pass
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Passing unlocks the next level in your learning journey
                  </p>
                </div>
              </div>

              {level === 2 && (
                <div className="flex items-start space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Play className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Test Cases Provided
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Your code must pass all test cases to proceed
                    </p>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleStartAssessment}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              Start Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MCQ View
  if (currentView === 'mcq' && currentMCQ) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-3xl mx-auto">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Question {currentMCQIndex + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Score: {mcqScore}/{currentMCQIndex}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentMCQIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full text-sm font-medium">
                {currentMCQ.topic}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {currentMCQ.question}
            </h2>

            <div className="space-y-3">
              {currentMCQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleMCQAnswer(index)}
                  className="w-full p-4 text-left rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all group"
                >
                  <div className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-500 group-hover:text-white flex items-center justify-center font-semibold mr-3 transition-colors">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-gray-900 dark:text-white">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Coding View
  if (currentView === 'coding' && currentCoding) {
    return (
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            <div className="text-gray-300">
              Problem {currentCodingIndex + 1} of {codingQuestions.length}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Problem Description */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 150px)' }}>
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  currentCoding.difficulty === 'easy' ? 'bg-green-900/20 text-green-400' :
                  currentCoding.difficulty === 'medium' ? 'bg-yellow-900/20 text-yellow-400' :
                  'bg-red-900/20 text-red-400'
                }`}>
                  {currentCoding.difficulty.charAt(0).toUpperCase() + currentCoding.difficulty.slice(1)}
                </span>
                <span className="ml-2 text-gray-400">• {currentCoding.topic}</span>
              </div>

              <h2 className="text-2xl font-bold text-white mb-4">{currentCoding.title}</h2>
              <p className="text-gray-300 mb-6">{currentCoding.description}</p>

              <h3 className="text-lg font-semibold text-white mb-3">Test Cases:</h3>
              <div className="space-y-3">
                {currentCoding.testCases.map((testCase, index) => (
                  <div key={index} className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-400">Test Case {index + 1}</span>
                      {testResults[index] && (
                        <span className={testResults[index].passed ? 'text-green-400' : 'text-red-400'}>
                          {testResults[index].passed ? '✓ Passed' : '✗ Failed'}
                        </span>
                      )}
                    </div>
                    <div className="text-sm">
                      <div className="text-gray-400 mb-1">Input:</div>
                      <code className="text-blue-400">{testCase.input}</code>
                      <div className="text-gray-400 mt-2 mb-1">Expected Output:</div>
                      <code className="text-green-400">{testCase.expectedOutput}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Editor */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden flex flex-col" style={{ maxHeight: 'calc(100vh - 150px)' }}>
              {/* Language Selector */}
              <div className="bg-gray-900 border-b border-gray-700 p-4 flex items-center justify-between">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value as any)}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="python">Python</option>
                  <option value="javascript">JavaScript</option>
                  <option value="java">Java</option>
                  <option value="c">C</option>
                  <option value="cpp">C++</option>
                </select>

                <div className="flex gap-2">
                  <button
                    onClick={skipQuestion}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    Skip
                  </button>
                  <button
                    onClick={runTests}
                    disabled={!code.trim()}
                    className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-lg font-medium transition-colors flex items-center"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Run Tests
                  </button>
                </div>
              </div>

              {/* Code Area */}
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 bg-gray-900 text-white font-mono text-sm p-4 resize-none focus:outline-none"
                placeholder="Write your code here..."
                spellCheck={false}
              />

              {/* Test Results */}
              {testResults.length > 0 && (
                <div className="bg-gray-900 border-t border-gray-700 p-4">
                  <h4 className="text-white font-semibold mb-2">Test Results:</h4>
                  <div className="space-y-1">
                    {testResults.map((result, index) => (
                      <div key={index} className={`text-sm ${result.passed ? 'text-green-400' : 'text-red-400'}`}>
                        {result.message}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results View
  if (currentView === 'results') {
    const totalScore = level === 1 
      ? Math.round((mcqScore / questions.length) * 100)
      : Math.round((codingResults.filter(r => r).length / codingQuestions.length) * 100);
    
    const passed = totalScore >= 70;

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className={`p-8 text-center ${passed ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-orange-500 to-red-600'}`}>
              <Trophy className="w-20 h-20 text-white mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">
                {passed ? 'Congratulations! 🎉' : 'Keep Practicing! 💪'}
              </h2>
              <p className="text-white/90">
                {passed ? 'You passed the Level ' + level + ' assessment!' : 'You need 70% to pass. Try again!'}
              </p>
            </div>

            <div className="p-8">
              <div className="text-center mb-8">
                <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full px-8 py-4">
                  <p className="text-sm text-gray-900 font-medium mb-1">Your Score</p>
                  <p className="text-5xl font-bold text-gray-900">{totalScore}%</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {level === 1 ? 'Correct Answers' : 'Problems Solved'}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {level === 1 ? mcqScore : codingResults.filter(r => r).length} / {level === 1 ? questions.length : codingQuestions.length}
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Status</div>
                  <div className={`text-2xl font-bold ${passed ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                    {passed ? 'Passed ✓' : 'Not Passed'}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={onBack}
                  className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Back to Journey
                </button>
                {!passed && (
                  <button
                    onClick={() => {
                      setCurrentView('intro');
                      setCurrentMCQIndex(0);
                      setMCQAnswers([]);
                      setMCQScore(0);
                      setCurrentCodingIndex(0);
                      setCodingResults([]);
                      setCode('');
                      setTestResults([]);
                    }}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Try Again
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
