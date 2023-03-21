import * as yup from "yup";
import { iClientRES } from "../../interfaces/client.interfaces";

const clientResSchema: yup.Schema<iClientRES> = yup.object().shape({
  registered_at: yup.date().notRequired(),
  tel: yup.string().required(),
  email: yup.string().email().required(),
  name: yup.string().required(),
  id: yup.string().notRequired(),
});

export default clientResSchema;
