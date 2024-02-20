function getLearnerData(course, ag, submissions) {
    try {
      // Check if the assignment group belongs to the course
      if (ag.course_id !== course.id) {
        throw new Error('Invalid input: Assignment group does not belong to the course');
      }
  
      // Process learner submissions
      const learnerScores = {}; // Store scores by learner_id and assignment_id
      submissions.forEach(submission => {
        const assignment = ag.assignments.find(a => a.id === submission.assignment_id);
        if (!assignment) {
          throw new Error(`Invalid input: No assignment found with id ${submission.assignment_id}`);
        }
  
        // Check if the submission is late
        const isLate = new Date(submission.submission.submitted_at) > new Date(assignment.due_at);
  
        // Calculate the score
        let score = submission.submission.score;
        if (isLate) {
          score -= assignment.points_possible * 0.1; // Deduct 10%
        }
  
        if (!learnerScores[submission.learner_id]) {
          learnerScores[submission.learner_id] = {};
        }
  
        learnerScores[submission.learner_id][assignment.id] = score / assignment.points_possible;
      });
  
      // Calculate weighted averages and format the result
      const result = Object.entries(learnerScores).map(([learnerId, scores]) => {
        const learnerResult = {
          id: parseInt(learnerId),
          avg: 0
        };
        let totalWeight = 0;
  
        Object.entries(scores).forEach(([assignmentId, score]) => {
          const assignment = ag.assignments.find(a => a.id === parseInt(assignmentId));
          if (!assignment) {
            throw new Error(`Invalid input: No assignment found with id ${assignmentId}`);
          }
  
          const weight = assignment.points_possible / ag.assignments.reduce((acc, a) => acc + a.points_possible, 0);
          learnerResult.avg += score * weight;
          totalWeight += weight;
          learnerResult[assignmentId] = score;
        });
  
        // Adjust the average based on the total weight (in case some assignments are not yet due)
        learnerResult.avg /= totalWeight;
  
        return learnerResult;
      });
  
      return result;
    } catch (error) {
      console.error(error.message);
      return []; // Return an empty array in case of an error
    }
  }
  
  
const CourseInfo= {
    id: 789,
    name: "Advanced JavaScript"
  };
  
  const AssignmentGroup = {
    id: 56789,
    name: "JavaScript Challenges",
    course_id: 789,
    group_weight: 40,
    assignments: [
      {
        id: 4,
        name: "Java Programming",
        due_at: "2023-03-15",
        points_possible: 100
      },
      {
        id: 5,
        name: "Java Manipulation",
        due_at: "2023-04-01",
        points_possible: 200
      },
      {
        id: 6,
        name: "JavaScript Quiz",
        due_at: "2023-04-15",
        points_possible: 300
      }
    ]
  };
  
  const LearnerSubmissions = [
    {
      learner_id: 201,
      assignment_id: 4,
      submission: {
        submitted_at: "2023-03-14",
        score: 95
      }
    },
    {
      learner_id: 201,
      assignment_id: 5,
      submission: {
        submitted_at: "2023-03-30",
        score: 180
      }
    },
    {
      learner_id: 201,
      assignment_id: 6,
      submission: {
        submitted_at: "2023-04-16",
        score: 270 // Late submission
      }
    },
    {
      learner_id: 202,
      assignment_id: 4,
      submission: {
        submitted_at: "2023-03-16",
        score: 80 // Late submission
      }
    },
    {
      learner_id: 202,
      assignment_id: 5,
      submission: {
        submitted_at: "2023-04-01",
        score: 190
      }
    }
  ];
  
  // Using the getLearnerData function with the try/catch method
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log(result);
  