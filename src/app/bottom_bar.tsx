"use client"
import { useState } from 'react';
import { Select } from '@chakra-ui/react'

const BottomBar = ({isLeftBarOpen}: {isLeftBarOpen: boolean}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`z-30 shadow-lg fixed rounded-t-md bottom-0 w-[445px] transition-all ease-in-out duration-400 ${isLeftBarOpen ? 'left-[420px]' : 'left-[20px]'} right-0 bg-white transition-all duration-300 ${isExpanded ? 'h-[689px]' : 'h-12'}`}>
      <button 
        className="w-full h-12 flex items-center justify-between px-6"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>Focus Requirements</span>
        <span>{isExpanded ? '⬇️' : '⬆️'}</span>
      </button>
      {isExpanded && (
        <div className="p-4 h-[calc(100%-3rem)] overflow-y-auto">
          <Select size="sm" placeholder='Select CS Focus'>
            <option value='option1'>Option 1</option>
            <option value='option2'>Option 2</option>
            <option value='option3'>Option 3</option>
          </Select>
          
            <div className='flex flex-col pt-5 gap-4'>
         
                <details>
                    <summary >Description</summary>
                    <br></br>
                    Why is it easy to sort a list of numbers, but hard to break Internet encryption schemes? Is finding a solution to a problem harder than checking that a solution is correct? Can we find good approximate solutions, even when the exact solutions seem out of reach? Theory of Computation studies the inherent complexity of fundamental algorithmic problems. On one hand, we develop ground-breaking efficient data structures and algorithms. On the other, we have yet to develop good algorithms for many problems despite decades of effort, and for these problems we strive to prove no time- or space-efficient algorithms will ever solve them. While the field has seen some successful impossibility results, there are still many problems (such as those underlying modern cryptography and security) for which we do not know either efficient algorithms or strong lower bounds!
                    <br></br>
                    <br></br>
                    This focus takes a rigorous, mathematical approach to computational problem-solving: students will gain a deep understanding of algorithm paradigms and measures of problem complexity, and develop the skills necessary to convey abstract ideas with precision and clarity. Many of our students go on to graduate studies and sophisticated algorithmic work in industry. This focus has natural ties with many branches of mathematics and is the foundation of many computer science fields. Consequently, our students often apply their theoretical knowledge to other fields of interest.
                    <br></br>
                    <br></br>
                    We advise you to take CSC240H1 and CSC265H1, the enriched versions of CSC236H1 and CSC263H1, because these courses are particularly well-aligned with the goals of this focus and will best prepare you for advanced theory courses. However, students who have already taken CSC236H1/ CSC236H5/ CSCB36H3 or CSC263H1/ CSC263H5/ CSCB63H3 are also welcome to enrol in the focus.
                </details>

                <details>
                    <summary>Enrolment Requirements</summary>
                    <br></br>
                    Enrolment in the Computer Science Major Program (ASMAJ1689).
                </details>

                <details>
                    <summary>Completion Requirements</summary>
                    <br></br>
                    (3.5 credits)
                    <br></br>
                    <br></br>
                    <ol className="list-decimal list-inside space-y-2">
                        <li>CSC373H1, CSC463H1</li>
                        <li>2.5 credits from the following:

                            <ul className="list-disc list-inside text-sm space-y-2">
                                <li>
                                    CSC304H1, CSC310H1, CSC336H1, CSC436H1, CSC438H1/​ MAT309H1, CSC448H1, CSC473H1, MAT332H1, MAT344H1
                                </li>  
                                <li>
                                    at UTM: MAT302H5
                                </li> 
                                <li>
                                    graduate courses: CSC2221H, CSC2240H, CSC2401H, CSC2410H, CSC2412H, CSC2420H, CSC2421H, CSC2426H, CSC2451H, CSC2556H (Note that students must contact cs.undergrad@utoronto.ca during the course enrolment period to request permission to take a graduate course.)
                                </li>
                            </ul>
                        </li>
                        
                    </ol>

                    <br></br>
                    Students who complete an independent study project ( CSC494H1/​ CSC495H1) under the supervision of a faculty member from the Theory group may request to substitute one of CSC494H1/​ CSC495H1 for one of the courses in list 2 above. This request must be made directly to the department's Undergraduate Office.
                    <br></br>
                    Students who complete a graduate Topics course in Theory may request to count it towards the completion of list 2 above. This request must be made directly to the department's Undergraduate Office.
                </details>
            </div>
        </div>
      )}
    </div>
  );
};

export default BottomBar;