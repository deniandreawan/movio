import { setYearFilter } from "@/redux/actions/filterActions"
import filtersReducer from "@/redux/reducers/filtersReducer"

describe("Filters reducer", () => {
  const state = {
    tv: {
      genre: "",
      sort: "",
      year: "",
      query: "",
    },
    discover: {
      genre: "",
      sort: "",
      year: "",
      query: "",
    },
  }

  it("Should set year filter state for TV", () => {
    expect(filtersReducer(state, setYearFilter("2021", "tv"))).toEqual({
      ...state,
      tv: { ...state.tv, year: "2021" },
    })
    expect(filtersReducer(state, setYearFilter("2021", "tv")).tv.year).toBe(
      "2021"
    )
  })
})
