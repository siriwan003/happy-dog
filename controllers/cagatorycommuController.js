import Cagatorycommu from '../models/cagatorycommu.js'

export const cagatorycommu = async (req, res) => {
    try{
    const {ctgycommuname} = req.body   
    const existCtgycommuname = await Cagatorycommu.findOne({ ctgycommuname })

        if (existCtgycommuname) {
            return res.status(400).json({ status: 400, message: "Duplicate community category name." })
        }
    
        const cagatorycommu = new Cagatorycommu({
               ctgycommuname
           })
       
           await cagatorycommu.save();
       
           return res.status(201).json({ status: 201, message: "Create a community category name in success." });
    }catch(error){
        return res.status(500).json({status:500, message:"Internet server error."})
    }
}

export const updateCagatorycommu = async (req, res) => {
    try {
        const { id } = req.params;
        const { ctgycommuname } = req.body

        const exist = await Cagatorycommu.findOne({ ctgycommuname, _id: { $ne: id } })

        if (exist) {
            return res.status(400).json({ status: 400, message: "Duplicate community category name." })
        }

        const updated = await Cagatorycommu.findByIdAndUpdate(
            id,
            { ctgycommuname },
            { new: true }
        )

        if (!updated) {
            return res.status(404).json({ status: 404, message: "Community category not found." })
        }

        return res.status(200).json({ status: 200, message: "Community category updated successfully." })

    } catch (error) {
        return res.status(500).json({ status: 500, message: "Server error." })
    }
}

export const deleteCagatorycommu = async (req, res) => {
    try {
        const { id } = req.params

        const deleted = await Cagatorycommu.findByIdAndDelete(id)

        if (!deleted) {
            return res.status(404).json({ status: 404, message: "Community category not found." })
        }

        return res.status(200).json({ status: 200, message: "Community category deleted successfully." })

    } catch (error) {
        return res.status(500).json({ status: 500, message: "Server error." })
    }
}


