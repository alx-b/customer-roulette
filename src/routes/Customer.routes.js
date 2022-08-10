import CustomerController from '../controllers/Customer.controller.js'

const routes = application => {
  application.get('/api/customer', CustomerController.getCustomers)
  application.post('/api/customer', CustomerController.createCustomer)
  application.get('/api/customer/random', CustomerController.getRandomCustomer)
  application.delete('/api/customer/delete/:customerId', CustomerController.deleteCustomerById)
  application.put('/api/customer/update/:customerId', CustomerController.updateCustomer)
}

export default { routes }
