const up = (up) => {
    const h = Math.floor(up / 60)
    const m = Math.floor(up % 60)
    return `${h}h ${m < 10 ? "0" + m : m}m`
}

const cssVarGenerator = (name, value) => {
    return `@define-color ${name} ${value};\n`
}


export { up, cssVarGenerator }