import User from '../models/user.js'
import argon2 from 'argon2'


export const register = async (req, res) => {
    const {firstname, lastname, phonenumber,email, password} = req.body 

    if(!firstname || !lastname || !phonenumber || !email|| !password) { 
        res.status(400).json({status: 400, message: "bad request."}) }

        //ตรวจสอบรูปแบบอีเมล ว่าตรงกับที่ระบบต้องการมั้ย
    const emailRegex = /^\S+@\S+\.\S+$/

    if (!emailRegex.test(email)) {

        return res.status(400).json({ status: 400, message: "Invalid email format." })
    }

        //ตรวจสอบรูปแบบการใส่หัสผ่าน ว่าตรงกับที่ระบบต้องการมั้ย
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])/
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ status: 400, message: "Password must contain at least one uppercase letter and one special character." });
       
    }

    if(password.length < 8)
        return res.status(400).json({ status: 400, message: "The code must be at least 8 characters."})

        //ตรวจสอบอีเมลซ้ำ
    const existEmail = await User.findOne({ email })
    if (existEmail) {
        return res.status(400).json({ status: 400, message: "There is a duplicate email in the system." })
    } 

        //ตรวจสอบเบอร์โทรซ้ำ
    const existPhonenumber = await User.findOne({ phonenumber })
    if (existPhonenumber) {
        return res.status(400).json({ status: 400, message: "There is a duplicate phone number in the system. " })
    }

        //แฮชรหัสผ่าน
    const hashPassword = await argon2.hash(password);

        // สร้างผู้ใช้ใหม่
    const user = new User({
        firstname,
        lastname,
        phonenumber,
        email,
        password: hashPassword,
    })

    await user.save();

    return res.status(201).json({ status: 201, message: "User created successfully." });

    }

// ดูข้อมูลของบุคคล
export const profile = async(req,res) => {
    const { id } = req.params
    const users = await User.findById(id)

    
    return res.status(200).json({status: 200, data:users})
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        // เช็คก่อนว่ามีรหัสและอีเมลกรอกมาไหม
        if (!email || !password) {
            return res.status(400).json({ status: 400, message: "Please fill out the information completely." })
        }

        // หา user
        const existUser = await User.findOne({ email })
        if (!existUser) {
            return res.status(404).json({ status: 404, message: "User not found." })
        }

        // ตรวจสอบรหัสผ่าน
        const passwordVerify = await argon2.verify(existUser.password, password)
        if (!passwordVerify) {
            return res.status(401).json({ status: 401, message: "The password is incorrect." })
        }

        // เข้าสู่ระบบสำเร็จ
        return res.status(200).json({
            status: 200,
            message: "Login successful."
        })
    } catch (error) {
        console.error("Login error:", error)
        return res.status(500).json({ status: 500, message: "A system error occurred." })
    }
}

// อัพเดตแก้ไขข้อมูล user
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body; 
    try {
        const user = await User.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found." })
        }

        return res.status(200).json({ status: 200, message: "User updated successfully.", user })
    } catch (error) {
        console.error("Update error:", error)
        return res.status(500).json({ status: 500, message: "Internal server error." })
    }
}
// ลบ user
export const deleteUser = async (req, res) => {
    const { id } = req.params
    
    try {
        const user = await User.findByIdAndDelete(id)

        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found."})
        }

        return res.status(200).json({ status: 200, message: "Delete user successfully. "})
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Internet server error."})
    }
}