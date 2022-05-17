const mealsEl = document.getElementById('meals')
const containerFavorite = document.getElementById('container-favorite')
const searchTerm = document.getElementById('search-term')
const searchBtn = document.getElementById('search')
const mealPopup = document.getElementById('popup')
const mealInfoEl = document.getElementById('meals-info')
const popupCloseBtn = document.getElementById('button-popup')

getRandomMeal()
fetchFavoriteMeals()

async function getRandomMeal() {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    const resData = await res.json()
    const randomMeal = resData.meals[0]

    addMeal(randomMeal, true)
}

async function getMealById(id) {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)

    const resData = await res.json()
    const meal = resData.meals[0]

    return meal
}

async function getMealsBySearch(term) {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + term)

    const resData = await res.json()
    const meals = resData.meals

    return meals
}

function addMeal(mealData, random = false) {
    const meal = document.createElement('div')

    meal.classList.add('meals__item')

    meal.innerHTML = `
        <div class="meals__header">
            ${random ? `
                <span class="meals__random">
                    Random recipe
                </span>
            ` : ''}
            <img id="image__meal" src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        </div>
        <div class="meals__body">
            <h4>${mealData.strMeal}</h4>
            <button class="meals__button"><i class="fa-solid fa-heart"></i></button>
        </div>
    `
    const btn = meal.querySelector('.meals__body .meals__button')
    btn.addEventListener('click', () => {
        if (btn.classList.contains('active')) {
            removeMealFromLS(mealData.idMeal)
            btn.classList.remove('active')
        } else {
            btn.classList.add('active')
            addMealToLS(mealData.idMeal)
            btn.classList.remove('active')
        }

        fetchFavoriteMeals()
    })

    meal.addEventListener('click', () => {
        showMealInfo(mealData)
    })
    
    mealsEl.appendChild(meal)
}

function addMealToLS(mealId) {
    const mealIds = getMealsFromLS()
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]))
}

function removeMealFromLS(mealId) {
    const mealIds = getMealsFromLS()
    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter(id => id !== mealId)))
}

function getMealsFromLS() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'))

    return mealIds === null ? [] : mealIds
}

async function fetchFavoriteMeals() {
    containerFavorite.innerHTML = '';
    const mealIds = getMealsFromLS()

    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i]
        
        let meal = await getMealById(mealId)
        addMealToFavorite(meal)
    }
}

function addMealToFavorite(mealData) {
    const favMeal = document.createElement('li')

    favMeal.innerHTML = `
        <img class="container__image" width="200" height="150" src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <span>${mealData.strMeal}</span>
        <button class="container__clear"><i class="fa-solid fa-xmark"></i></button>
    `
    const btn = favMeal.querySelector('.container__clear')

    btn.addEventListener('click', () => {
        removeMealFromLS(mealData.idMeal)
        fetchFavoriteMeals()
    })

    favMeal.addEventListener('click', () => {
        showMealInfo(mealData)
    })

    containerFavorite.appendChild(favMeal)
}

// need fixes (somewhen later)
//---------------------------------
// function showMealInfo(mealData) {
//     mealInfoEl.innerHTML = ''
//     const mealEl = document.createElement('div') 

//     const ingredients = []
    
//     for (let i = 1; i < 20; i++) {
//         if (mealData['strIngredient' + i]) {
//             ingredients.push(`${mealData['strIngredient' + i]} - ${mealData['strMeasure' + i]}`)
//         } else {
//             break
//         }
//     }

//     mealEl.innerHTML = `
//         <h3>${mealData.strMeal}</h3>
//         <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
//         <p>
//             ${mealData.strInstructions}
//         </p>
//         <h3>Ingredients</h3>
//         <ul>
//             ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
//         </ul>
//     `

//     mealInfoEl.appendChild(mealEl)

//     mealPopup.classList.remove('hidden')
// }

searchBtn.addEventListener('click', async () => {
    mealsEl.innerHTML = ''
    const search = searchTerm.value

    const meals = await getMealsBySearch(search)

    if (meals) {
        meals.forEach(meal => {
            addMeal(meal)
        })
    }
})

// popupCloseBtn.addEventListener('click', () => {
//     mealPopup.classList.add('hidden')
// })