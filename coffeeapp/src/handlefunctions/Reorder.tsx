import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';


const baseurl = 'https://rendersmartcoffe.onrender.com';


interface OrderData {
  orderid: number;
  productname: string;
  producttype: string;
  quantity: number;
  price: number;
  coffephoto: string;
}

interface NewOrderData extends Omit<OrderData, 'orderid'> {
  orderid: number;
}


export const gethistoryData = async (orderid: number): Promise<any> => {
  try {
    const response = await fetch(`${baseurl}/api/gethistory/?orderid=${orderid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('Network response was not ok');

    const data: any = await response.json(); 
    console.log('Fetched history data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching history data:', error);
  }
};


export const deletehistory = async (orderid: number): Promise<any> => {
  try {
    const response = await fetch(`${baseurl}/api/deletehistory/?orderid=${orderid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('Error deleting history');

    console.log(`History with ID ${orderid} deleted successfully.`);
    return true;
  } catch (error) {
    console.error('Error deleting history:', error);
  }
};


export const submitorderData = async (Newdata: any): Promise<any> => {
  try {
    console.log('Data before submitting:', Newdata);

    const response = await fetch(`${baseurl}/api/recordorder/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Newdata),
    });

    console.log('Order response status:', response.status);
    const result: any = await response.json(); 
    console.log('Order response body:', result);

    Alert.alert('Canceled order:', `${Newdata.orderid} successfully ordered`);

    if (!response.ok) {
      console.error('Error recording order:', result);
      throw new Error('Error recording order');
    }

    return result;
  } catch (error) {
    console.error('Error:', error);
  }
};


const fetchNewOrderId = async (): Promise<any> => {
  try {
    const response = await fetch(`${baseurl}/api/latestorder/`);
    const data: any = await response.json(); 
    return data.new_orderid;
  } catch (err) {
    console.error('Error fetching new order ID:', err);
  }
};


const recordNotification = async (notiid: number, notitype: string, notiphoto: string,balance:any): Promise<any> => {
  try {
    const response = await fetch(`${baseurl}/api/recordnotification/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ notiid, notitype, notiphoto,balance }),
    });

    const data: any = await response.json(); 

    if (response.ok) {
      console.log('Notification recorded successfully:', data);
    } else {
      console.error('Error recording notification:', data);
    }
  } catch (err) {
    console.error('Error fetching record notification:', err);
  }
};


export const updatebalance=async (orderid: number):  Promise<void> =>
  {
    try
    {
      const orderData: any = await gethistoryData(orderid);  
      if (!orderData) throw new Error('Failed to fetch order data');

    const newOrderId: any = await fetchNewOrderId(); 

    if (!newOrderId) throw new Error('Failed to fetch new order ID');


    const Neworderdata: any = {
      
      
      
      quantity: orderData.quantity,
      price: orderData.price,
      
    };

    const totalprice=(orderData.price);


    
    const balanceresponse=await fetch(`${baseurl}/api/updatebalance/`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
       balance:totalprice,
      }),
    });
    if (balanceresponse.ok)
    {
     await  handleReorder(orderid);
    }
  }catch(error)
  {
    Alert.alert('insufficient balance');
  }
  }





export const handleReorder = async (orderid: number): Promise<void> => {
  try {
    const orderData: any = await gethistoryData(orderid); 

    if (!orderData) throw new Error('Failed to fetch order data');

    const newOrderId: any = await fetchNewOrderId(); 

    if (!newOrderId) throw new Error('Failed to fetch new order ID');

    const Neworderdata: any = {
      orderid: newOrderId,
      productname: orderData.productname,
      producttype: orderData.producttype,
      quantity: orderData.quantity,
      price: orderData.price,
      coffephoto: orderData.coffephoto,
    };

    console.log('Order data to be submitted:', Neworderdata);
    console.log('Order ID to be submitted:', newOrderId);

    await submitorderData(Neworderdata);
    await recordNotification(newOrderId, 're-order', orderData.coffephoto,orderData.price);
    await deletehistory(orderid);
  } catch (error) {
    console.error('Error:', error);
  }
};
