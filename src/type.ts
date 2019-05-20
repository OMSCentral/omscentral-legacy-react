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
