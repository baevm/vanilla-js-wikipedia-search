import { getSearchResults, getSearchTerm } from "./dataFunctions.js"
import { clearPushListener, clearSearchText, setSearchFocus, showClearTextButton } from "./searchBar.js"
import { buildSearchResults, clearStatsLine, deleteSearchResults, setStatsLine } from "./searchResults.js"

document.addEventListener("readystatechange", (e) => {
    if(e.target.readyState === "complete"){
        init()
    }
})

const init = () => {
    setSearchFocus()

    const search = document.getElementById("search")
    search.addEventListener('input', showClearTextButton)

    const clear = document.getElementById("clear")
    clear.addEventListener("click", clearSearchText)
    clear.addEventListener("keydown", clearPushListener)
    
    const form = document.getElementById("searchBar")
    form.addEventListener("submit", submitSearch)
}

const submitSearch = (e) => {
    e.preventDefault()

    deleteSearchResults()
    processSearch()
    setSearchFocus()
}

const processSearch = async () => {
    clearStatsLine()

    const searchTerm = getSearchTerm()

    if(searchTerm === "") return

    const resultArr = await getSearchResults(searchTerm)

    if(resultArr.length) {
        buildSearchResults(resultArr)
    }

    setStatsLine(resultArr.length)
}

