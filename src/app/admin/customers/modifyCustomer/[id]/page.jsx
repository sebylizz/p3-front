import customerFetcherId from "@/app/lib/getCustomerById";
import ModifyCustomer from "../ModifyCustomer";


export default async function getCustomer({ params }) {
  const { id } = await params;
  const customer = await customerFetcherId(id);

  return <ModifyCustomer customerData={customer}></ModifyCustomer>;
}
