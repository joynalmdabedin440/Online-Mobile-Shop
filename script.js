const loadData = async (searchText="samsung", isLoadMore) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)

  const jsonData = await res.json()
  const data = jsonData.data
  displayData(data, isLoadMore);




}



const displayData = (data, isLoadMore) => {
  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.innerHTML = '';
  const loadMore = document.getElementById('load-more-btn')
  if (data.length === 0) {
    alert("No phone found")
  }

  if (data.length > 10 && !isLoadMore) {

    loadMore.classList.remove('hidden')
  }
  else {
    loadMore.classList.add('hidden')
  }

  if (!isLoadMore) {
    data = data.slice(0, 10);

  }






  data.forEach(phone => {

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
                            <button  onclick="showMoreDetails('${phone.slug}'); phoneDetails.showModal();"
                            
                              class="btn btn-primary">Details</button>
                          </div>
                        </div>
        
        
        `
    phoneContainer.appendChild(phoneDiv);
  });
  dataLoader(false)


}



const searchBtn = (isLoadMore) => {
  dataLoader(true)
  const searchInput = document.getElementById('input-text');

  const searchValue = searchInput.value.toLowerCase();

  loadData(searchValue, isLoadMore)



}

// spinner
const loader = document.getElementById("loader")
const dataLoader = (isLoading) => {
  if (isLoading) {
    loader.classList.remove('hidden')
  }
  else {
    loader.classList.add('hidden')
  }
}

const showMoreDetails = async (id) => {

  const showDetailsContainer = document.getElementById('show-phone-details')

  const data = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const phoneData = await data.json()
  const phoneDetails = phoneData.data;

  
  const closeBtn = document.getElementById('close-btn')

  const div = document.createElement('div')



  div.innerHTML = `
       <div class="m-auto w-1/3 h-1/4 p-4 bg-slate-300 shadow-md rounded flex justify-center">
        <img src="${phoneDetails.image}" alt="">
    </div>
    <h1 class="text-xl font-bold">${phoneDetails.name}</h1>
   
    <p><span class="font-bold">Storage:</span>${phoneDetails.mainFeatures.storage}</p>
    <p><span class="font-bold">Display Size:</span>${phoneDetails.mainFeatures.displaySize}</p>
    <p><span class="font-bold">Chipset:</span>${phoneDetails.mainFeatures.chipSet}</p>
    <p><span class="font-bold">Memory:</span>${phoneDetails.mainFeatures.memory}</p>
    <p><span class="font-bold">Slug:</span>  ${phoneDetails.slug}</p>

    <p><span class="font-bold">Release date:</span>${phoneDetails.releaseDate}</p>
    <p><span class="font-bold">Brand:</span>${phoneDetails.brand}</p>
    <p><span class="font-bold">GPS:</span>${phoneDetails.others?.GPS || "This feature  is not available"}</p>

    
  
  `


  showDetailsContainer.insertBefore(div, closeBtn)


}



const loadMoreBtn = () => {
  searchBtn(true)


}

loadData()