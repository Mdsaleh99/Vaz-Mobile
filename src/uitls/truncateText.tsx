export const truncateText = (str: string) => {
    if(str.length < 25) return str
    
    return str.substring(0, 25) + '.....'
    // str.substring(0, 25) extracts the substring starting from index 0 up to index 25 (not including index 25).
    // '.....' is a string that will be appended to the extracted substring.
}