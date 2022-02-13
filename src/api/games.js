import axiosInstance from './index'

export const gameRequests = {
    all: async (params) => {
        try {
            const currentParams = {...params}
            Object.keys(currentParams).forEach((key) => (!currentParams[key]) && delete currentParams[key]);
            return await axiosInstance.get('/games', {
                params: currentParams
            })
        } catch (e) {
            throw Error(e)
        }
    },
    get: async (slug) => {
        try {
            return await axiosInstance.get(`/games/${slug}`)
        } catch (e) {
            throw Error(e)
        }
    },
    screenshots: async (id) => {
        try {
            return await axiosInstance.get(`/games/${id}/screenshots`)
        } catch (e) {
            throw Error(e)
        }
    }
}