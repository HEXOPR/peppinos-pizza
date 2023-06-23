import './Home.css'
import { useState, useEffect } from 'react'
import { collection, getDocs, setDoc, doc } from 'firebase/firestore'
import { async } from '@firebase/util';
import {auth, db} from '../firebase-config.js'




export const Home = () => { 

const [food, setFoods] = useState([])
const [user, setUser] = useState([])
  const dbRef = collection(db, 'food')

  const [drinks, setDrinks] = useState([])
  
    const dbRefDrinks = collection(db, 'drinks')

    const [orders, setOrders] = useState([])



    const obrisi = (izbor) => {
      setOrders(orders.filter((order) => order.id != izbor.id))
    }

     const totalPrice = () => {
let total = 0;

orders.map((order) => total = total + order.price * order.kolicina);
return total;

     }

     const placeorders = async() => {
      await setDoc(doc(db, "order", "collection-orders"),{"user": "test", "order": orders})
      setOrders([])
      alert("Pordzbina uspesno primljena")
    
     }

    const remove = (izbor) => {
      const postoji = orders.find((x) => x.id === izbor.id)
  
      if(postoji){
        if(postoji.kolicina === 1){
              setOrders(orders.filter((order) => order.id != izbor.id))
        }else{
          setOrders(
            orders.map((order) =>
            order.id === izbor.id ?
             { ...postoji, kolicina: postoji.kolicina - 1 } 
             : order
            )
        )
        }
      }
    }
  
    const add = (izbor) => {
  
      const postoji = orders.find((x) => x.id === izbor.id)
  
  
          if (postoji) {
            setOrders(
                  orders.map((order) =>
                  order.id === izbor.id ?
                   { ...postoji, kolicina: postoji.kolicina + 1 } 
                   : order
                  )
              )
          } else {
            setOrders([...orders, { ...izbor, kolicina: 1 }])
  
          }
  
    }

  const getFood = async () => {
      const data = await getDocs(dbRef);
      console.log(data)
      setFoods(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };


    const getDrinks = async () => {
      const data = await getDocs(dbRefDrinks);
      console.log(data)
      setDrinks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

  useEffect(() => {

    getFood();
    getDrinks();

  }, [])



  return (
    <div className='menu'>
{
  user?(<div>
    User : {user.email}
    {/* <button onClick={() => logout()}>Logout</button> */}
  </div>) : 
  (<div><p>user nije ulogovan</p></div>)
}
      <div className="food">
            {
              food.map((jelo) => {
                return (
                  <div className='menuCard'>
                    <div className='menuInfo'>
                      <h3>{jelo.name}</h3>
                      <h4>{jelo.description}</h4>
                      <h4 className='price'>{jelo.price} RSD</h4>
                      <button onClick={() => add(jelo)}>Add to cart</button>
                    </div>

                    <div className='menuImg'>
                      <img src={jelo.img}></img>
                    </div>

                  </div>
                )

              })
            }
      </div>

    <div className="drinks">
      {
        drinks.map((jednopice) => {
          return (
            <div className='menuCard'>
              <div className='menuInfo'>
                <h3>{jednopice.name}</h3>
                <h4>{jednopice.description}</h4>
                <h4 className='price'>{jednopice.price} RSD</h4>
                <button onClick={() => add(jednopice)}>Add to cart</button>
              </div>

              <div className='menuImg'>
                <img src={jednopice.img}></img>
              </div>

            </div>
          )

        })
      }
    </div>s
    {
      orders.length === 0? (<div></div>) :
        (<div className='korpa'>
        <h3>Korpa</h3>
        {
        orders.map((order) => {
          return (
              <div className='order'>
                <h4>{order.name} </h4>
                <h4>{order.price} RSD </h4>
                <button onClick={() => remove(order)}> - </button>
                <h4>{order.kolicina}</h4>
                <button onClick={() => add(order)}> + </button>
                <h4> ukupno {order.price * order.kolicina} RSD</h4>
                <button onClick={() => obrisi(order)}> x </button>
              </div>
          )

        })
      }

      <h4 className='total'>UKUPNA CENA ZA NAPLATU: {totalPrice()} RSD</h4>
      <h4 className='total2'>cena dostave: {totalPrice() > 3000 ? 0 : totalPrice() * 0.1}</h4>
      <button  onClick={() => placeorders()}> Place</button>
    </div>
)
    }

    
    </div>
  );
   }