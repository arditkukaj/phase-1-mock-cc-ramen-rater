document.addEventListener('DOMContentLoaded', () => {

    fetch('http://localhost:3000/ramens')
      .then(response => response.json())
      .then(ramens => {
        const ramenMenu = document.getElementById('ramen-menu');
        ramens.forEach(ramen => {
          const img = document.createElement('img');
          img.src = ramen.image;
          img.alt = ramen.name;
          img.addEventListener('click', () => displayRamenDetails(ramen));
          ramenMenu.appendChild(img);
        });
      })

    function displayRamenDetails(ramen) {
      const ramenDetail = document.getElementById('ramen-detail');
      const image = ramenDetail.querySelector('.detail-image');
      const name = ramenDetail.querySelector('.name');
      const restaurant = ramenDetail.querySelector('.restaurant');
      const rating = document.getElementById('rating-display');
      const comment = document.getElementById('comment-display');
  
      image.src = ramen.image;
      name.textContent = ramen.name;
      restaurant.textContent = ramen.restaurant;
      rating.textContent = ramen.rating;
      comment.textContent = ramen.comment;
    }

    const newRamenForm = document.getElementById('new-ramen');
    newRamenForm.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(newRamenForm);
  
      fetch('http://localhost:3000/ramens', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(newRamen => {
          const ramenMenu = document.getElementById('ramen-menu');
          const img = document.createElement('img');
          img.src = newRamen.image;
          img.alt = newRamen.name;
          img.addEventListener('click', () => displayRamenDetails(newRamen));
          ramenMenu.appendChild(img);
        })
    });
  

    fetch('http://localhost:3000/ramens/1')
      .then(response => response.json())
      .then(firstRamen => displayRamenDetails(firstRamen))
      .catch(error => console.error('Error fetching first ramen details:', error));
  

    const editRamenForm = document.getElementById('edit-ramen');
    editRamenForm.addEventListener('submit', event => {
      event.preventDefault();
      const rating = document.getElementById('new-rating').value;
      const comment = document.getElementById('new-comment').value;
  
      fetch('http://localhost:3000/ramens/:id', {
        method: 'PATCH',
        body: JSON.stringify({ rating, comment }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(updatedRamen => displayRamenDetails(updatedRamen))

        const deleteRamenButton = document.getElementById('delete-ramen');
        deleteRamenButton.addEventListener('click', () => {
          fetch(`http://localhost:3000/ramens/:id`, {
            method: 'DELETE',
          })
            .then(response => {
              if (response.ok) {
                const ramenDetail = document.getElementById('ramen-detail');
                ramenDetail.querySelector('.detail-image').src = '';
                ramenDetail.querySelector('.name').textContent = '';
                ramenDetail.querySelector('.restaurant').textContent = '';
                document.getElementById('rating-display').textContent = '';
                document.getElementById('comment-display').textContent = '';
              } 
            })
        });
      });
    });