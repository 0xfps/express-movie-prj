export interface Films {
    id: number,
    name: string,
    title: string,
    desc: string,
    duration: number,
    price: number,
    available: number
}

export const users = []
export let idCounter: number = 0
export const IPs: string[] = []
export let totalCash: number = 0
export let totalFilms: number = 0
export const films: Films[] = []

export const incrementIdCounter = () => idCounter += 1
export const incrementTotalFilms = () => totalFilms += 1
export const incrementTotalCash = (cash: number) => totalCash += cash
export const decrementTotalFilms = (val: number) => totalFilms -= val
export const getFilms = () => films