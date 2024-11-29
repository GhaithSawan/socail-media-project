let cloudinary = require("cloudinary")

cloudinary.config({
    cloud_name: process.env.cloudname,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
})


async function UploudCloud(img) {
    try {
        let data = await cloudinary.uploader.upload(img, {
            resource_type: "auto"
        })
        return data
    } catch (error) {
        return error
    }
}
async function DeletCloud(imgId) {
    console.log("1");
    
    try {
        console.log("id ");
        console.log(imgId);
        let data = await cloudinary.uploader.destroy(imgId)
        console.log("data");
        console.log(data);
        return data
    } catch (error) {
        return error
    }
}
async function DeletCloudMany(imgIds) {
    try {
        let data = await cloudinary.v2.api.delete_resources(imgIds)
        return data
    } catch (error) {
        throw new Error("cloudinary error")
    }
}
module.exports = {
    DeletCloud,UploudCloud,DeletCloudMany
}