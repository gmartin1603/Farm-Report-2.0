import { useState } from 'react'
import styled from 'styled-components'
import {labels, seeds, chemicals} from './data'

function App() {

  const [seed, setSeed] = useState('')
  const [qty, setQty] = useState('')
  const [price, setPrice] = useState('')
  const [year, setYear] = useState('')
  const [landLord, setLandLord] = useState('')
  const [crop, setCrop] = useState('')
  const [chemical, setChemical] = useState('')
  const [seedList, setSeedList] = useState([])
  const [chemList, setChemList] = useState([])
  const [id, setId] = useState(1)

  

  
  const addSeed = (e) => {
    e.preventDefault()
    if (price > 0 && qty > 0) {
      let int = id + 1
      setId(int)
      let obj = {
        name: seed,
        price: price,
        qty: qty,
        id: int
      }
      setSeedList([...seedList, obj])
      console.log(id)
    }
    else return
  }
  const addChemical = (e) => {
    e.preventDefault()
    if (price > 0 && qty > 0) {
      let int = id + 1
      setId(int)
      let obj = {
        name: chemical,
        price: price,
        qty: qty,
        id: id
      }
      setChemList([...chemList, obj])
    }
    else return
  }

  const removeSeed = (arr, attr, value) => {
    
    let i = arr.length;
    let array = []
    while(i--){
        if(arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && arr[i][attr] === value){ 
            // console.log(arr)
            // arr.splice(i,1)
            // console.log(arr)
          }else{
            array.splice(0, 0, arr[i])
            // array.push(arr[i])
          }      
    }
    setSeedList(array)
  }
  const removeChemical = (arr, attr, value) => {
    
    let i = arr.length;
    let array = []
    while(i--){
        if(arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && arr[i][attr] === value){ 
            // console.log(arr)
            // arr.splice(i,1)
            // console.log(arr)
          }else{
            array.splice(0, 0, arr[i])
            // array.push(arr[i])
          }      
    }
    setChemList(array)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target)
   

  }

  const handleChange = (e) => {
    console.log(e.target.name)
    switch (e.target.name) {
      case ("Land Lord") :
        setLandLord(e.target.value)
        break
      case ("Crop") :
        setCrop(e.target.value)
        break
      case ("Year") :
        setYear(e.target.value)
        break
      case ("Seed") :
        setSeed(e.target.value)
        break
      case ("Chemical") :
        setChemical(e.target.value)
        break
      case ("Price") :
        setPrice(e.target.value)
        break
      case ("Qty") :
        setQty(e.target.value)
        break
      default:
        return
    }
  }

  return (
    <Container className="App">
      <Input>
      <form action="">

        {
          labels &&
          labels.map((obj) => (
            <Select>
              <label for={obj.label}>{obj.label}</label>
              <select name={obj.label} onChange={(e) => handleChange(e)}>
              <option value="" selected hidden >Choose here</option>
                {
                  obj.options && 
                  obj.options.map((option) => (
                    <option value={option}>{option}</option>
                    ))
                }
              </select>
            </Select>
          ))
        }
      </form>
      <form action="add seed" >
        <Select>

        <label for={seeds.label}>{seeds.label}</label>
        <select name={seeds.label} onChange={(e) => handleChange(e)}>
          <option value="" selected hidden>Choose here</option>
          {
            seeds.options.map((obj) => (
              <option>{obj}</option>
              ))
          }
        </select>
          <label For="qty">Quantity</label>
          <input placeholder="QTY" name="Qty"type="number" onChange={(e) => handleChange(e)}/>
          <label For="price">Price Per Bag</label>
          <input placeholder="Price" name="Price"type="number" onChange={(e) => handleChange(e)}/>
          <button type="submit" onClick={(e) => addSeed(e)}>ADD</button>
        </Select>
      </form>
      <form action="add chem" >
        <Select>

        <label for={chemicals.label}>{chemicals.label}</label>
        <select name={chemicals.label} onChange={(e) => handleChange(e)}>
          <option value="" selected hidden>Choose here</option>
          {
            chemicals.options.map((obj) => (
              <option>{obj}</option>
              ))
            }
        </select>
          <label For="qty">Quantity</label>
          <input placeholder="QTY" name="Qty"type="number" onChange={(e) => handleChange(e)}/>
          <label For="price">Price Per Bag</label>
          <input placeholder="Price" name="Price"type="number" onChange={(e) => handleChange(e)}/>
          <button type="submit" onClick={(e) => addChemical(e)}>ADD</button>
        </Select>
      </form>
        

      </Input>
    <Report>
      <Header>
        <h2>{landLord} {crop} {year}</h2>
      </Header>
        <h3>Seed</h3>
      <Expense>
        {
          seedList &&
          seedList.map((obj) => (
            <Item>
            <p><b>Name:</b> {obj.name}</p>
            <p><b>Price per bag:</b> {obj.price}</p>
            <p><b>Total:</b> {obj.price * obj.qty}</p>
            <button onClick={() => removeSeed(seedList, 'id', obj.id)}>Delete</button>
            </Item>
          ))
        }
      </Expense>
        <h3>Chemicals</h3>
      <Expense>
        {
          chemList &&
          chemList.map((obj) => (
            <Item>
            <p><b>Name:</b> {obj.name}</p>
            <p><b>Price per gal:</b> ${obj.price}</p>
            <p><b>Total:</b> ${obj.price * obj.qty}</p>
            <button onClick={() => removeChemical(chemList, 'id', obj.id)}>Delete</button>
            </Item>
          ))
        }
      </Expense>

    </Report>
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
`

const Input = styled.div`
  
`

const Select = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
`

const Report = styled.div`

`
const Header = styled.div`

`
const Expense = styled.div`
  display: flex;
  flex-wrap: wrap;

`
const Item = styled.div`
  display: flex;
  p {
    margin: 0 5px;
  }
`
