// import mongoose from 'mongoose';

// const userSchema = mongoose.Schema({
//     username: {
//         type: String,
//         index: true,
//         required: true
//     },
//     password: {
//         type: String,
//         index: true,
//         required: true
//     },
//     role: {
//         type: String,
//         required: true
//     }
// }, { collection : 'users_login_info' });

// const User = module.exports = mongoose.model('User', userSchema);

// //get all users
// module.exports.getUsers = (data) => {
//     User.find(data);
// }

// module.exports.checkForRegisteredUser = (incomeData, user) => {
//     User.findOne({ 'username': incomeData.username }, user);
// }

// //get user by ID
// module.exports.getUserById = (id, data) => {
//     User.findById(id, data);
// }

// module.exports.getUserByUsername = (name, data) => {
//     User.findOne({'username': name}, data);
// }
