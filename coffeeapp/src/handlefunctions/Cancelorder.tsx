import axios from 'axios';

const baseurl = 'https://rendersmartcoffe.onrender.com';


interface OrderData {
  orderid: number;
  productname: string;
  producttype: string;
  quantity: number;
  price: number;
  coffephoto: string;
}


interface HistoryData extends Omit<OrderData, 'orderid'> {
  status: string;
  orderid: number;
}


export const getOrderData = async (orderid: number): Promise<any> => {
  try {
    const response = await fetch(`${baseurl}/api/getorder/?orderid=${orderid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('Network response was not ok');

    const data: any = await response.json(); 
    console.log('Fetched order data:', data);
    return data;
  } catch (error: any) {
    console.error('Error fetching order data:', error);
  }
};

const addbalance = async (price) => {
  try {
    const balanceresponse = await fetch(`${baseurl}/api/addbalance/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        balance: price, 
      }),
    });

    if (balanceresponse.ok) {
      console.log("Data is updated successfully");
    } else {
      console.log("Error: Unable to update balance");
    }
  } catch (error) {
    console.log('Error:', 'Balance not updated successfully', error);
  }
};


export const deleteOrder = async (orderid: number): Promise<boolean | void> => {
  try {
    const response = await fetch(`${baseurl}/api/deleteorder/?orderid=${orderid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('Error deleting order');

    console.log(`Order with ID ${orderid} deleted successfully.`);
    return true;
  } catch (error: any) {
    console.error('Error deleting order:', error);
  }
};


export const submitHistoryData = async (historyData: HistoryData): Promise<any> => {
  try {
    const response = await fetch(`${baseurl}/api/recordhistory/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(historyData),
    });

    console.log('History response status:', response.status);
    const result: any = await response.json(); 
    console.log('History response body:', result);

    if (!response.ok) {
      console.error('Error recording history:', result);
      throw new Error('Error recording history');
    }

    return result;
  } catch (error: any) {
    console.error('Error:', error);
  }
};


export const handleCancelOrder = async (orderid: number): Promise<void> => {
  try {
    const orderData: any = await getOrderData(orderid); 

    const historyData: HistoryData = {
      status: 'canceled',
      orderid: orderData.orderid,
      productname: orderData.productname,
      producttype: orderData.producttype,
      quantity: orderData.quantity,
      price: orderData.price,
      coffephoto: orderData.coffephoto,
    };
    const totalprice=(orderData.price);

    await addbalance(totalprice);

    console.log('History data to be submitted:', historyData);

    await submitHistoryData(historyData);
    await recordNotification(historyData.orderid, 'canceled', orderData.coffephoto,historyData.price);

    await deleteOrder(orderid);
  } catch (error: any) {
    console.error('Error:', error);
  }
};


const recordNotification = async (
  notifiid: number,
  notifitype: string,
  notifiphoto: string,
  balance:any
): Promise<any> => {
  try {
    console.log('Notification Data:', notifiid, notifitype, notifiphoto);

    const response = await fetch(`${baseurl}/api/recordnotification/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notiid: notifiid,
        notitype: notifitype,
        notiphoto: notifiphoto,
        balance:balance
      }),
    });

    const data: any = await response.json(); 

    if (response.ok) {
      console.log('Notification recorded successfully:', data);
    } else {
      console.error('Error recording notification:', data);
    }
  } catch (err: any) {
    console.error('Error fetching record notification:', err);
  }
};
