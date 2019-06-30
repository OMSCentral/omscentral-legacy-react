// using this for ambient type definitions

export type Course = {
  average: {
    difficulty: number
    rating: number
    workload: number
  }
  department: string
  foundational: boolean
  id: string
  name: string
  number: string
  reviews: { [key: string]: string }
}

export type Review = {
  author: string
  course: string
  created: number
  difficulty: string
  extraCredit: string
  firstCourse: string
  frontLoad: string
  groupProjects: number
  moneySpent: string
  previousClasses: number
  proctortrack: string
  program: string
  projects: number
  rating: string
  semester: string
  tests: number
  text: string
  updated: number
  workload: number
}
