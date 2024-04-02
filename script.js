document.addEventListener("DOMContentLoaded", function () {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian')
        .then(response => response.json())
        .then(data => {
            const meals = data.meals;
            const mealListContainer = document.getElementById('mealList');

            if (meals) {
                meals.forEach(meal => {
                    const mealCard = `
                        <div class="col-md-4 mb-4">
                            <div class="card">
                                <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                                <div class="card-body">
                                    <h5 class="card-title">${meal.strMeal}</h5>
                                    <p class="card-text">Price: $${meal.price || '50% offer Due to Valentaines Week'}</p>
                                    <div class="form-group">
                                        <label for="feedback-${meal.idMeal}">Feedback:</label>
                                        <textarea class="form-control" id="feedback-${meal.idMeal}" rows="3"></textarea>
                                    </div>
                                    <button type="button" class="btn btn-primary submit-feedback" data-meal-id="${meal.idMeal}">Submit</button>
                                </div>
                            </div>
                        </div>
                    `;
                    mealListContainer.innerHTML += mealCard;
                });

                // Attach event listeners for feedback submission
                document.querySelectorAll('.submit-feedback').forEach(button => {
                    button.addEventListener('click', function () {
                        const mealId = this.getAttribute('data-meal-id');
                        const feedbackTextarea = document.getElementById(`feedback-${mealId}`);
                        const feedback = feedbackTextarea.value.trim();
                        // Here you can send feedback to your backend or perform any other action
                        console.log(`Feedback for meal ${mealId}: ${feedback}`);
                        // Clear the feedback textarea after submission
                        feedbackTextarea.value = '';
                    });
                });
            } else {
                mealListContainer.innerHTML = '<p>No meals found.</p>';
            }
        })
        .catch(error => console.error('Error fetching meals:', error));
});