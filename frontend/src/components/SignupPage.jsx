import {
  Card, Form, FloatingLabel, Button,
} from 'react-bootstrap'
import { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import axios from 'axios'
import signupAvatar from '../assets/signup-avatar.jpg'
import routes from '../routes.js'
import useAuth from '../hook/useAuth.js'
import { getSignupSchema } from '../validationSchemas.js'

const SignupPage = () => {
  const inputNameRef = useRef()
  const navigate = useNavigate()
  const { logIn } = useAuth()
  useEffect(() => {
    inputNameRef.current.focus()
  }, [])
  const { t } = useTranslation()

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        routes.createUserUrl(),
        { username: values.username, password: values.password },
      )
      const { username, token } = response.data
      logIn(username, token)
      navigate(routes.mainPagePath(), { replace: true })
    }
    catch (error) {
      if (!error.isAxiosError) {
        toast(t('toast.unknownError'), { type: 'error' })
        return
      }
      if (error.status === 409) {
        formik.setErrors({ username: t('errors.userExists') })
        return
      }
      toast(t('toast.networkError', { type: 'error' }))
    }
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validateOnBlur: false,
    validationSchema: getSignupSchema(t),
    onSubmit: handleSubmit,
  })

  return (
    <div className="container-fluid h-100">
      <div className="row h-100 justify-content-center align-content-center">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column p-5 flex-md-row justify-content-around align-items-center">
              <div>
                <img src={signupAvatar} alt={t('signupPage.title')} className="rounded-circle" />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('signupPage.title')}</h1>
                <Form.Group className="mb-4">
                  <FloatingLabel controlId="username" label={t('signupPage.username')}>
                    <Form.Control
                      ref={inputNameRef}
                      required
                      type="text"
                      placeholder={t('errors.min3max20')}
                      name="username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={cn({ 'is-invalid': formik.errors.username && formik.touched.username })}
                    />
                    <div className="invalid-tooltip">{formik.errors.username}</div>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-4">
                  <FloatingLabel controlId="password" label={t('signupPage.password')}>
                    <Form.Control
                      required
                      type="password"
                      name="password"
                      placeholder={t('signupPage.password')}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={cn({ 'is-invalid': formik.errors.password && formik.touched.password })}
                    />
                    <div className="invalid-tooltip">{formik.errors.password}</div>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label
                    htmlFor="confirmPassword"
                    column="sm"
                    className="visually-hidden"
                  >
                    {t('signupPage.confirmPassword')}
                  </Form.Label>
                  <FloatingLabel controlId="confirmPassword" label={t('signupPage.confirmPassword')}>
                    <Form.Control
                      required
                      type="password"
                      name="confirmPassword"
                      placeholder={t('signupPage.confirmPassword')}
                      value={formik.values.confirmPassword}
                      className={cn({ 'is-invalid': formik.errors.confirmPassword && formik.touched.confirmPassword })}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <div className="invalid-tooltip">{formik.errors.confirmPassword}</div>
                  </FloatingLabel>
                </Form.Group>
                <Button
                  variant="outline-primary"
                  disabled={formik.isSubmitting}
                  type="submit"
                  className="w-100 mb-3"
                >
                  {t('buttons.signup')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
