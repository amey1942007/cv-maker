import type { CVDocument } from '../types/cv'
import { generateId } from '../types/cv'

export function createDefaultCV(): CVDocument {
  return {
    name: 'YOUR FULL NAME',
    socials: [
      { id: generateId(), type: 'email', value: 'your.email@example.com' },
      { id: generateId(), type: 'linkedin', value: 'linkedin.com/in/yourprofile' },
      { id: generateId(), type: 'github', value: 'github.com/yourusername' },
      { id: generateId(), type: 'website', value: 'yourwebsite.com' },
    ],
    pages: [
      {
        id: generateId(),
        disclaimer: 'Disclaimer: All the information on this page is entered by student.',
        blocks: [
          {
            id: generateId(),
            type: 'education-table',
            title: 'ACADEMIC DETAILS',
            rows: [
              {
                id: generateId(),
                year: '---',
                degreeBoard: 'B.Tech in Mathematics & Computing',
                institute: 'Indian Institute of Technology Delhi',
                gpaOrMarks: '9.06',
              },
              {
                id: generateId(),
                year: '2025',
                degreeBoard: 'CBSE',
                institute: 'Godavari English Medium School\nJalgaon',
                gpaOrMarks: '95',
              },
              {
                id: generateId(),
                year: '2023',
                degreeBoard: 'CBSE',
                institute: 'Godavari English Medium School\nJalgaon',
                gpaOrMarks: '98.8',
              },
            ],
          },
          {
            id: generateId(),
            type: 'section',
            title: 'SCHOLASTIC ACHIEVEMENTS',
            bulletStyle: 'dash',
            points: ['Add your scholastic achievements here.'],
          },
          {
            id: generateId(),
            type: 'section',
            title: 'INTERNSHIPS',
            bulletStyle: 'dash',
            points: ['Add internship title and details here.'],
          },
          {
            id: generateId(),
            type: 'project',
            title: 'Project Title',
            subtitle: '(Professor Name)',
            dateRange: '(Jan, 2026 - Present)',
            points: ['Add project description bullet points here.'],
            dividerAfter: true,
          },
          {
            id: generateId(),
            type: 'section',
            title: 'TECHNICAL SKILLS',
            bulletStyle: 'dash',
            points: ['Programming Skills: Python, JavaScript, ...'],
          },
        ],
      },
      {
        id: generateId(),
        disclaimer: 'Disclaimer: All the data on this page is coming from IIT system.',
        blocks: [
          {
            id: generateId(),
            type: 'iit-course-table',
            title: 'IIT COURSE',
            rows: [
              {
                id: generateId(),
                degree: 'B.Tech in Mathematics & Computing',
                institute: 'Indian Institute of Technology Delhi',
                cgpa: '9.06',
                deptRank: '12',
              },
            ],
          },
          {
            id: generateId(),
            type: 'section',
            title: 'COURSES DONE',
            bulletStyle: 'dash',
            points: ['Add courses here.'],
          },
          {
            id: generateId(),
            type: 'section',
            title: 'POSITIONS OF RESPONSIBILITY',
            bulletStyle: 'dash',
            points: ['Add positions of responsibility here.'],
          },
        ],
      },
    ],
  }
}
