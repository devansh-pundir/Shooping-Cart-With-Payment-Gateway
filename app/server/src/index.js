const express = require('express')
const cors = require('cors')
const Razorpay = require('razorpay');
const products = require('./data');

const app = express();

// Razorpay Instance
const key_id = 'ABC'
const key_secret = 'ABC'
const instance = new Razorpay({
    key_id,
    key_secret
});

app.use(cors())
app.use(express.json())

app.get('/products', (req, res) => {
    res.status(200).json(products)
})

app.get('/order/:productId', (req, res) => {
    const { productId } = req.params
    const product = products.find(product => product.id == productId)
    const options = {
        amount: product.price,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    instance.orders.create(options, function (err, order) {
        console.log(order);
        return res.status(200).json(order)
    });
})

app.post("/verify/razorpay_signature", (req, res) => {
    console.log(JSON.stringify(req.body))
    const crypto = require('crypto')
    const hash = crypto.createHmac('SHA256', 'Security_Key').update(JSON.stringify(req.body)).digest('hex')
    console.log(hash)
    console.log(req.header['x-razorpay-signature'])
    if (hash == req.header['x-razorpay-signature']) {
        // SAVE PAYMENT INFORMATION INTO DATABASE
    } else {
        // PAYMENT DECLINED
    }
    res.status(200)
})

app.listen(8000, () => {
    console.log("Server listening on PORT 8000.")
})