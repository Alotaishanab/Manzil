import {useIntl} from '@context';
import {z} from 'zod';

export const useValidations = () => {
  const {intl} = useIntl();
  const loginSchema = z.object({
    // email: z.string().email().min(7),
    email: z
      .string()
      .email({message: intl.formatMessage({id: 'form-errors.invalidEmail'})}),
    password: z
      .string()
      .nonempty(intl.formatMessage({id: 'form-errors.passwordRequired'})),
    // password: z
    //   .string()
    //   .min(8, {message: 'Password must be at least 8 characters long'})
    //   .max(32, {message: 'Password must be no more than 32 characters long'})
    //   .regex(/[A-Z]/, {
    //     message: 'Password must contain at least one uppercase letter',
    //   })
    //   .regex(/[a-z]/, {
    //     message: 'Password must contain at least one lowercase letter',
    //   })
    //   .regex(/[0-9]/, {message: 'Password must contain at least one number'})
    //   .regex(/[^A-Za-z0-9]/, {
    //     message: 'Password must contain at least one special character',
    //   }),
  });

  const signupSchema = z
    .object({
      name: z
        .string()
        .nonempty({message: intl.formatMessage({id: 'form-errors.name'})}),
      email: z
        .string()
        .email({message: intl.formatMessage({id: 'form-errors.invalidEmail'})}),
      password: z
        .string()
        .nonempty(intl.formatMessage({id: 'form-errors.passwordRequired'})),
      confirmPassword: z
        .string()
        .min(8, intl.formatMessage({id: 'form-errors.confirmPasswordMin'})),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: intl.formatMessage({id: 'form-errors.password-not-match'}),
      path: ['confirmPassword'],
    });
  const changeEmailSchema = z.object({
    // email: z.string().email().min(7),
    email: z
      .string()
      .email({message: intl.formatMessage({id: 'form-errors.invalidEmail'})}),
    password: z
      .string()
      .nonempty(intl.formatMessage({id: 'form-errors.passwordRequired'})),
  });

  const createAccountSchema = z.object({
    // email: z.string().email().min(7),
    email: z
      .string()
      .email({message: intl.formatMessage({id: 'form-errors.invalidEmail'})}),

    // password: z
    //   .string()
    //   .min(8, {message: 'Password must be at least 8 characters long'})
    //   .max(32, {message: 'Password must be no more than 32 characters long'})
    //   .regex(/[A-Z]/, {
    //     message: 'Password must contain at least one uppercase letter',
    //   })
    //   .regex(/[a-z]/, {
    //     message: 'Password must contain at least one lowercase letter',
    //   })
    //   .regex(/[0-9]/, {message: 'Password must contain at least one number'})
    //   .regex(/[^A-Za-z0-9]/, {
    //     message: 'Password must contain at least one special character',
    //   }),
  });

  const resetPasswordSchema = z
    .object({
      password: z
        .string()
        .min(8, intl.formatMessage({id: 'form-errors.passwordMin'})),
      confirmPassword: z
        .string()
        .min(8, intl.formatMessage({id: 'form-errors.confirmPasswordMin'})),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: intl.formatMessage({id: 'form-errors.password-not-match'}),
      path: ['confirmPassword'],
    });

  const changePasswordSchema = z
    .object({
      currentPassword: z
        .string()
        .min(8, intl.formatMessage({id: 'form-errors.currentPasswordMin'})),
      password: z
        .string()
        .min(8, intl.formatMessage({id: 'form-errors.passwordMin'})),
      confirmPassword: z
        .string()
        .min(8, intl.formatMessage({id: 'form-errors.confirmPasswordMin'})),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: intl.formatMessage({id: 'form-errors.password-not-match'}),
      path: ['confirmPassword'],
    });

  const personalInfoSchema = z
    .object({
      firstName: z
        .string()
        .nonempty(intl.formatMessage({id: 'form-errors.first-name'})),
      lastName: z
        .string()
        .nonempty(intl.formatMessage({id: 'form-errors.last-name'})),
      email: z
        .string()
        .email(intl.formatMessage({id: 'form-errors.invalidEmail'})),
      username: z
        .string()
        .nonempty(intl.formatMessage({id: 'form-errors.username'})),
      password: z
        .string()
        .min(8, intl.formatMessage({id: 'form-errors.passwordMin'})),
      confirmPassword: z
        .string()
        .min(8, intl.formatMessage({id: 'form-errors.confirmPasswordMin'})),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: intl.formatMessage({id: 'form-errors.password-not-match'}),
      path: ['confirmPassword'],
    });

  const studentInfoSchema = z
    .object({
      schoolName: z
        .string()
        .nonempty(intl.formatMessage({id: 'form-errors.school-name'})),
      location: z
        .string()
        .nonempty(intl.formatMessage({id: 'form-errors.location'})),
      username: z
        .string()
        //
        .nonempty(intl.formatMessage({id: 'form-errors.username'})),
      password: z
        .string()
        .min(8, intl.formatMessage({id: 'form-errors.passwordMin'})),
      confirmPassword: z
        .string()
        .min(8, intl.formatMessage({id: 'form-errors.confirmPasswordMin'})),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: intl.formatMessage({id: 'form-errors.password-not-match'}),
      path: ['confirmPassword'],
    });

  const companySchema = z
    .object({
      companyName: z
        .string()
        .nonempty(intl.formatMessage({id: 'form-errors.company-name'})),
      tagline: z.string(),
      username: z
        .string()
        .nonempty(intl.formatMessage({id: 'form-errors.username'})),
      password: z
        .string()
        .min(8, intl.formatMessage({id: 'form-errors.passwordMin'})),
      confirmPassword: z
        .string()
        .min(8, intl.formatMessage({id: 'form-errors.confirmPasswordMin'})),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: intl.formatMessage({id: 'form-errors.password-not-match'}),
      path: ['confirmPassword'],
    });

  const forgotPasswordSchema = z.object({
    // email: z.string().email().min(7),
    email: z
      .string()
      .email({message: intl.formatMessage({id: 'form-errors.invalidEmail'})}),
  });

  const otpValidationSchema = z.object({
    code: z.string().min(6, intl.formatMessage({id: 'form-errors.otp-error'})),
  });

  const sendFeedbackSchema = z.object({
    // email: z.string().email().min(7),
    email: z
      .string()
      .email({message: intl.formatMessage({id: 'form-errors.invalidEmail'})}),
    description: z
      .string()
      .nonempty(intl.formatMessage({id: 'form-errors.description'})),
    // password: z
    //   .string()
    //   .min(8, {message: 'Password must be at least 8 characters long'})
    //   .max(32, {message: 'Password must be no more than 32 characters long'})
    //   .regex(/[A-Z]/, {
    //     message: 'Password must contain at least one uppercase letter',
    //   })
    //   .regex(/[a-z]/, {
    //     message: 'Password must contain at least one lowercase letter',
    //   })
    //   .regex(/[0-9]/, {message: 'Password must contain at least one number'})
    //   .regex(/[^A-Za-z0-9]/, {
    //     message: 'Password must contain at least one special character',
    //   }),
  });

  return {
    loginSchema,
    signupSchema,
    createAccountSchema,
    personalInfoSchema,
    forgotPasswordSchema,
    otpValidationSchema,
    studentInfoSchema,
    companySchema,

    resetPasswordSchema,
    changeEmailSchema,
    changePasswordSchema,
    sendFeedbackSchema,
  };
};
