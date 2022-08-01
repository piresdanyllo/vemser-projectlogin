import moment from "moment"

export const FormatDataToDatabase = (value) => {
    return moment(value, 'DD/MM/YYYY').format('YYYY-MM-DD')
}

export const FormatDataToRender = (value) => {
    return moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY')
}

export const FormatCpfToDatabase = (value) => {
    return value.replaceAll(".", "").replace("-", "")
}

export const FormatCpfToRender = (value) => {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3-\$4")
}

export const FormatCepToRender = (value) => {
    return value.replace(/(\d{5})(\d{3})/g, "\$1-\$2")
}

export const FormatCepToDatabase = (value) => {
    return value.replace("-", "")
}