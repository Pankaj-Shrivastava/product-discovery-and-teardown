/// <reference types="vite/client" />

declare module 'virtual:skills-data' {
  import { SkillData } from './types/skills'
  const skillsData: SkillData[]
  export default skillsData
  export { skillsData }
}
