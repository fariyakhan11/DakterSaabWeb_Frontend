import React from "react";
import './medicines.css';
import { useState } from "react";
import MedImg from '../../images/medicine.png'

function Medicines(){
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Search term: ${searchTerm}, Category: ${selectedCategory}`);
    // Do something with search term and selected category
  };

return(
<>
        <div id="Medicinesdashboard">
          <div className="contentarea">
                    <h3 className="contentareatitle">Our Medicines</h3>
                    <hr/>
                    <div className="searchbar">

                          <input
                            type="text"
                            placeholder="Search medicines.."
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                            className='search'
                          />
                          <select value={selectedCategory} onChange={handleCategoryChange} className='optionscategory'>
                            <option value="all">All categories</option>
                            <option value="books">Books</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                          </select>
                          <button type="submit" className="searchbtn">Search</button>
                        
                    </div>
                    <div className="infomeds">
                      <div className="medscontainer">
                          <div className="medsdiv">
                            <div className="topareamed">
                                <div className="medimg">
                                  <img  src={MedImg}></img>
                                </div>
                                <div className="sideareamed"></div>
                            </div>
                            <div className="bottomareamed">
                            </div>
                          </div>
                          <div className="medsdiv">
                              
                          </div>
                          <div className="medsdiv">
                              
                          </div>
                          <div className="medsdiv">
                              
                          </div>
                          <div className="medsdiv">
                              
                          </div>
                          <div className="medsdiv">
                              
                          </div>
                          <div className="medsdiv">
                              
                          </div>
                          <div className="medsdiv">
                              
                          </div>
                          <div className="medsdiv">
                              
                          </div>
                          <div className="medsdiv">
                              
                          </div>
                      </div>
                    </div>    
          </div>

          <div className="controlbtns">
              <div id="addstock" className="stockoperation">
                <div id="addMedicines" className="stockopicon">
                <h4>+</h4>
                </div>
                <div className="stockoptitle"><h4>Add Medicine Stock</h4></div>
              </div>
              <div id="delstock" className="stockoperation">
                <div id="delMedicines"  className="stockopicon">
                  <h4 >+</h4>
                </div>
                <div className="stockoptitle"> 
                  <h4>Delete Selected Stock</h4>
                </div>
              </div>
          </div>


        </div>
</>
)
}
export default Medicines;