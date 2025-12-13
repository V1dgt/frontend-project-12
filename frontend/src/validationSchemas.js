import * as yup from 'yup'

export const getChannelSchema = (channels, t) => yup.object().shape({
  inputValue: yup.string().trim().min(3, t('errors.min3max20')).max(20, t('errors.min3max20'))
    .notOneOf(channels.map(channel => channel.name), t('errors.notUnique'))
    .required(t('errors.required')),
})

export const getSignupSchema = t => yup.object({
  username: yup.string().min(3, t('errors.min3max20')).max(20, t('errors.min3max20')).required(t('errors.required')),
  password: yup.string().min(6, t('errors.min6')).required(t('errors.required')),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], t('errors.oneOf')).required(t('errors.required')),
})
