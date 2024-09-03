"use client"
import { useState, useEffect } from 'react';
import { Select } from '@chakra-ui/react';
import {
  ai_focus_reqs,
  comp_ling_focus_reqs,
  comp_sys_focus_reqs,
  comp_vis_focus_reqs,
  game_design_focus_reqs,
  hci_focus_reqs,
  sci_comp_focus_reqs,
  toc_focus_reqs,
  web_tech_focus_reqs,
  FocusReqs
} from '../files/focus_reqs';


const BottomBar = ({isLeftBarOpen}: {isLeftBarOpen: boolean}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFocus, setSelectedFocus] = useState<string>("")
  const [focusContent, setFocusContent] = useState<FocusReqs | null>(null)

  useEffect(() => {
    if (selectedFocus === "web_tech_focus_reqs") {
      setFocusContent(web_tech_focus_reqs)
    } else if (selectedFocus === "ai_focus_reqs") {
      setFocusContent(ai_focus_reqs)
    } else if (selectedFocus === "comp_ling_focus_reqs") {
      setFocusContent(comp_ling_focus_reqs)
    } else if (selectedFocus === "comp_sys_focus_reqs") {
      setFocusContent(comp_sys_focus_reqs)
    } else if (selectedFocus === "comp_vis_focus_reqs") {
      setFocusContent(comp_vis_focus_reqs)
    } else if (selectedFocus === "game_design_focus_reqs") {
      setFocusContent(game_design_focus_reqs)
    } else if (selectedFocus === "hci_focus_reqs") {
      setFocusContent(hci_focus_reqs)
    } else if (selectedFocus === "sci_comp_focus_reqs") {
      setFocusContent(sci_comp_focus_reqs)
    } else if (selectedFocus === "toc_focus_reqs") {
      setFocusContent(toc_focus_reqs)
    } else if (selectedFocus === "web_tech_focus_reqs") {
      setFocusContent(web_tech_focus_reqs)
    } 
  }, [selectedFocus])

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
          <Select value={selectedFocus} onChange={(e) => setSelectedFocus(e.target.value)} size="sm" placeholder='Select CS Focus'>
            <option value='web_tech_focus_reqs'>Focus in Web and Internet Technologies (Major)</option>
            <option value='ai_focus_reqs'>Focus in Artificial Intelligence (Major)</option>
            <option value='comp_ling_focus_reqs'>Focus in Computational Linguistics and Natural Language Processing (Major)</option>
            <option value='comp_sys_focus_reqs'>Focus in Computer Systems (Major)</option>
            <option value='comp_vis_focus_reqs'>Focus in Computer Vision (Major)</option>
            <option value='game_design_focus_reqs'>Focus in Game Design (Major)</option>
            <option value='hci_focus_reqs'>Focus in Human-Computer Interaction (Major)</option>
            <option value='sci_comp_focus_reqs'>Focus in Scientific Computing (Major)</option>
            <option value='toc_focus_reqs'>Focus in Theory of Computation (Major)</option>
          </Select>
          
            <div className='flex flex-col pt-5 gap-4'>
         
                <details>
                    <summary >Description</summary>
                    <br></br>
                    {focusContent?.description.map((item, index) => (
                      <div key={index}>{item}
                      <br></br>
                      <br></br>
                      </div>
                    ))}
                </details>

                <details>
                    <summary>Enrolment Requirements</summary>
                    <br></br>
                    Enrolment in the Computer Science Major Program (ASMAJ1689).
                </details>

                <details>
                    <summary>Completion Requirements</summary>
                    <br></br>
                    {focusContent?.completion_req[0] && (
                      <div>{typeof focusContent.completion_req[0] === 'string' ? focusContent.completion_req[0] : null}</div>
                    )}
                    <br></br>

                    <ol className="list-decimal list-inside space-y-2">
                        {focusContent?.completion_req.slice(1).map((item, index) => (
                            typeof item === 'string' ? (
                                <li key={index}>{item}</li>
                            ) : (
                                <li key={index}>
                                    {Object.keys(item)[0]}
                                    <ul className="list-disc list-inside ml-4 space-y-1">
                                        {item[Object.keys(item)[0]].map((subItem, subIndex) => (
                                            <li key={subIndex}>{subItem}</li>
                                        ))}
                                    </ul>
                                </li>
                            )
                        ))}
                    </ol>

                    <br></br>
                    {focusContent?.notes && focusContent.notes.length > 0 && (
                      <div>{focusContent.notes[0]}</div>
                    )}
                    <br></br>
                    {focusContent?.notes && focusContent.notes.length > 1 && (
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        {focusContent.notes.slice(1).map((note, index) => (
                          <li key={index}>{note}</li>
                        ))}
                      </ul>
                    )}
                </details>
            </div>
        </div>
      )}
    </div>
  );
};

export default BottomBar;