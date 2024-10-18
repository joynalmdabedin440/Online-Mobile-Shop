const loadData = async (searchText) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)

  const jsonData = await res.json()
  const data = jsonData.data
  displayData(data);




}



const displayData = (data) => {
  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.innerHTML = '';
  const loadMore =  document.getElementById('load-more-btn')
  
  if (data.length>20) {
    loadMore.classList.remove('hidden')
  }
  else {
    loadMore.classList.add('hidden')
  }

  
  data =  data.slice(0, 20);

  data.forEach(phone => {
    console.log(phone);

    const phoneDiv = document.createElement('div');
    phoneDiv.classList = `card bg-base-100  shadow-xl`

    phoneDiv.innerHTML = `
        <figure>
                          <img
                            src="${phone.image}"
                            alt="Shoes" />
                        </figure>
                        <div class="card-body">
                          <h2 class="card-title">${phone.phone_name}</h2>
                          <p>${phone.slug}</p>
                          <div class="card-actions justify-center mt-3">
                            <button class="btn btn-primary">Details</button>
                          </div>
                        </div>
        
        
        `
    phoneContainer.appendChild(phoneDiv);
  });
  dataLoader(false)


}



const searchBtn = () => {
  dataLoader(true)
  const searchInput = document.getElementById('input-text');

  const searchValue = searchInput.value.toLowerCase();

  loadData(searchValue)

  searchInput.value = ""

}
const loader = document.getElementById("loader")
const dataLoader = (isLoading) => {
  if (isLoading) {
    loader.classList.remove('hidden')
  }
  else { 
    loader.classList.add('hidden')
  }
}

const loadMoreBtn = (data) => {
  
  
}

