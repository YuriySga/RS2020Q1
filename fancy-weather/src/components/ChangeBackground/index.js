import React from 'react'

export default function ChangeBackground() {

    const getImgLink = function ()  { 
        const country = localStorage.fancyWeaterCountry
        const season = getSeason();
        const keyUnsplash = 'ps01HPrdVfcJiF2_0zWrptAYbUqNVI5ATj-8Qo7ZveI'
        const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=${country}+${season}}&client_id=${keyUnsplash}`
        return fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Ошибка!')   
                return response;
                }
            )
            .then(response => response.json())
            .then(data => {                        
                return data.urls.regular
            })                
    }

    const getSeason = () => {
        const month = new Date().getMonth()
        if (month === 11 || month <= 1) return "winter"
        if (month >= 2 || month <= 4) return "spring"
        if (month >= 5 || month <= 7) return "summer"
        return "fall"       
    }

    const changeBacgrImg = (link) => {
        document.body.style.background=`linear-gradient(rgba(8, 15, 26, 0.59) 0%, rgba(17, 17, 46, 0.46) 100%) center center / cover fixed, url(${link}) center center / cover no-repeat fixed`
    }

    getImgLink()
            .then(link => changeBacgrImg(link))
            .catch(err => {}); 
}



