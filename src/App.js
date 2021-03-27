import { useEffect, useState } from 'react'
import styled from 'styled-components'
import {getData, writeData} from './data'

function App() {

  const [labels, setLabels] = useState('')
  const [expenses, setExpenses] = useState('')
  const [newOption, setNewOption] = useState('')
  const [seed, setSeed] = useState('')
  const [qty, setQty] = useState('')
  const [price, setPrice] = useState('')
  const [year, setYear] = useState('')
  const [landLord, setLandLord] = useState('')
  const [crop, setCrop] = useState('')
  const [chemical, setChemical] = useState('')
  const [fertilizer, setFertilizer] = useState('')
  const [seedList, setSeedList] = useState([])
  const [chemList, setChemList] = useState([])
  const [fuelList, setFuelList] = useState([])
  const [fertList, setFertList] = useState([])
  const [truckingList, setTruckingList] = useState([])
  const [optionList, setOptionList] = useState([])
  const [expense, setExpense] = useState('')
  const [id, setId] = useState(1)
  const [add, setAdd] = useState(false)
  const [newExpense, setNewExpense] = useState('')

  

  useEffect(() => {
    getData('labels', setLabels)
    getData('expenses', setExpenses)
  },[])

  const removeItem = (arr, attr, value, fun) => {
    console.log(arr)
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
    fun(array)
  }

  const addOption = (arr, attr, value) => {
    let i = arr.length
    while (i--) {
      if(arr[i] 
        && arr[i].hasOwnProperty(attr) 
        && arr[i][attr] === value){ 
         arr[i]["options"].push(newOption)
         console.log(arr)
         return (
           setExpenses(arr)
         )
       }
    }
  } 
  
  const addNewExpense = (e) => {
    e.preventDefault()
    if (newExpense) {

      let obj = {
        label: newExpense,
        dispatch: 'SET_EXP',
        options: []
      }
      writeData('expenses', obj, expenses)
      document.getElementById('add__new').reset()
    } else {
      addOption(expenses, "label", expense)
      console.log(expense)
      // let array = optionList
      // array.push(newOption)
      // let obj = {
      //   label: expense,
      //   dispatch: 'SET_EXP',
      //   options: array
      // } 
      writeData('expenses', expenses)
      document.getElementById('add__new').reset()
    }
  } 


  const addExpense = (e, exp) => {
    e.preventDefault()
    if (price > 0 && qty > 0) {
      let obj = {}
      let int = id + 1
      setId(int)
      switch (exp) {
        case ('Seed'):
          obj = {
            name: seed,
            price: price,
            qty: qty,
            id: int
            
          }
          setSeedList([...seedList, obj])
          break;
        case ('Chemical'):
          obj = {
            name: chemical,
            price: price,
            qty: qty,
            id: id
          }
          setChemList([...chemList, obj])
          break;
        case ('Fertilizer'):
          obj = {
            name: fertilizer,
            price: price,
            qty: qty,
            id: id
          }
          setFertList([...chemList, obj])
          break;
        case ('LP'):
          obj = {
            name: expense,
            price: price,
            qty: qty,
            id: id
          }
          setFuelList([...fuelList, obj])
          break;
        case ('Trucking'):
          obj = {
            name: expense,
            price: price,
            qty: qty,
            id: id
          }
          setTruckingList([...truckingList, obj])
          break;
            default:
              return
      }
      console.log(id)
      document.getElementById("Expense").reset()
      setOptionList('')
    }
    else return
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target)
   

  }

  const handleChange = (e) => {
    
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
      case ("Fertilizer") :
        setFertilizer(e.target.value)
        break
      case ("Expense") :
        setExpense(e.target.value)
        break
      case ("Add_Expense") :
        e.target.value === 'add__expense' ?
        setAdd(true)
        :
        setExpense(e.target.value)
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
    expenses?.map((item) => {
      if(item.label === e.target.value) {
        let a = []
        item.options ?
        item.options.map((option) => {
          a.splice(0, 0, option)
          return(
            setOptionList(a)
          )
        })
        :
        setOptionList('')
      } else return null
    })
  }

  return (
    <Container className="App">
      <Input>
      <form action="">

        {
          labels &&
          labels.map((obj) => (
            <Select>
              <label htmlFor={obj.label}>{obj.label}</label>
              <select name={obj.label} onChange={(e) => handleChange(e)}>
              <option value="" defaultValue hidden >Choose here</option>
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
      <form id="Expense" action="add seed" >
        <Select>
        <label htmlFor="Expense">Add Expense</label>
        <select name="Expense"  onChange={(e) => handleChange(e)}>
          <option value="" defaultValue hidden>Choose here</option>

          {
            expenses &&
            expenses.map((obj) => (
              <option key={obj.label}value={obj.label}> {obj.label} </option>
            ))
          }
        </select>
        {
          optionList.length > 0 ?  
           
          // <label for="expense">Add Expense</label>
          <select name={expense} onChange={(e) => handleChange(e)}>
            <option value="" defaulfValue hidden>Choose here</option>
            
            {        
              optionList &&
              optionList.map((obj) => (
                <option key={obj} >{obj}</option>
              ))         
            }
          </select>
          :
          ''
        }
          <label htmlFor="qty">Quantity</label>
          <input placeholder="QTY" name="Qty"type="number" onChange={(e) => handleChange(e)}/>
          <label htmlFor="price">Price Per Unit</label>
          <input placeholder="Price" name="Price"type="number" onChange={(e) => handleChange(e)}/>
          <button type="submit" onClick={(e) => addExpense(e, expense)}>ADD</button>
        </Select>
      </form>
      <form id='add__new' action="add">
      <Select>
        <label htmlFor="Add_Expense">Add New Expense</label>
        <select name="Add_Expense"  onChange={(e) => handleChange(e)}>
          <option value="" defaultValue hidden>Choose here</option>

          {
            expenses &&
            expenses.map((obj) => (
              <option key={obj.label}value={obj.label}> {obj.label} </option>
            ))
          }
          <option value="add__expense">Add New</option>
        </select>
        {
          // optionList ?  
           
          // // <label for="expense">Add Expense</label>
          // <select name={expense} onChange={(e) => {handleChange(e); document.getElementById('add__new__input').focus()}}>
          //   <option value="" selected hidden>Choose here</option>
            
          //   {        
          //     optionList &&
          //     optionList.map((obj) => (
          //       <option key={obj} >{obj}</option>
          //     ))         
          //   }
          // </select>
          // :
          add ?
          <input id='add__new__input' type="text"onChange= {(e) => setNewExpense(e.target.value)}/>
          :
          expense ? 
          <input type="text" onChange={(e) => setNewOption(e.target.value)}/>
          : ''
            
        }  
          <button type="submit" onClick={(e) => addNewExpense(e)}>ADD</button>
        </Select>
      </form>
      </Input>
    <Report>
      <Header>
        <h2>{landLord} {crop} {year}</h2>
      </Header>
      {
        seedList.length > 0 ?
        <h3>Seed</h3>
        : ''
      }
      <Expense>
        {
          seedList &&
          seedList.map((obj) => (
            <Item>
            <p><b>Name:</b> {obj.name}</p>
            <p><b>Price per bag:</b> {obj.price}</p>
            <p><b>Total:</b> ${obj.price * obj.qty}</p>
            <button onClick={() => removeItem(seedList, 'id', obj.id, setSeedList)}>Delete</button>
            </Item>
          ))
        }
      </Expense>
      {
        chemList.length > 0 ?
        <h3>Chemicals</h3>
        : ''
      }
      <Expense>
        {
          chemList &&
          chemList.map((obj) => (
            <Item>
            <p><b>Name:</b> {obj.name}</p>
            <p><b>Price per gal:</b> ${obj.price}</p>
            <p><b>Total:</b> ${obj.price * obj.qty}</p>
            <button onClick={() => removeItem(chemList, 'id', obj.id, setChemList)}>Delete</button>
            </Item>
          ))
        }
      </Expense>
      {
        fertList.length > 0 ?
        <h3>Fertilizer</h3>
        : ''
      }
      <Expense>
        {
          fertList &&
          fertList.map((obj) => (
            <Item>
            <p><b>Name:</b> {obj.name}</p>
            <p><b>Price per gal:</b> ${obj.price}</p>
            <p><b>Total:</b> ${obj.price * obj.qty}</p>
            <button onClick={() => removeItem(chemList, 'id', obj.id, setFertList)}>Delete</button>
            </Item>
          ))
        }
      </Expense>
      {
        fuelList.length > 0 ?
        <h3>Fuel</h3>
        : ''
      }
      <Expense>
        {
          fuelList &&
          fuelList.map((obj) => (
            <Item>
            <p><b>Name:</b> {obj.name}</p>
            <p><b>Price per gal:</b> ${obj.price}</p>
            <p><b>Total:</b> ${obj.price * obj.qty}</p>
            <button onClick={() => removeItem(chemList, 'id', obj.id, setFuelList)}>Delete</button>
            </Item>
          ))
        }
      </Expense>
      {
        truckingList.length > 0 ?
        <h3>Trucking</h3>
        : ''
      }
      <Expense>
        {
          truckingList &&
          truckingList.map((obj) => (
            <Item>
            <p><b>Name:</b> {obj.name}</p>
            <p><b>Price per Bu:</b> ${obj.price}</p>
            <p><b>Total:</b> ${obj.price * obj.qty}</p>
            <button onClick={() => removeItem(truckingList, 'id', obj.id, setTruckingList)}>Delete</button>
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
  flex-direction: column;

`
const Item = styled.div`
  display: flex;
  p {
    margin: 0 5px;
  }
`
