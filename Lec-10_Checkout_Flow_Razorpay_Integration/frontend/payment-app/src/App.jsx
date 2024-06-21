import './App.css';
import Axios from 'axios';

function App() {

  const loadScript = () => {

    return new Promise((resolve, reject)=>{

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';

      script.onload = resolve;
      script.onerror = reject;

      document.body.appendChild(script);
    })

  }

  const displayRazorpay = async() =>{
    try{
      await loadScript();
      console.log('Script has been loaded');

      const payload = {
        amount: 100 // Set amount value here
      };

      const orderResponse = await Axios.post('http://localhost:3000/checkout', payload);

      const Key_id = 'rzp_test_JKRIypSGhbL544';
      const {id, amount, currency} = orderResponse.data.data;
      // console.log(amount);

      let options = {
      "key": Key_id, // Enter the Key ID generated from the Dashboard
      "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": currency,
      "name": "Acme Corp", //your business name
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          "name": "Ashwani Kumar Rajput", //your customer's name
          "email": "gaurav.kumar@example.com",
          "contact": "9810214080" //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
      };
      const  rzpInst = new window.Razorpay(options);
      rzpInst.open();
    }catch(error){
      console.error('Error placing order:', error);
    }
}

  return (
    <>
      <button id="rzp-btn" onClick={displayRazorpay}>Pay</button>
    </>
  )
}

export default App
