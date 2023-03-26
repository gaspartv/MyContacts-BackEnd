import * as yup from "yup";
import { iContactREQ } from "../../interfaces/contacts.interfaces";

const contactsReqSchema: yup.Schema<iContactREQ> = yup.object().shape({
  tel: yup.string().required(),
  email: yup.string().email().required(),
  name: yup.string().required(),
});

export default contactsReqSchema;
