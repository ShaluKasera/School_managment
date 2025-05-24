const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('../models/auth')


const signup = async(req,res) => {
const {name,email,password}=req.body;
try {
    const existing = await User.findOne({where:{email}})
    if(existing) return res.status(400).json({error:'User already exist'})
    const hashed = await bcrypt.hash(password,10);
const user = await User.create({name,email,password:hashed})
res.status(201).json({msg:"User created successfully",user})
} catch (error) {
    res.status(500).json({ error: 'Signup error',error });
}
}



const login = async(req,res) => {
   const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Login error' });
  } 
}

module.exports = {signup,login}