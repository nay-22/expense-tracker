const generateKRandomColors = (k ,dark=false) => {
    // Math.random() * 150 => generates darker colors (0 <= r,g,b <= 100)
    // Math.random() * 100 + 155 => generates lighter colors ((155 <= r,g,b <= 255))
    let colors = [];
    for (let i = 0; i < k; i++) {
        const red = Math.floor(dark  ? Math.random() * 150 : Math.random() * 100 + 155)
        const green = Math.floor(dark  ? Math.random() * 150 : Math.random() * 100 + 155)
        const blue = Math.floor(dark  ? Math.random() * 150 : Math.random() * 100 + 155)
        colors.push(`rgb(${red}, ${green}, ${blue})`)
    }
    return colors;
}

export default generateKRandomColors;