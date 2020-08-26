import cn from 'classnames';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import cls from './auth-form.module.scss';

export default function AuthForm() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    console.log(data);
    // agent.Auth.register(email, password).then(console.log);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cls.container}>
      <h5 className={cls.title}>Create new account</h5>
      <fieldset className={cls.fieldset}>
        <legend className={cls.label}>Email address</legend>
        <input
          className={cn(cls.input, { [cls.inputError]: errors.email })}
          type="email"
          placeholder="Email adress"
          name="email"
          ref={register({
            required: true,
          })}
        />
        {errors.email && <span className={cls.error}>Incorrect email adress</span>}
      </fieldset>
      <fieldset className={cls.fieldset}>
        <legend className={cls.label}>Password</legend>
        <input
          className={cls.input}
          type="password"
          placeholder="password"
          name="password"
          ref={register({
            required: true,
          })}
        />
        {errors.password && <span className={cls.error}>Incorrect password</span>}
      </fieldset>
      <input className={cls.submit} type="submit" value="Login" />
      <p className={cls.text}>
        Don’t have an account?{' '}
        <Link className={cls.link} to="/auth/">
          Sign Up.
        </Link>
      </p>
    </form>
  );
}
