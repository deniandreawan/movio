import { SET_YEAR_FILTER } from "@/constants/actionType"
import { setYearFilter } from "@/redux/actions/filterActions"

const expAction = {
  type: SET_YEAR_FILTER,
  payload: {
    year: "2021",
    target: "tv",
  },
}

describe("Action creators", () => {
  it("Should create year filter action", () => {
    expect(setYearFilter("2021", "tv")).toEqual(expAction)
  })
})
