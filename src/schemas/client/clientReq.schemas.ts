import * as yup from "yup";

import { iClientREQ } from "../../interfaces/client.interfaces";

const clientReqSchema: yup.Schema<iClientREQ> = yup.object().shape({
  tel: yup.string().required(),
  password: yup.string().required(),
  email: yup.string().email().required(),
  name: yup.string().required(),
});

export default clientReqSchema;
