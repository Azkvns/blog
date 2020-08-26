import cn from 'classnames';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import agent from '../../agent';
import cls from './register-form.module.scss';

export default function RegisterForm() {
  const { register, watch, handleSubmit, errors } = useForm();
  const password = watch('password');
  const onSubmit = (data) => {
    const { username, email, password } = data;
    agent.Auth.register(username, email, password).then(console.log);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cls.container}>
      <h5 className={cls.title}>Create new account</h5>
      <fieldset className={cls.fieldset}>
        <legend className={cls.label}>Username</legend>
        <input
          className={cn(cls.input, { [cls.inputError]: errors.username })}
          placeholder="Username"
          name="username"
          ref={register({
            required: true,
            pattern: /^[a-zA-Z0-9_-]{3,16}$/,
          })}
        />
        {errors.username && <span className={cls.error}>Incorrect username</span>}
      </fieldset>
      <fieldset className={cls.fieldset}>
        <legend className={cls.label}>Email address</legend>
        <input
          className={cn(cls.input, { [cls.inputError]: errors.email })}
          type="email"
          placeholder="Email adress"
          name="email"
          ref={register({
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
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
            pattern: /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/,
          })}
        />
        {errors.password && <span className={cls.error}>Incorrect password</span>}
      </fieldset>
      <fieldset className={cls.fieldset}>
        <legend className={cls.label}>Repeat password</legend>
        <input
          className={cls.input}
          type="password"
          placeholder="Password"
          name="repeatedPassword"
          ref={register({ required: true, validate: (value) => value === password })}
        />
        {errors.repeatedPassword && <span className={cls.error}>Passwords must match</span>}
      </fieldset>
      <div className={cls.devider} />
      <label className={cls.check}>
        <input className={cls.checkInput} type="checkbox" />
        <span className={cls.checkBox} />I agree to the processing of my personal information
      </label>
      <input className={cls.submit} type="submit" value="Create" />
      <p className={cls.text}>
        Already have an account?{' '}
        <Link className={cls.link} to="/auth/">
          Sign In.
        </Link>
      </p>
    </form>
  );
}
