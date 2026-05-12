import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuthStore } from '../../store/authStore';

const schema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  terms: z.boolean().refine((v) => v, 'You must accept the terms'),
});
type FormValues = z.infer<typeof schema>;

export default function LandlordRegister() {
  const navigate = useNavigate();
  const { register: registerUser, error: authError, isLoading } = useAuthStore();

  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { firstName: '', lastName: '', email: '', password: '', terms: false }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await registerUser({ email: data.email, password: data.password, role: 'MANAGER', firstName: data.firstName, lastName: data.lastName });
      navigate('/manager/dashboard');
    } catch (err: any) {
      setError('root', { message: err.message });
    }
  };

  return (
    <div className="bg-background min-h-screen font-body-md text-on-background flex antialiased">
      <div className="flex w-full h-screen">
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-gutter lg:p-xl overflow-y-auto relative z-10 bg-surface">
          <div className="absolute top-8 left-8 lg:top-xl lg:left-xl">
            <div className="flex items-center gap-sm cursor-pointer" onClick={() => navigate('/')}>
              <span className="material-symbols-outlined text-primary text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>domain</span>
              <span className="font-h2 text-h2 text-primary">TenantEase</span>
            </div>
          </div>
          <div className="w-full max-w-[28rem]">
            <div className="mb-lg">
              <div className="flex items-center gap-2 mb-sm">
                <span className="font-label-caps text-label-caps text-primary tracking-wider uppercase">Create Account</span>
              </div>
              <div className="flex gap-xs w-full h-1.5 rounded-full bg-surface-variant overflow-hidden">
                <div className="w-1/3 bg-primary rounded-full"></div>
              </div>
            </div>
            <div className="mb-xl">
              <h1 className="font-h1 text-h1 text-on-surface mb-sm">Create Account</h1>
              <p className="font-body-md text-body-md text-on-surface-variant">Join TenantEase to streamline your property management experience.</p>
            </div>

            {(authError || errors.root) && (
              <div className="mb-md p-md rounded-lg bg-error-container text-on-error-container text-sm text-center">
                {errors.root?.message || authError}
              </div>
            )}

            <form className="space-y-lg" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-md">
                <div>
                  <label className="block font-body-sm text-body-sm text-on-surface mb-xs" htmlFor="firstName">First Name</label>
                  <input className="w-full px-md py-sm bg-surface-container-low border border-surface-container-high rounded-DEFAULT text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none" id="firstName" placeholder="Jane" type="text" {...register('firstName')} />
                  {errors.firstName && <p className="text-error text-xs mt-xs">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="block font-body-sm text-body-sm text-on-surface mb-xs" htmlFor="lastName">Last Name</label>
                  <input className="w-full px-md py-sm bg-surface-container-low border border-surface-container-high rounded-DEFAULT text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none" id="lastName" placeholder="Doe" type="text" {...register('lastName')} />
                  {errors.lastName && <p className="text-error text-xs mt-xs">{errors.lastName.message}</p>}
                </div>
              </div>
              <div>
                <label className="block font-body-sm text-body-sm text-on-surface mb-xs" htmlFor="email">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline-variant">mail</span>
                  <input className="w-full pl-xl pr-md py-sm bg-surface-container-low border border-surface-container-high rounded-DEFAULT text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none" id="email" placeholder="jane@example.com" type="email" {...register('email')} />
                </div>
                {errors.email && <p className="text-error text-xs mt-xs">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block font-body-sm text-body-sm text-on-surface mb-xs" htmlFor="password">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline-variant">lock</span>
                  <input className="w-full pl-xl pr-md py-sm bg-surface-container-low border border-surface-container-high rounded-DEFAULT text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none" id="password" placeholder="••••••••" type="password" {...register('password')} />
                </div>
                {errors.password && <p className="text-error text-xs mt-xs">{errors.password.message}</p>}
              </div>
              <div className="flex items-start gap-sm mt-md">
                <input className="w-4 h-4 mt-0.5 rounded border-outline-variant text-primary" id="terms" type="checkbox" {...register('terms')} />
                <label className="font-body-sm text-body-sm text-on-surface-variant" htmlFor="terms">
                  I agree to the <a className="text-primary hover:underline font-medium" href="#">Terms of Service</a> and <a className="text-primary hover:underline font-medium" href="#">Privacy Policy</a>.
                </label>
              </div>
              {errors.terms && <p className="text-error text-xs">{errors.terms.message}</p>}
              <button
                className="w-full py-md px-lg bg-gradient-to-r from-primary to-secondary rounded-DEFAULT text-on-primary font-h3 text-h3 hover:opacity-90 transition-all flex justify-center items-center gap-sm mt-xl disabled:opacity-60"
                type="submit"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? 'Creating Account…' : 'Create Account'}
                {!isSubmitting && !isLoading && <span className="material-symbols-outlined text-on-primary">arrow_forward</span>}
              </button>
            </form>
            <div className="mt-xl text-center">
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Already have an account? <a className="text-primary font-medium hover:underline cursor-pointer" onClick={() => navigate('/login/landlord')}>Log in</a>
              </p>
            </div>
          </div>
        </div>
        <div className="hidden lg:block lg:w-1/2 relative bg-surface-container-low overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-surface-container-low to-surface-variant opacity-80 z-0"></div>
          <div className="absolute inset-0 z-10 flex flex-col justify-center items-center p-xl">
            <div className="mt-xl max-w-[28rem] text-center">
              <p className="font-h2 text-h2 text-on-surface mb-md">"TenantEase transformed how we handle our portfolio. Everything is transparent and fast."</p>
              <div className="flex items-center justify-center gap-sm">
                <img alt="Sarah Jenkins" className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover" src="https://i.pravatar.cc/150?u=sarah" />
                <div className="text-left">
                  <div className="font-body-md text-body-md text-on-surface">Sarah Jenkins</div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">Property Manager, Elevate Living</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
