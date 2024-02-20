This project provides a JavaScript function to analyze and transform learner submission data to calculate their performance in a course based on weighted averages of assignment scores.

## Data Structure

The function expects the following data structures:

- **CourseInfo:** Information about the course.
  Javascript
  {
    "id": number,
    "name": string
  }

AssignementGroup:

{
  "id": number,
  "name": string,
  "course_id": number,
  "group_weight": number,
  "assignments": [AssignmentInfo]
}

AssignementInfo:
{
  "id": number,
  "name": string,
  "due_at": Date string,
  "points_possible": number
}

LearnerSubmissions:
{
  "learner_id": number,
  "assignment_id": number,
  "submission": {
    "submitted_at": Date string,
    "score": number
  }
}

Funtions:

The main function getLearnerData processes the data and outputs an array of objects, each containing the following information:

id: The ID of the learner.
avg: The learner's total weighted average score.
<assignment_id>: The percentage score for each assignment.
