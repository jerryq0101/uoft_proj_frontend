// Main Page

// This is the json data that is returned from flask api.
export interface RawData {
    course_trees: CourseTree[],
    commonality: CommonalityData
}

export interface CourseTree {
    label: string;
    marked: boolean;
    ready_to_take: boolean;
    completed: boolean;
    code: string;
    full_name: string;
    children: CourseTree[] | null
}

export interface ContainmentDict {
    [key: string]: string[];
}

export interface CommonalityList {
    [key: string]: string[];
}

export interface CommonalityData {
    containment_dict: ContainmentDict,
    commonality_list: CommonalityList
}

export interface ChildrenVisibility {
    [key: string]: boolean
  }
  
export interface Colors {
    [key: string]: string
}

export interface GroupToColorInformation {
    color: string,
    array: string[],
    common_values: string[]
}

export interface ColorLabelsDict {
    course_to_color: Colors,
    group_to_color: { [key: string]: GroupToColorInformation }
}

export interface CommonalityLegendInformation {
    [key: string]: GroupToColorInformation
}

// LEFT BAR

export interface ApiInput {
    completed_courses: string[],
    desired_courses: string[],
}

export interface CourseSelected {
    name: string,
    color: string
}

