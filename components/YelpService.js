import axios from 'axios'

const YELP_API_KEY = 'rXmCZRbHtMkmaM9K-oW3TARjkFYxoF2cRjo0-VasSSwAAmQnpcjyUGyQbDEYi58oTCTangx2zz0L6nsL-3PDiGmOyXnLwDGvA-u563OJNYAzle2XNGm9Fm2pJd-2XnYx'

const api = axios.create({
    baseURL: 'https://api.yelp.com/v3',
    headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
    },
})

const getCoffeeShops = userLocation => {
    return api
        .get('/businesses/search', {
            params: {
                limit: 10,
                categories: 'coffee,coffeeroasteries,coffeeshops',
                ...userLocation,
            },
        })
        .then(res =>
            res.data.businesses.map(business => {
                return {
                    name: business.name,
                    coords: business.coordinates,
                }
            })
        )
        .catch(error => console.error(error))
}

export default {
    getCoffeeShops,
}
