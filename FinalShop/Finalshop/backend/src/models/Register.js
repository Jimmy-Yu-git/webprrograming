import mongoose from 'mongoose'
const Schema = mongoose.Schema;
// Creating a schema, sort of like working with an ORM
const LogRegister = new Schema({
    firstname   : String,
    lastname: String,
    username  : String,
    email : String,
    password1 : String,
    password2 : String,

})
//creating a table within database with the defined schema
const Register = mongoose.model('Register', LogRegister )
export default Register;