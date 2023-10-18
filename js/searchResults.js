export const buildSearchResults = (resultArr) => {
    resultArr.forEach(res => {
        const item = createResultItem(res)
        const resultContent = document.createElement("div")
        resultContent.classList.add("resultContents")

        if(res.img) {
            const resultImage = createResultImage(res)
            resultContent.append(resultImage)
        }

        const resultText = createResultText(res)
        resultContent.append(resultText)

        item.append(resultContent)

        const searchResults = document.getElementById("searchResults")
        searchResults.append(item)
    })
}

const createResultItem = (res) => {
    const item = document.createElement("div")
    item.classList.add("resultItem")
    
    const title = document.createElement("div")
    title.classList.add("resultTitle")
    
    const link = document.createElement("a")
    link.href = `https://en.wikipedia.org/?curid=${res.id}`
    link.textContent = res.title
    link.target = "_blank"
    
    title.append(link)
    item.append(title)

    return item
}
const createResultImage = (res) => {
    const item = document.createElement("div")
    item.classList.add("resultImage")

    const img = document.createElement("img")
    img.src = res.img
    img.alt = res.title
    item.append(img)
    
    return item
}
const createResultText = (res) => {    
    const item = document.createElement("div")
    item.classList.add("resultText")

    const resultDescription = document.createElement("p")
    resultDescription.classList.add("resultDescription")

    resultDescription.textContent = res.text

    item.append(resultDescription)

    return item
}


export const clearStatsLine = () => {
    document.getElementById("stats").textContent = ""
}

export const setStatsLine = (numberOfResults) => {
    const statLine = document.getElementById("stats")

    if(numberOfResults) {
        statLine.textContent = `Displaying ${numberOfResults} results`
    } else {
        statLine.textContent = `No results found`
    }
}

export const deleteSearchResults = () => {
     const parentElement = document.getElementById("searchResults")
     let child = parentElement.lastElementChild

    while(child){
        parentElement.removeChild(child)
        child = parentElement.lastElementChild
    }
}