const Customers = require('../models/Customer')

const customerCtrl = {
    addCustomer: async(req,res)=>{
        try{
            const{name , email , balance} = req.body

            if(!name || !email || !balance)
                return res.status(400).json({msg: "Please fill in all fields."})

                const Customer = await Customers.findOne({email})
                if(Customer) return res.status(400).json({msg: "This email already exists."})
                

            const newCustomer = new Customers({
                name , email , balance
            })

            await newCustomer.save()
            alert("User added Successfully")
            res.json(newCustomer)


        }catch(error){
            return res.status(500).json({msg: error.message})
        }
    },

    getCustomer: async(req,res)=>{
        const customer = await Customers.find({})

        //in saample its res.send
        res.json(customer)
    },

    delCustomer: async(req,res)=>{
        console.log(req.params.id)
        try {
            await Customers.findByIdAndDelete(req.params.id)

            res.json({msg: "Deleted Success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
} 

module.exports = customerCtrl