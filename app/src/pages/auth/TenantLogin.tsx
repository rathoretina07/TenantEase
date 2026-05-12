import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuthStore } from '../../store/authStore';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
type LoginFormValues = z.infer<typeof loginSchema>;

export default function TenantLogin() {
  const navigate = useNavigate();
  const { login, error: authError, isLoading } = useAuthStore();

  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password, 'tenant');
      navigate('/tenant/dashboard');
    } catch (err: any) {
      setError('root', { message: err.message });
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <main className="grid grid-cols-1 md:grid-cols-2 min-h-screen w-full font-body-md">
        <div className="hidden md:block relative h-full w-full bg-surface-variant overflow-hidden">
          <img alt="" className="absolute inset-0 w-full h-full object-cover" src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" />
          <div className="absolute inset-0 bg-gradient-to-t from-on-background/80 via-transparent to-transparent flex flex-col justify-end p-xl">
            <div className="max-w-[28rem]">
              <h2 className="font-h2 text-h2 text-on-primary mb-sm">Your Home, Managed Effortlessly.</h2>
              <p className="font-body-md text-body-md text-on-primary/80">Access your lease details, submit maintenance requests, and pay rent securely—all from one elegant dashboard.</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center px-lg py-xl sm:px-xl h-full w-full bg-surface">
          <div className="w-full max-w-[24rem] flex flex-col gap-lg">
            <div className="text-center flex flex-col items-center gap-sm">
              <div className="flex items-center gap-sm mb-xs cursor-pointer" onClick={() => navigate('/')}>
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>apartment</span>
                <h1 className="font-h3 text-h3 text-primary">TenantEase</h1>
              </div>
              <h2 className="font-h1 text-h1 text-on-surface">Welcome back</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Please enter your details to sign in to your tenant portal.</p>
            </div>

            {/* API Error */}
            {(authError || errors.root) && (
              <div className="p-md rounded-lg bg-error-container text-on-error-container text-sm text-center">
                {errors.root?.message || authError}
              </div>
            )}

            <form className="flex flex-col gap-md" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-xs">
                <label className="font-body-sm text-body-sm font-medium text-on-surface" htmlFor="email">Email</label>
                <input className="w-full px-md py-sm rounded-lg bg-surface-container-low border-transparent focus:bg-surface focus:border-transparent focus:ring-2 focus:ring-primary text-on-surface placeholder:text-outline transition-all font-body-md text-body-md outline-none" id="email" placeholder="Enter your email" type="email" {...register('email')} />
                {errors.email && <p className="text-error text-sm">{errors.email.message}</p>}
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-body-sm text-body-sm font-medium text-on-surface" htmlFor="password">Password</label>
                <input className="w-full px-md py-sm rounded-lg bg-surface-container-low border-transparent focus:bg-surface focus:border-transparent focus:ring-2 focus:ring-primary text-on-surface placeholder:text-outline transition-all font-body-md text-body-md outline-none" id="password" placeholder="••••••••" type="password" {...register('password')} />
                {errors.password && <p className="text-error text-sm">{errors.password.message}</p>}
              </div>
              <button
                className="w-full mt-sm py-sm px-lg rounded-lg bg-gradient-to-r from-primary to-secondary text-on-primary font-body-md text-body-md font-semibold hover:opacity-95 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-60"
                type="submit"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>
            <div className="text-center mt-sm">
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Don't have an account?{' '}
                <a className="font-medium text-primary hover:text-primary-container transition-colors cursor-pointer" onClick={() => navigate('/register/tenant')}>Sign up as a tenant</a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
