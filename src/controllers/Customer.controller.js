import CustomerModel from '../models/Customer.model.js'
import StatusCode from '../StatusCode.js'

// Add a new customer to database.
const createCustomer = async (request, response) => {
  const customer = new CustomerModel({
    name: request.body.name,
    lastname: request.body.lastname,
    email: request.body.email
  })

  try {
    const databaseResponse = await customer.save()
    response.status(StatusCode.CREATED).send(databaseResponse)
  } catch (error) {
    response.status(StatusCode.INTERNAL_SERVER_ERROR).send({message: error.message})
  }
}

// Gets all the customers from database.
const getCustomers = async (request, response) => {
  try {
    const databaseResponse = await CustomerModel.find()
    response.status(StatusCode.OK).send(databaseResponse)
  } catch (error) {
    response.status(StatusCode.INTERNAL_SERVER_ERROR).send({message: error.message})
  }
}

const getRandomCustomer = async (request, response) => {
  try {
    const databaseResponse = await CustomerModel.aggregate([{$sample:{size:1}}])
    response.status(StatusCode.OK).send(databaseResponse)
  } catch (error) {
    response.status(StatusCode.INTERNAL_SERVER_ERROR).send({message: error.message})
  }
}

const deleteCustomerById = async (request, response) => {
  try {
    const databaseResponse = await CustomerModel.findByIdAndDelete(request.params.customerId)
    response.status(StatusCode.OK).send({
      message: `Successfully deleted the customer: ${databaseResponse.name} ${databaseResponse.lastname} with id: ${databaseResponse.id}`
    })
  } catch (error) {
    response.status(StatusCode.INTERNAL_SERVER_ERROR).send({
      message: `Error deleting the customer with id: ${request.params.customerId}`,
      stackTrace: error.message
    })
  }
}

const updateCustomer = async (request, response) => {
  const data = {
    name: request.body.name,
    lastname: request.body.lastname,
    email: request.body.email
  }

  try {
    if (!request.body.name || !request.body.lastname) {
      return response.status(StatusCode.BAD_REQUEST).send({ message: 'empty values are not valid' })
    }
    const databaseResponse = await CustomerModel.findByIdAndUpdate(request.params.customerId, data, {new: true})
    response.status(StatusCode.OK).send(databaseResponse)
  } catch (error) {
    response.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: error.message })
  }
}

export default {
  createCustomer,
  getCustomers,
  getRandomCustomer,
  updateCustomer,
  deleteCustomerById
}
