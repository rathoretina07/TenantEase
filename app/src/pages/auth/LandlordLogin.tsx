import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuthStore } from '../../store/authStore';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  remember: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LandlordLogin() {
  const navigate = useNavigate();
  const { login, error: authError, isLoading } = useAuthStore();

  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', remember: false }
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password, 'manager');
      navigate('/manager/dashboard');
    } catch (err: any) {
      setError('root', { message: err.message });
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex font-body-md antialiased selection:bg-primary-container selection:text-on-primary-container">
      <div className="hidden lg:flex lg:w-1/2 relative bg-surface-variant overflow-hidden items-end p-xl">
        <img alt="Real estate interior" className="absolute inset-0 w-full h-full object-cover" src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" />
        <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/40 to-transparent mix-blend-multiply"></div>
        <div className="relative z-10 w-full max-w-[32rem]">
          <div className="flex items-center gap-sm mb-lg">
            <span className="material-symbols-outlined text-primary-fixed text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>domain</span>
            <span className="font-h2 text-h2 text-on-primary">TenantEase</span>
          </div>
          <p className="font-h1 text-h1 text-on-primary mb-md">Manage your properties with functional elegance.</p>
          <p className="font-body-md text-body-md text-surface-container-low/80">Experience the technical precision of a high-performance tool combined with the warmth of hospitality.</p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-gutter sm:p-xl bg-surface">
        <div className="w-full max-w-[28rem]">
          <div className="flex items-center justify-center gap-sm mb-xl lg:hidden cursor-pointer" onClick={() => navigate('/')}>
            <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>domain</span>
            <span className="font-h3 text-h3 text-on-surface">TenantEase</span>
          </div>
          <div className="mb-xl text-center flex flex-col items-center">
            <h1 className="font-h2 text-h2 text-on-surface mb-xs">Welcome back</h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Please enter your details to sign in.</p>
          </div>

          {/* Show API errors */}
          {(authError || errors.root) && (
            <div className="mb-md p-md rounded-lg bg-error-container text-on-error-container text-sm text-center">
              {errors.root?.message || authError}
            </div>
          )}

          <form className="flex flex-col gap-lg" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase" htmlFor="email">Email address</label>
              <div className="relative">
                <span className="absolute left-md top-[22px] -translate-y-1/2 material-symbols-outlined text-outline z-10">mail</span>
                <Input className="pl-[48px]" id="email" placeholder="manager@tenantease.com" type="email" error={errors.email?.message} {...register('email')} />
              </div>
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant uppercase" htmlFor="password">Password</label>
              <div className="relative">
                <span className="absolute left-md top-[22px] -translate-y-1/2 material-symbols-outlined text-outline z-10">lock</span>
                <Input className="pl-[48px]" id="password" placeholder="••••••••" type="password" error={errors.password?.message} {...register('password')} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-sm cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5">
                  <input className="peer appearance-none w-5 h-5 border-2 border-outline rounded-[4px] checked:bg-primary checked:border-primary transition-colors cursor-pointer focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface" type="checkbox" {...register('remember')} />
                  <span className="material-symbols-outlined absolute text-[16px] text-on-primary opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Remember for 30 days</span>
              </label>
              <a className="font-body-sm text-body-sm text-primary hover:text-primary-container font-semibold transition-colors" href="#">Forgot password?</a>
            </div>
            <Button className="w-full justify-center gap-sm h-12" type="submit" isLoading={isSubmitting || isLoading}>
              Sign in
              {!isSubmitting && !isLoading && <span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
            </Button>
          </form>
          <p className="mt-xl text-center font-body-sm text-body-sm text-on-surface-variant">
            Don't have an account?{' '}
            <a className="text-primary hover:text-primary-container font-semibold transition-colors cursor-pointer" onClick={() => navigate('/register/landlord')}>Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
