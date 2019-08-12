// export class ReviewFilter {
//   programs: object
//   semesters: object
//   difficulties: object
//   ratings: object
// }

// https://github.com/martzcodes/OMSCentral/blob/c5c4d3f27f5d0a1167bcd4da14fbd36255a70e71/src/app/models/review.ts
export type Review = {
  id?: string
  author?: string
  course?: string
  // created?: Date
  created?: number
  // updated?: Date
  updated?: number
  difficulty?: number
  rating?: number
  semester?: string
  text?: string
  workload?: number
  // program?: string
  program?: number
  proctortrack?: string
  firstCourse?: string
  previousClasses?: number
  projects?: number
  groupProjects?: number
  tests?: number
  extraCredit?: string
  moneySpent?: number
  frontLoad?: string
  proctorTrack?: string
  _editReview?: boolean
  _backup?: Review
  [id: string]: string | boolean | number | Review | undefined
}
