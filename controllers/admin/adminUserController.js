import User from '../../models/user.js'

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find().select("-password")

        res.json(users)
    } catch (error) {
        res.status(500).json({status:500,message: "Server error."})
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params
    
    try {
        const user = await User.findByIdAndDelete(id)

        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found."})
        }

        return res.status(200).json({ status: 200, message: "Delete user successfully. "})
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Server error."})
    }
}