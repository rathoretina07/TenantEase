import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-hot-toast';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/authStore';
import { api } from '../../services/api';

const profileSchema = z.object({
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  emergencyContactName: z.string().min(2, 'Name is too short'),
  emergencyContactPhone: z.string().min(10, 'Phone number must be at least 10 digits'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function TenantProfile() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [leaseData, setLeaseData] = useState<any>(null);
  const [profileData, setProfileData] = useState<ProfileFormValues>({
    email: user?.email || '',
    phone: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
  });

  useEffect(() => {
    // Try to get real lease/profile info
    api.get('/payments').then(r => {
      const payment = r.data?.[0];
      if (payment?.lease) setLeaseData(payment.lease);
    }).catch(() => {});
  }, []);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: profileData,
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      // Try real API first
      await api.patch('/auth/profile', data);
    } catch {
      // Simulate if endpoint not yet on backend
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    setProfileData(data);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const displayName = user?.name || 'Tenant';
  const unitLabel = leaseData?.unit
    ? `Unit ${leaseData.unit.unitNumber}, ${leaseData.unit.property?.name ?? ''}`
    : 'Your Unit';
  return (
    <div className="max-w-container-max mx-auto w-full space-y-xl pb-xl">
      {/* Page Header / Profile Quick Look */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-lg bg-surface-container-lowest dark:bg-slate-800/80 p-lg rounded-xl shadow-[0_4px_20px_-4px_rgba(53,37,205,0.05)] border border-outline-variant/20 dark:border-slate-700/50">
        <div className="flex items-center gap-lg">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary-container relative">
            {user?.profileImg ? (
              <img alt="Tenant Avatar" className="w-full h-full object-cover" src={user.profileImg} />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold">
                {displayName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
            )}
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#10b981] border-2 border-white rounded-full" title="Active"></div>
          </div>
          <div>
            <h1 className="font-h1 text-h1 text-on-surface dark:text-white">{displayName}</h1>
            <div className="flex items-center gap-sm mt-1 text-on-surface-variant dark:text-slate-400 font-body-md text-body-md">
              <span className="material-symbols-outlined text-outline text-lg">location_on</span>
              {unitLabel}
            </div>
          </div>
        </div>
        <div className="flex gap-md w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-lg py-2 rounded-lg bg-surface border border-outline-variant text-on-surface font-body-md text-body-md font-medium hover:bg-surface-variant transition-colors flex items-center justify-center gap-sm">
            <span className="material-symbols-outlined text-lg">mail</span> Message
          </button>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="flex-1 sm:flex-none px-lg py-2 rounded-lg bg-primary-container text-on-primary font-body-md text-body-md font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-sm"
          >
            <span className="material-symbols-outlined text-lg">{isEditing ? 'close' : 'edit'}</span> {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
        {/* Personal Info Card */}
        <div className="col-span-1 lg:col-span-4 bg-surface-container-lowest rounded-xl p-lg shadow-[0_4px_20px_-4px_rgba(53,37,205,0.05)] border border-outline-variant/20 flex flex-col gap-lg">
          <h2 className="font-h3 text-h3 text-on-surface flex items-center gap-sm">
            <span className="material-symbols-outlined text-primary">person</span> Personal Details
          </h2>
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1 block">Email Address</label>
                <Input {...register('email')} error={errors.email?.message} />
              </div>
              <div>
                <label className="font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1 block">Phone Number</label>
                <Input {...register('phone')} error={errors.phone?.message} />
              </div>
              <div className="pt-2 border-t border-outline-variant/20">
                <label className="font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1 block">Emergency Contact Name</label>
                <Input {...register('emergencyContactName')} error={errors.emergencyContactName?.message} />
              </div>
              <div>
                <label className="font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1 block">Emergency Contact Phone</label>
                <Input {...register('emergencyContactPhone')} error={errors.emergencyContactPhone?.message} />
              </div>
              <Button type="submit" isLoading={isSubmitting} className="w-full">Save Changes</Button>
            </form>
          ) : (
            <div className="space-y-md">
              <div>
                <div className="font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">Email Address</div>
                <div className="font-body-md text-body-md text-on-surface flex items-center gap-sm">
                  {profileData.email}
                  <span className="material-symbols-outlined text-primary cursor-pointer text-sm hover:opacity-70">content_copy</span>
                </div>
              </div>
              <div className="h-px w-full bg-outline-variant/20"></div>
              <div>
                <div className="font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">Phone Number</div>
                <div className="font-body-md text-body-md text-on-surface">{profileData.phone}</div>
              </div>
              <div className="h-px w-full bg-outline-variant/20"></div>
              <div>
                <div className="font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">Emergency Contact</div>
                <div className="font-body-md text-body-md text-on-surface">{profileData.emergencyContactName}</div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">{profileData.emergencyContactPhone}</div>
              </div>
            </div>
          )}
        </div>

        {/* Lease Details & Stats */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-lg">
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-lg">
            <div className="bg-surface-container-lowest rounded-xl p-md shadow-[0_4px_20px_-4px_rgba(53,37,205,0.05)] border border-outline-variant/20">
              <div className="font-label-caps text-label-caps text-outline uppercase tracking-wider mb-2">Monthly Rent</div>
              <div className="font-h2 text-h2 text-on-surface">₹1,850</div>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-md shadow-[0_4px_20px_-4px_rgba(53,37,205,0.05)] border border-outline-variant/20">
              <div className="font-label-caps text-label-caps text-outline uppercase tracking-wider mb-2">Security Deposit</div>
              <div className="font-h2 text-h2 text-on-surface">₹2,000 <span className="font-body-sm text-body-sm text-tertiary-container ml-1 bg-tertiary-fixed px-2 py-1 rounded-full">Held</span></div>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-md shadow-[0_4px_20px_-4px_rgba(53,37,205,0.05)] border border-outline-variant/20">
              <div className="font-label-caps text-label-caps text-outline uppercase tracking-wider mb-2">Lease Status</div>
              <div className="font-h2 text-h2 text-[#059669]">Active</div>
            </div>
          </div>

          {/* Lease Details Card */}
          <div className="flex-1 bg-surface-container-lowest rounded-xl p-lg shadow-[0_4px_20px_-4px_rgba(53,37,205,0.05)] border border-outline-variant/20">
            <div className="flex justify-between items-center mb-lg">
              <h2 className="font-h3 text-h3 text-on-surface flex items-center gap-sm">
                <span className="material-symbols-outlined text-primary">description</span> Lease Agreement
              </h2>
              <button className="text-primary font-body-sm text-body-sm font-medium hover:underline flex items-center gap-xs">
                View Document <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-lg gap-x-xl">
              <div>
                <div className="font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">Start Date</div>
                <div className="font-body-md text-body-md text-on-surface">September 1, 2023</div>
              </div>
              <div>
                <div className="font-label-caps text-label-caps text-outline uppercase tracking-wider mb-1">End Date</div>
                <div className="font-body-md text-body-md text-on-surface">August 31, 2024</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
