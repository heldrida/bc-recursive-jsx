import sections from '../../../data/sections.json'
import states from '../../../data/states.json'
import questions_list_1 from '../../../data/44,45,46.json'
import questions_list_2 from '../../../data/4,5,6,7,8,11,12,15,16,17.json'


const getSections = () => sections
const getStates = () => states
const getQuestions = () => [...questions_list_1, ...questions_list_2]

export {
  getSections,
  getStates,
  getQuestions
}
