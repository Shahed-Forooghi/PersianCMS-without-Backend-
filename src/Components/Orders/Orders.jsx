import { useEffect, useState } from 'react'
import ErrorBox from '../ErrorBox/ErrorBox'
import OrdersTable from './OrdersTable/OrdersTable'

export default function Orders() {
  const [orders , setOrders] = useState([])

  useEffect(() => {
    getAllOrders()
  } , [])

  const getAllOrders = () => {
    fetch(`http://localhost:8000/api/orders`)
    .then(res => res.json())
    .then(result => {console.log(result) , setOrders(result)})
  }

  const deleteOrder = (orderID) => {
    fetch(`http://localhost:8000/api/orders/${orderID}` , {
      method : 'DELETE',
    }).then(res => res.json())
    .then(() => getAllOrders())
  }

  const acceptOrder = (orderID , isActive) => {
    fetch(`http://localhost:8000/api/orders/active-order/${orderID}/${isActive}` , {
      method : "PUT" , 
    }).then(res => res.json())
    .then(() => {
      getAllOrders()
      console.log(orders)
    })
  }

  const rejectOrder = (orderID , isActive) => {
    fetch(`http://localhost:8000/api/orders/active-order/${orderID}/${isActive}` , {
      method : "PUT" , 
    }).then(res => res.json())
    .then(() => {
      getAllOrders()
      console.log(orders)
    })
  }


  return (
    <div>
      {orders ? <OrdersTable orders={orders} deleteOrder={deleteOrder} acceptOrder={acceptOrder} rejectOrder={rejectOrder} /> : <ErrorBox msg={'هیچ سفارشی یافت نشد .'} /> }
    </div>
  )
}
