import './App.css'
import { useState } from 'react';
import Loading from './components/isLoading';


function App() {
  const [searchData, setSearchData] = useState([]);
  const [recipe, setRecipe] = useState({ query: " " });
  const [none, setNone] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  function handleInput(event) {
    setRecipe((prev) => {
      return { ...prev, [event.target.name]: event.target.value }
    })
  }

  async function handleSearch() {
    const app_id = '6b539076';
    const app_key = '2e0f6f690ceea02c5407c575dec6e24b';
    const query = encodeURIComponent(recipe.query);
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${app_id}&app_key=${app_key}&q=${query}`);
      const data = await response.json();
      setSearchData(data.hits);
      setIsLoading(false);
      setNone(data.hits.length === 0);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleSearch()
    setIsLoading(true)
    console.log(searchData);
    if (recipe.query.length == 0) {
      setNone(true)
    }
    else {
      setNone(false)
    }
  }
  return (
    <div className='main bg-white w-full h-fit text-black'>
      <div className='search w-full h-[4rem] flex items-center border-b-2 fixed top-0 bg-white max-sm:h-20 max-sm:z-50'>
        <div className='pl-10 flex items-center h-full w-[40%] max-sm:w-[4%] max-sm:pl-5'>
          <i className="fa-solid fa-burger text-3xl max-sm:text-4xl"></i>
          <h1 className='ml-4 font-bold text-xl max-sm:ml-2 max-sm:text-lg max-sm:hidden'>Recipe Finder</h1>
        </div>
        <form className='flex w-full justify-end mr-14 max-sm:mr-3' onSubmit={handleSubmit}>
          <input type="text" name='query' onChange={handleInput} className='input w-[50%] h-12 bg-slate-300 outline-none border-none font-semibold max-sm:w-[85%]' placeholder='Find your favorite dishes...' />
          <button className="btn btn-info ml-3 max-sm:hidden">Search</button>
        </form>
      </div>
      {
        none ? (
          <div className='flex w-screen h-screen bg-white justify-center items-center'>
            <h1 className='font-bold animate-pulse text-slate-600 text-2xl'>Food Items Not Found...</h1>
            
          </div>
        ) : (
          <div className="w-full bg-white h-fit flex flex-wrap justify-center mt-12">
            <div className="food w-[80%] h-fit rounded-xl flex flex-wrap justify-center gap-x-10 gap-y-10 mt-12 mb-6 max-sm:w-[90%]">
              {
                isLoading ? <Loading /> :
                  searchData.length >= 0 &&
                  searchData.map((food, index) => {
                    const modalId = `modal_${index}`;
                    return (
                      <div key={index} className="foodItem w-52 h-[280px] rounded-xl overflow-hidden cursor-pointer 
                        hover:-translate-y-5 hover:scale-100 hover:duration-300
                        duration-300 hover:-z-0 shadow-2xl border-2 max-sm:w-72 
                        max-sm:hover:-translate-y-0 max-sm:hover:scale-800 max-sm:hover:duration-0"
                        onClick={() => document.getElementById(modalId).showModal()}>
                        <div className="w-[100%] h-52 flex justify-center">
                          <div className="w-[90%] h-[85%]">
                            <img className="object-cover h-full w-full rounded-3xl mt-3 max-sm:rounded-md" src={food.recipe.image} alt="" />
                          </div>
                        </div>
                        <div className="flex justify-center w-[90%] h-[20%] ml-3">
                          <h1 className="font-bold pl-2 pr-2 pb-2">{food.recipe.label}</h1>
                        </div>

                        {/* modal  */}

                        <dialog id={modalId} className="modal cursor-auto overflow-hidden">
                          <div className="modal-box w-11/12 max-w-5xl bg-white">
                            <h1 className='font-bold text-3xl text-center'><u>{food.recipe.label}</u></h1>
                            <div className='w-[100%] mt-6 h-[300px] flex justify-center overflow-hidden'>
                              <img className='w-[50%] h-full object-cover rounded-xl max-sm:w-[90%]' src={food.recipe.images.REGULAR.url}  alt="" />
                            </div>
                            <p className='font-semibold text-center'>Preparation Time : {food.recipe.totalTime} min</p>
                            <div className='mt-8 flex flex-col items-center text-black font-bold max-sm:inline-block'>
                                <u><h1 className='text-2xl mb-2 text-center'>Ingrediants</h1></u>
                                {
                                  food.recipe.ingredients.map((ingredient,id)=>{
                                    return(
                                      <div key={id}>
                                        <br />
                                        <h1 className='text-md font-semibold text-slate-400'>{ingredient.text}</h1>
                                      </div>
                                    )
                                  }
                                  )
                                }
                            </div>
                            <div className='flex justify-center w-full h-fit mt-7 max-sm:justify-start'>
                              <a href={food.recipe.url} target="_blank"><u className='text-blue-600 font-bold ml-3'>For detailed preparation instructions, please click here</u></a>
                            </div>
                            <div className="modal-action">
                              <form method="dialog">
                                <button className="btn btn-md btn-circle btn-ghost absolute right-2 top-2 max-sm:btn-sm">✕</button>
                              </form>
                            </div>
                          </div>
                        </dialog>
                      </div>

                    )
                  })
              }
            </div>
          </div>
        )
      }

    </div>
  )
}

export default App
