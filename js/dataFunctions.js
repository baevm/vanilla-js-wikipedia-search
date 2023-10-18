export const getSearchTerm = () => {
    const rawSearchTerm = document.getElementById("search").value.trim()

    const spacesRegex = /[ ]{2,}/gi
    const searchTerm = rawSearchTerm.replaceAll(spacesRegex, " ")
    return searchTerm
}

export const getSearchResults = async (searchTerm) => {
    const wikiSearchString = getWikiSearchString(searchTerm)
    const res = await requestData(wikiSearchString)
    
    let resArr = []

    if("query" in res){
        resArr = processWikiResults(res.query.pages)
    }   

    return resArr
}

const getWikiSearchString = (searchTerm) => {
    const maxChars = getMaxChars()
    const rawSearchString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;
    const searchString = encodeURI(rawSearchString)

    return searchString
}

const getMaxChars = () => {
    const width = window.innerWidth || document.body.clientWidth
    let maxChars

    if(width < 414) maxChars = 64
    if(width >= 414 && width < 1400) maxChars = 100
    if(width >= 1400) maxChars = 130

    return maxChars
}

const requestData = async (url) => {
    try {
        const res = await fetch(url)
        const data = await res.json()

        return data
    } catch (error) {
        console.error(error)
    }
}

const processWikiResults = (res) => {
    const resArr = []
    Object.keys(res).forEach((key) => {
        const id = key
        const title = res[key].title
        const text = res[key].extract
        const img = "thumbnail" in res[key] ? res[key].thumbnail.source : null

        resArr.push({
            id,
            title,
            text,
            img
        })
    })

    return resArr
}