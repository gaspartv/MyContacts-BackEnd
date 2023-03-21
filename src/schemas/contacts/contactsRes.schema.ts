import * as yup from "yup";
import { iContactRES } from "../../interfaces/contacts.interfaces";

const contactsResSchema: yup.Schema<iContactRES> = yup.object().shape({
  registered_at: yup.date().notRequired(),
  tel: yup.string().required(),
  email: yup.string().email().required(),
  name: yup.string().required(),
  id: yup.string().notRequired(),
});

export default contactsResSchema;
