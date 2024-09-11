"use client"

import { useState, useEffect } from "react";

import MainLeftBar from "./MainLeftBar";
import BottomBar from "./BottomBar";
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';

import {
  ChildrenVisibility, 
  Colors,
  CourseTree,
  RawData,
  GroupToColorInformation,
  CommonalityLegendInformation
} from "./interfaces";

import { determineStyle, createColorLabels } from "./utils";


export default function MainPage() {
  const [treeData, setTreeData] = useState<RawData | undefined>(undefined);
  
  // Variables associated with the left bar
  const [showCompleted, setShowCompleted] = useState(false)
  const [toggleCommonality, setToggleCommonality] = useState(false)
  const [leftBarIsOpen, setLeftBarIsOpen] = useState(false)
  const [legendInformation, setLegendInformation] = useState<CommonalityLegendInformation>()
  const [commonNodeColors, setCommonNodeColors] = useState<Colors>()
  
  // Variable controlling the visibility of the children of the nodes
  const [showChildren, setShowChildren] = useState<ChildrenVisibility>(() => {
    const initialState: ChildrenVisibility = {};
    for (let i = 1; i <= 1000; i++) {
      initialState[`node-${i}`] = false;
    }
    return initialState;
  })
  let nodeCountRef = 0


  useEffect(() => {
    nodeCountRef = 0;
  }, [])


  useEffect(() => {
    if (treeData) {
      settingColors(treeData)
    }
    console.log("Tree Data: ", treeData)
  }, [treeData])

  
  const getNextNodeId = (): string => {
    nodeCountRef += 1
    return `node-${nodeCountRef}`
  }

  const toggleNodeExpansion = (id: string) => {
    setShowChildren(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  /**
   * This function sets the Commonality Legend information for the left bar, and sets the commonality colors for the tree nodes. 
   * @param data - The raw data from the Flask API Call
   */
  function settingColors(data: RawData): void {
    const commonality_list = data.commonality.commonality_list
    const {course_to_color, group_to_color} = createColorLabels(commonality_list)
    
    // Set colors for tree nodes state
    setCommonNodeColors(course_to_color)

    // Hands group to colors to the left bar
    setLegendInformation(group_to_color)
  }
  

  /**
   * This function converts the raw data from the Flask API Call to a JSX element for a course tree(s)
   * @param data - The raw data from the Flask API Call
   * @returns A JSX element for a course tree(s)
   */
  function convertDataToJSX(data: RawData): JSX.Element {
    const arr = data.course_trees
    let list_of_elements = []
    
    // to separate out the first node from the rest of the nodes
    if (arr && arr.length > 0 ) {
      for (let i = 0; i < arr.length; i++) {
        const { label, code, children } = arr[i]

        // No Children Nodes
        if (!Array.isArray(children)) {
          const StyledNode = styled.div`
            padding: 5px;
            border-radius: 5px;
            display: inline-block;
            ${showCompleted ? "border: 3px solid #FFDC83;" : "border: 3px solid green;"}
            cursor: pointer;
          `;

          list_of_elements.push(<Tree
                                  lineWidth={'2px'}
                                  lineColor={'black'}
                                  lineBorderRadius={'10px'}
                                  label={
                                      <StyledNode
                                          className={`${commonNodeColors && toggleCommonality ? commonNodeColors[code] : ""}`}
                                      >{code}</StyledNode>
                                    }
                                >
                <TreeNode
                  label={<div>No Prerequisites</div>}
                />
              </Tree>)
        } 
        // Has Children Nodes
        else {
          const first_children = children[0]
          const {StyledNode, JunctionNode} = determineStyle(arr[i], showCompleted)

          const Element = label === "Course" ? StyledNode : JunctionNode
          // Find list of containment and render the list
          let node_contains: string[] = []
          if (data.commonality.containment_dict) {
            
            const containmentList = data.commonality.containment_dict[code]
            if (containmentList) {
              node_contains = containmentList
            }
          }

          list_of_elements.push(
          <Tree
            lineWidth={'2px'}
            lineColor={'black'}
            lineBorderRadius={'10px'}
            label={
              <Element
                className={`${commonNodeColors && toggleCommonality ? commonNodeColors[code] : ""}`}
              >
                {code} {node_contains.length > 0 ? `contains ${node_contains}`: ""}
              </Element>
            }
          >
            {processNode(first_children)}
          </Tree>)
        }
      }
      return (<div className="flex flex-col gap-10">
        {list_of_elements.map((element, index) => {
          return (index < list_of_elements.length-1 && list_of_elements.length > 1) ? <div>
            {element}
            <br></br>
            <hr></hr>
          </div> : <div>{element}</div>
        })}
      </div>)
      
    } else {
      return <div></div>
    }


    function processNode(node: CourseTree): JSX.Element {
      const {StyledNode, JunctionNode} = determineStyle(node, showCompleted)
      
      // Temp Var
      let label: any

      // Track expanded state of nodes
      const nodeId = getNextNodeId()
      let isExpanded = showChildren[nodeId] ?? false;

      if (node.label == "Course") {
        const code = node.code
        const hasChildren = Array.isArray(node.children)
        label = <StyledNode className={`${commonNodeColors && toggleCommonality ? commonNodeColors[code] : ""}`}  id={nodeId} onClick={() => toggleNodeExpansion(nodeId)}>
            {code} {hasChildren ? (isExpanded ? "🔽":"▶️") : ""}
          </StyledNode>
      }
      else {
        const hasChildren = Array.isArray(node.children)
        label = <JunctionNode id={nodeId} onClick={() => toggleNodeExpansion(nodeId)} style={{padding: "3px"}}>
            {node.label} {hasChildren ? (isExpanded ? "🔽":"▶️") : ""}
        </JunctionNode>
      }

      // Add children and recurse
      let children = []
      if (Array.isArray(node.children)) { // Check if children is an array
        for (const child of node.children) {
          children.push(processNode(child))
        }
      }

      return (isExpanded ? <TreeNode label={label}>
        {children}
      </TreeNode> : <TreeNode label={label} />)
    }
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-">
      <MainLeftBar 
        groupToColor={legendInformation} setTreeData={setTreeData} setLeftBarIsOpen={setLeftBarIsOpen} showCompleted={showCompleted} setShowCompleted={setShowCompleted}
        toggleCommonality={toggleCommonality} setToggleCommonality={setToggleCommonality}
      />
      
      {/* Make this component align from the right of the screen */}
      <div className="w-full flex flex-grow flex-col items-end ">
          <div className={`flex flex-col flex-grow h-full pb-12 ${leftBarIsOpen ? "w-[calc(100%-300px)]" : "w-full"}`}>
              <div className="z-10 pt-5">
                  {treeData && convertDataToJSX(treeData)}
              </div>
            <BottomBar isLeftBarOpen={leftBarIsOpen} />
            <div className="absolute bottom-6 right-2 text-xs text-gray-700">
              ¹Data from <a href="https://artsci.calendar.utoronto.ca/section/Computer-Science" target="_blank">University of Toronto</a>
            </div>
            <div className="absolute bottom-2 right-2 text-xs text-gray-700">
              ²Made by <a href="" target="_blank">jerry</a>
            </div>
          </div>
      </div>
    </main>
  );
}