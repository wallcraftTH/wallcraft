'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { FaCamera, FaArrowRightFromBracket, FaDownload, FaTrash, FaUser } from 'react-icons/fa6';

// Initialize Supabase client
const supabase = createClient(
  'https://mpsnwijabfingujzirri.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wc253aWphYmZpbmd1anppcnJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NDUzNzIsImV4cCI6MjA4MzQyMTM3Mn0.RTNnZHJRnYjoeX9faOi324CbooNxNaW6Fm2xJrV609M'
);

export default function ProfilePage() {
  const router = useRouter();
  
  // State
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Profile Data
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [email, setEmail] = useState('');

  // User Downloads
  const [savedProducts, setSavedProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      // 1. Get Logged in User
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        router.push('/login');
        return;
      }
      
      setUser(session.user);
      setEmail(session.user.email || '');

      // 2. Fetch Profile Details
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profileData && !profileError) {
        setFirstName(profileData.first_name || '');
        setLastName(profileData.last_name || '');
        setPhoneNumber(profileData.phone_number || '');
        setAvatarUrl(profileData.avatar_url || '');
      }

      // 3. Fetch Saved Downloads (Joined with products table)
      const { data: downloadsData, error: downloadsError } = await supabase
        .from('user_downloads')
        .select(`
          id,
          downloaded_at,
          products (
            id,
            title,
            image_url,
            item_code,
            collection_type
          )
        `)
        .eq('user_id', session.user.id)
        .order('downloaded_at', { ascending: false });

      if (downloadsData && !downloadsError) {
        setSavedProducts(downloadsData);
      }

    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const newAvatarUrl = publicUrlData.publicUrl;

      // Update Profile table with new Avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: newAvatarUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;
      
      setAvatarUrl(newAvatarUrl);
      
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Error uploading avatar!');
    } finally {
      setUploading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-white/10 border-t-[#B08038] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-28 pb-20 px-6 lg:px-16 font-['Prompt']">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Left Column - Profile Info & Edit */}
        <div className="w-full lg:w-1/3 flex flex-col space-y-10">
          
          {/* Avatar & Greeting */}
          <div className="flex flex-col items-center lg:items-start space-y-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/10 bg-zinc-900 shadow-2xl">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl text-zinc-600 font-light">
                    {firstName ? firstName.charAt(0).toUpperCase() : <FaUser />}
                  </div>
                )}
              </div>
              
              {/* Upload Button Overlay */}
              <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity duration-300">
                <FaCamera className="text-white text-xl" />
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleAvatarUpload} 
                  disabled={uploading}
                  className="hidden" 
                />
              </label>
            </div>

            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-medium tracking-wide text-white mb-1">
                {firstName} {lastName}
              </h1>
              <p className="text-zinc-500 text-sm">{email}</p>
            </div>
            
            <button 
            onClick={handleSignOut}
            className="text-[#B08038] text-[10px] uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors"
            >
            <FaArrowRightFromBracket /> Sign Out
            </button>
          </div>

          <hr className="border-white/10" />

          {/* Edit Profile Form */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#B08038] font-bold mb-6">Account Details</h3>
            <form onSubmit={handleUpdateProfile} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500">First Name</label>
                  <input 
                    type="text" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-[#B08038] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-zinc-500">Last Name</label>
                  <input 
                    type="text" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-[#B08038] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-zinc-500">Phone Number</label>
                <input 
                  type="text" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-[#B08038] transition-colors"
                  placeholder="+66 8X XXX XXXX"
                />
              </div>

              <button 
                type="submit" 
                disabled={saving}
                className="w-full mt-4 border border-[#B08038] text-[#B08038] hover:bg-[#B08038] hover:text-white uppercase text-[10px] font-bold tracking-[0.2em] py-3 rounded-sm transition-all"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column - Saved Downloads */}
        <div className="w-full lg:w-2/3 lg:pl-12 lg:border-l border-white/10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl md:text-2xl font-medium tracking-wide text-white uppercase">Saved Textures</h2>
            <span className="text-zinc-500 text-xs">{savedProducts.length} Items</span>
          </div>

          {savedProducts.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-sm p-12 text-center flex flex-col items-center">
              <FaDownload className="text-4xl text-zinc-600 mb-4" />
              <h3 className="text-white font-medium mb-2">No textures saved yet.</h3>
              <p className="text-zinc-500 text-sm max-w-sm mb-6">
                Explore our collections and click "Favorite" or "Download Simple" to save materials to your project board.
              </p>
              <Link href="/series/luxe" className="bg-[#B08038] text-white px-8 py-3 text-[10px] uppercase tracking-widest rounded-sm hover:bg-[#8f662a] transition-colors">
                Explore Collections
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {savedProducts.map((savedItem) => {
                const product = savedItem.products;
                if (!product) return null;

                return (
                  <div key={savedItem.id} className="group relative bg-[#050505] border border-white/10 rounded-sm overflow-hidden hover:border-[#B08038]/50 transition-colors">
                    
                    <div className="aspect-square p-4 bg-zinc-900/50 flex items-center justify-center overflow-hidden">
                      <img 
                        src={product.image_url} 
                        alt={product.title} 
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                    
                    <div className="p-4 border-t border-white/5">
                      <h4 className="text-[#B08038] text-xs font-bold uppercase tracking-wider mb-1 truncate">
                        {product.title}
                      </h4>
                      <p className="text-zinc-500 text-[10px] tracking-widest uppercase">
                        {product.item_code}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}