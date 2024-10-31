async function addCustomer(data) {
    try {
      const response = await fetch('http://localhost:8080/customers/addcustomer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to add customer');
      }
      const result = await response.json();
      console.log('Customer added:', result);
      return result;
    } catch (error) {
      console.error('Error adding customer:', error);
      throw error;
    }
  }

export default addCustomer;dsadsa