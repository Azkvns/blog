import cn from 'classnames';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import agent from '../../agent';
import cls from './edit-profile-form.module.scss';

export default function AuthForm() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;
    agent.Auth.register(email, password).then(console.log);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cls.container}>
      <h5 className={cls.title}>Edit Profile</h5>
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
          })}
        />
        {errors.email && <span className={cls.error}>Incorrect email adress</span>}
      </fieldset>
      <fieldset className={cls.fieldset}>
        <legend className={cls.label}>New password</legend>
        <input
          className={cls.input}
          type="password"
          placeholder="New password"
          name="password"
          ref={register({
            required: true,
          })}
        />
        {errors.password && <span className={cls.error}>Incorrect password</span>}
      </fieldset>
      <fieldset className={cls.fieldset}>
        <legend className={cls.label}>Avatar image (url)</legend>
        <input
          className={cls.input}
          type="text"
          placeholder="Avatar image"
          name="avatarImage"
          ref={register({
            required: true,
          })}
        />
        {errors.avatarImage && <span className={cls.error}>Incorrect password</span>}
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
