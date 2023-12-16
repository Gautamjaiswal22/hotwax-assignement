async function addname(params, callback) {
    try {
        const { phone, name, city, mail, profilePic } = params;
        console.log("inside");
        console.log(profilePic);

        const updatedUsr = await UserModel.find({ phone: phone });

        updatedUsr.name = name;
        updatedUsr.city = city;
        updatedUsr.mail = mail;
        updatedUsr.profilePic = profilePic;
        console.log(profilePic);
        await updatedUsr.save();

        if (!updatedUsr) {
            console.log("User not found");
            return callback("User not found");
        }
        // Log the updated user document
        console.log("Updated User:", updatedUsr);
        console.log("Key-value pair updated successfully");
        return callback(null, "Success");
    } catch (error) {
        console.error("Error:", error);
        return callback("Failed to update key-value pair");
    }
}