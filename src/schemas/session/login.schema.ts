import * as yup from "yup";
import { iLoginReq } from "../../interfaces/login.interfaces";

const loginCheckFieldShema: yup.Schema<iLoginReq> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default loginCheckFieldShema;
