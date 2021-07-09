const Transactions = require('../models/Transaction')
const Customers = require('../models/Customer')


const transactionCtrl = {
    getTransaction: async(req,res)=>{
        const transactions = await Transactions.find({}).sort({ date: -1 })

        // there was res.send in sample
         res.json(transactions)
    },

    doTransaction: async(req,res)=>{
        const { from, to, amount } = req.body
  try {
    const donor = await Customers.findById(from)
    const newDonorbalance = Number(donor.balance) - Number(amount)
    Customers.updateOne({ _id: from }, { balance: newDonorbalance }, err => {
      if (err) {
        console.log(err)
        //there was res.send in sample
        res.status(500).json('Server Error')
      } else {
        console.log('UPDATED')
      }
    })
    const receiver = await Customers.findById(to)
    const newReceiverbalance = Number(receiver.balance) + Number(amount)
    Customers.updateOne({ _id: to }, { balance: newReceiverbalance }, err => {
      if (err) {
        console.log(err)
        //there was res.send in sample
        res.status(500).json('Server Error')
      } else {
        console.log('UPDATED')
      }
    })
    const transaction = new Transactions({
      from: donor,
      to: receiver,
      amount,
    })
    transaction.save()
    res.json(transaction)
  } catch (error) {
    console.log(error)
    //there was res.send in sample
    res.status(500).json('Server Error')
  }

    }
}

module.exports = transactionCtrl