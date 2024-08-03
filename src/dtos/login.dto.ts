import Joi from 'joi';
import { getTranslatedMessage } from '../utils/locales/translate-helpers';


let pattern: RegExp = /^(05)([0-9]{8})$/;
const LoginDtoSchema = {body: Joi.object({
  
    password: Joi.any().required().messages({ 'any.required': `Password is a required field` }),
    email: Joi.string().email({
      minDomainSegments: 2, // the minimum number of domain segments (e.g. x.y.z has 3 segments)
      tlds: { allow: ['com', 'net'] }, // allowed domains
    }),
    mobile: Joi.string().length(10).regex(pattern).required().messages({ 'any.required': `mobile is a required field`,'string.pattern.base': getTranslatedMessage('ar', "MOBILE_FORMAT_INVALID") })
  
})};

export default LoginDtoSchema;